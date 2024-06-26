import os, sys, dotenv
from django.core.wsgi import get_wsgi_application

sys.path.append("/home/ubuntu/Dev/ecom")
sys.path.append("/home/ubuntu/Dev/ecom/ecom")

if os.environ.get("DJANGO_DEVELOPMENT") == "true":
    dotenv.read_dotenv(
        os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
            ".env.development",
        )
    )
else:
    dotenv.read_dotenv(
        os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"
        )
    )

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "home.settings")

application = get_wsgi_application()
