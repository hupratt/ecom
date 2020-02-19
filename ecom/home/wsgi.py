import os, sys
from django.core.wsgi import get_wsgi_application

sys.path.append("/home/ubuntu/Dev/myshop")
sys.path.append("/home/ubuntu/Dev/myshop/ecom")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "home.settings")

application = get_wsgi_application()

