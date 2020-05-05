from django.templatetags.static import static
from django.urls import reverse
from django.views.generic import TemplateView
from django.shortcuts import render
from django.conf import settings
import datetime, uuid


def custom_set_cookie(response, key, value, days_expire=365):
    max_age = days_expire * 24 * 60 * 60
    expires = datetime.datetime.strftime(
        datetime.datetime.utcnow() + datetime.timedelta(seconds=max_age),
        "%a, %d-%b-%Y %H:%M:%S GMT",
    )
    response.set_cookie(
        key,
        value,
        max_age=max_age,
        expires=expires,
        domain=settings.SESSION_COOKIE_DOMAIN,
        secure=settings.SESSION_COOKIE_SECURE or None,
    )


def index(request):
    if len(settings.POSTHOG_KEY) > 0:
        context = {
            "POSTHOG_KEY": settings.POSTHOG_KEY,
            "POSTHOG_DOMAIN": settings.POSTHOG_DOMAIN,
        }
        if "distinct_id" not in request.COOKIES.keys():
            response = render(request, "frontend/index.html", context=context)
            custom_set_cookie(response, "distinct_id", str(uuid.uuid4()))
            # response.set_cookie("distinct_id", str(uuid.uuid4()))
            return response
        return render(request, "frontend/index.html", context=context)
    return render(request, "frontend/index.html")


class ServiceWorkerView(TemplateView):
    template_name = "sw.js"
    content_type = "application/javascript"
    name = "sw.js"

    def get_context_data(self, **kwargs):
        return {
            "icon_url": static("icons/logopetiteportugaise300.png"),
            "manifest_url": static("pwa/manifest.json"),
            "style_url": static("styles/style.css"),
            "home_url": reverse("home"),
        }
