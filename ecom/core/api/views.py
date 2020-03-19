from django_countries import countries
from django.db.models import Q
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from core.models import Item, OrderItem, Order
from .serializers import (
    ItemSerializer,
    OrderSerializer,
    ItemDetailSerializer,
    AddressSerializer,
    PaymentSerializer,
    BookSerializer,
)
from core.models import (
    Item,
    OrderItem,
    Order,
    Address,
    Payment,
    Coupon,
    Refund,
    UserProfile,
    Variation,
    ItemVariation,
    Livre,
)


import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY


class UserIDView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({"userID": request.user.id}, status=HTTP_200_OK)


class ItemListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemSerializer
    queryset = Item.objects.all()


# Fix me !!
# Do a view to grab the top 10 authors
# from core.models import Livre
# from django.db.models import Count
# Livre.objects.values('auteur_nom').annotate(total=Count("id")).order_by('-total')


def naive_grouper(inputs, n):
    # transform URL params
    # Humberto Werneck, true, Jean-Yves Loude, true, Jack, false
    # into
    # [('Humberto Werneck', 'true'), ('Jean-Yves Loude', 'true'), ('Jack', 'false')]
    num_groups = len(inputs) // n
    return [tuple(inputs[i * n : (i + 1) * n]) for i in range(num_groups)]


def serialize_URL_params(query_param):
    # transform URL param
    # &authors=Humberto Werneck, true, Jean-Yves Loude, true, Jack, false
    # into
    # ['Humberto Werneck', 'Jean-Yves Loude']
    groups, result = [], []
    for k, v in query_param.items():
        if k == "authors" or k == "":
            groups = naive_grouper(v.split(","), 2)
    for search in groups:
        author, boolean = search
        if boolean == "true":
            result.append(author)
    return result


class BookListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = BookSerializer
    queryset = Livre.objects.all()
    paginate_by_param = "limit"

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Livre.objects.all()
        language = self.request.query_params.get("language", None)
        authors = self.request.query_params.get("authors", "")
        search_for = serialize_URL_params(self.request.query_params)
        if language != "" and language is not None:
            print("filtering on language", language)
            queryset = queryset.filter(langue_nom__contains=language)
        if authors != "" and len(search_for) > 0:
            print("filtering on author", search_for)
            queryset = queryset.filter(auteur_nom__in=search_for)
        return queryset


class ItemDetailView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemDetailSerializer
    queryset = Item.objects.all()


class BookDetailView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = BookSerializer
    queryset = Livre.objects.all()


class OrderQuantityUpdateView(APIView):
    def post(self, request, *args, **kwargs):
        id = request.data.get("id", None)
        action_type = request.data.get("type", None)
        if id is None:
            return Response({"message": "Invalid data"}, status=HTTP_400_BAD_REQUEST)
        item = get_object_or_404(Livre, id=id)
        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            # check if the order item is in the order
            if order.items.filter(livre__id=item.id).exists():
                order_item = OrderItem.objects.filter(
                    livre=item, user=request.user, ordered=False
                )[0]
                if action_type == "remove":
                    if order_item.quantity > 1:
                        order_item.quantity -= 1
                        order_item.save()
                    else:
                        order.items.remove(order_item)
                if action_type == "add":
                    order_item.quantity += 1
                    order_item.save()
                return Response(status=HTTP_200_OK)
            else:
                return Response(
                    {"message": "This item was not in your cart"},
                    status=HTTP_400_BAD_REQUEST,
                )
        else:
            return Response(
                {"message": "You do not have an active order"},
                status=HTTP_400_BAD_REQUEST,
            )


class OrderItemDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = OrderItem.objects.all()


class AddToCartView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        id = request.data.get("id", None)
        if id is None:
            return Response({"message": "Invalid request"}, status=HTTP_400_BAD_REQUEST)

        livre = get_object_or_404(Livre, id=id)
        order_item_qs = OrderItem.objects.filter(
            livre=livre, user=request.user, ordered=False
        )

        if order_item_qs.exists():
            order_item = order_item_qs.first()
            order_item.quantity += 1
            order_item.save()
        else:
            order_item = OrderItem.objects.create(
                livre=livre, user=request.user, ordered=False
            )
            order_item.save()

        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            if not order.items.filter(livre__id=order_item.id).exists():
                order.items.add(order_item)
                return Response(status=HTTP_200_OK)

        else:
            ordered_date = timezone.now()
            order = Order.objects.create(user=request.user, ordered_date=ordered_date)
            order.items.add(order_item)
            return Response(status=HTTP_200_OK)


