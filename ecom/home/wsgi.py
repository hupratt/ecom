import os, sys, dotenv
from django.core.wsgi import get_wsgi_application

sys.path.append("/home/ubuntu/Dev/ecom")
sys.path.append("/home/ubuntu/Dev/ecom/ecom")

dotenv.read_dotenv("/home/ubuntu/Dev/ecom/.env")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "home.settings")

application = get_wsgi_application()
