from core.models import (
    Address,
    Item,
    Order,
    OrderItem,
    Coupon,
    Variation,
    ItemVariation,
    Payment,
    Livre,
    ImageLivre,
    LivreItem,
)

data = Livre.objects.all()
for i in data:
    pictureID = i.livre_name.get_queryset().order_by("-updated").first().id
    pic = ImageLivre.objects.filter(id=pictureID)
    # ... do stuff
    pic.update(image=f"{i.isbn}.jpg")
    # i.field = value
    imagename = list(pic.values_list("image", flat=True))[0]
    # print(pic)
    i.save()