class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)
            return order
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            # return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


class PaymentView(APIView):
    def post(self, request, *args, **kwargs):
        order = Order.objects.get(user=self.request.user, ordered=False)
        userprofile = UserProfile.objects.get(user=self.request.user)
        token = request.data.get("stripeToken")
        shipping_address_id = request.data.get("selectedShippingAddress")
        if len(request.data.get("selectedBillingAddress")) > 0:
            billing_address_id = request.data.get("selectedBillingAddress")
        else:
            billing_address_id = None

        shipping_address = Address.objects.get(id=shipping_address_id)
        if billing_address_id is not None:
            billing_address = Address.objects.get(id=billing_address_id)
        else:
            billing_address = shipping_address

        if (
            userprofile.stripe_customer_id != ""
            and userprofile.stripe_customer_id is not None
        ):
            customer = stripe.Customer.retrieve(userprofile.stripe_customer_id)
            customer.sources.create(source=token)

        else:
            customer = stripe.Customer.create(email=self.request.user.email)
            customer.sources.create(source=token)
            userprofile.stripe_customer_id = customer["id"]
            userprofile.one_click_purchasing = True
            userprofile.save()

        amount = int(order.get_total() * 100)

        try:

            # charge the customer because we cannot charge the token more than once
            charge = stripe.Charge.create(
                amount=amount,  # cents
                currency="usd",
                customer=userprofile.stripe_customer_id,
            )
            # charge once off on the token
            # charge = stripe.Charge.create(
            #     amount=amount,  # cents
            #     currency="usd",
            #     source=token
            # )

            # create the payment
            payment = Payment()
            payment.stripe_charge_id = charge["id"]
            payment.user = self.request.user
            payment.amount = order.get_total()
            payment.save()

            # assign the payment to the order

            order_items = order.items.all()
            order_items.update(ordered=True)
            for item in order_items:
                item.save()

            order.ordered = True
            order.payment = payment
            order.billing_address = billing_address
            order.shipping_address = shipping_address
            # order.ref_code = create_ref_code()
            order.save()

            return Response(status=HTTP_200_OK)

        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get("error", {})
            return Response(
                {"message": f"{err.get('message')}"}, status=HTTP_400_BAD_REQUEST
            )

        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly
            messages.warning(self.request, "Rate limit error")
            return Response(
                {"message": "Rate limit error"}, status=HTTP_400_BAD_REQUEST
            )

        except stripe.error.InvalidRequestError as e:
            print(e)
            # Invalid parameters were supplied to Stripe's API
            return Response(
                {"message": "Invalid parameters"}, status=HTTP_400_BAD_REQUEST
            )

        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            # (maybe you changed API keys recently)
            return Response(
                {"message": "Not authenticated"}, status=HTTP_400_BAD_REQUEST
            )

        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
            return Response({"message": "Network error"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.StripeError as e:
            # Display a very generic error to the user, and maybe send
            # yourself an email
            return Response(
                {
                    "message": "Something went wrong. You were not charged. Please try again."
                },
                status=HTTP_400_BAD_REQUEST,
            )

        except Exception as e:
            # send an email to ourselves
            return Response(
                {"message": "A serious error occurred. We have been notifed."},
                status=HTTP_400_BAD_REQUEST,
            )

        return Response(
            {"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST
        )


class AddCouponView(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get("code", None)
        if code is None:
            return Response(
                {"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST
            )
        order = Order.objects.get(user=self.request.user, ordered=False)
        coupon = get_object_or_404(Coupon, code=code)
        order.coupon = coupon
        order.save()
        return Response(status=HTTP_200_OK)


class CountryListView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(countries, status=HTTP_200_OK)


class AddressListView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = AddressSerializer

    def get_queryset(self):
        address_type = self.request.query_params.get("address_type", None)
        qs = Address.objects.all()
        if address_type is None:
            return qs
        return qs.filter(user=self.request.user, address_type=address_type)


class AddressCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = AddressSerializer
    queryset = Address.objects.all()


class AddressUpdateView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = AddressSerializer
    queryset = Address.objects.all()


class AddressDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Address.objects.all()


class PaymentListView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PaymentSerializer

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)
