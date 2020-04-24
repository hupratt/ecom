from core.models import Livre, LivreItem
from core.api.serializers import BookSerializer

l = Livre.objects.get(isbn="9789898834928")
l = Livre(isbn="1121")
l.save()
item1 = LivreItem.objects.create(livre=l)
item2 = LivreItem.objects.create(livre=l)

ser = BookSerializer(instance=l)
ser.data
