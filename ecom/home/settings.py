import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

SECRET_KEY = os.environ.get("SECRET_KEY_books")

if os.environ.get("DJANGO_DEVELOPMENT") is not None:
    DEBUG = True

ALLOWED_HOSTS = ["shop.lapetiteportugaise.eu", "127.0.0.1", "localhost"]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    "django.contrib.postgres",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.github",
    "allauth.socialaccount.providers.facebook",
    "corsheaders",
    "rest_auth",
    "rest_auth.registration",
    "rest_framework",
    "rest_framework.authtoken",
    "debug_toolbar",
    "frontend",
    "home",
    "storages",
    "core",
    "coreaccount",
]

MIDDLEWARE = [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "home.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

# for the debug toolbar middleware
INTERNAL_IPS = ["127.0.0.1", "localhost"]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "ecom",
        "USER": os.environ.get("dbuser"),
        "PASSWORD": os.environ.get("dbpassword"),
        "HOST": os.environ.get("hostip"),
        "PORT": os.environ.get("pnumber"),
    }
}

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Europe/Luxembourg"
USE_I18N = True
USE_L10N = True
USE_TZ = True

SITE_ID = 2
USE_S3 = os.getenv("USE_S3") == "TRUE"

if USE_S3:
    # aws settings
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
    AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME")
    AWS_DEFAULT_ACL = None
    AWS_S3_CUSTOM_DOMAIN = (
        f"https://{AWS_STORAGE_BUCKET_NAME}.s3.eu-west-2.amazonaws.com"
    )
    AWS_S3_OBJECT_PARAMETERS = {"CacheControl": "max-age=86400"}
    # s3 static settings
    STATIC_LOCATION = "static"
    STATIC_URL = "/static/"
    STATIC_ROOT = os.path.join(BASE_DIR, "static")
    MEDIA_ROOT = os.path.join(BASE_DIR, "media")
    # STATIC_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{STATIC_LOCATION}/"
    # STATICFILES_STORAGE = "home.storage_backends.StaticStorage"
    # s3 public media settings
    PUBLIC_MEDIA_LOCATION = "media"
    # MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/"
    MEDIA_URL = "/media/"
    # DEFAULT_FILE_STORAGE = "home.storage_backends.PublicMediaStorage"
    DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
    AWS_S3_REGION_NAME = os.getenv("AWS_S3_REGION_NAME")
else:
    STATIC_URL = "/static/"
    MEDIA_URL = "/media/"


REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.AllowAny",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
}


ACCOUNT_EMAIL_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = "username"
ACCOUNT_EMAIL_VERIFICATION = "none"
ACCOUNT_LOGIN_ON_EMAIL_CONFIRMATION = True
LOGIN_REDIRECT_URL = "/"

# dev

WSGI_APPLICATION = "home.wsgi.application"

CORS_ORIGIN_WHITELIST = (
    "http://localhost:8000",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
    "https://shop.lapetiteportugaise.eu",
    "https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com",
)


# Stripe

STRIPE_PUBLIC_KEY = "pk_test_eRajPaamV4LUIhBv3oFmauqn"
STRIPE_SECRET_KEY = "sk_test_XILCGBz8vPvjJtMWvrwD0jtS"

# prod

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Posthog
POSTHOG_KEY = os.environ.get("POSTHOG_KEY", "")
POSTHOG_DOMAIN = os.environ.get("POSTHOG_DOMAIN", "")

if os.environ.get("DJANGO_DEVELOPMENT") is None:
    # Sentry
    import sentry_sdk  # pylint: disable=import-error
    from sentry_sdk.integrations.django import DjangoIntegration

    sentry_sdk.init(
        dsn="https://edab42407c7042cb9826032d2aae6234@sentry.io/2550899",
        integrations=[DjangoIntegration()],
    )
    # SECURITY

    # clients should access this website through HTTPS exclusively,
    # if for some reason it is not the case website will not load
    SECURE_HSTS_SECONDS = 31536000
    # Is a default in django3
    # Adds an http header of nosniff on all responses
    SECURE_CONTENT_TYPE_NOSNIFF = True
    # Adds an http header of xss on all responses
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_SSL_REDIRECT = True
    # Tells the browser to only accept session cookies from HTTPS
    SESSION_COOKIE_SECURE = True
    # the browser will block the resource from loading in a frame no matter which site made the request
    X_FRAME_OPTIONS = "DENY"
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    # Tells the browser to set the cookie only when an HTTPS connection is established
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_PRELOAD = True


SESSION_COOKIE_SAMESITE = "Strict"
LANGUAGE_COOKIE_SAMESITE = "Strict"


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(asctime)s %(name)s.%(funcName)s:%(lineno)s- %(message)s"
        },
        "simple": {"format": "{levelname} {message}", "style": "{"},
    },
    "handlers": {
        "console": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "file": {
            "level": "ERROR",
            "class": "logging.FileHandler",
            "filename": os.path.join(BASE_DIR, "error.log"),
            "formatter": "verbose",
        },
    },
    "loggers": {
        "django": {
            # output logs to the console and to the file
            "level": "INFO",
            "handlers": ["file", "console"],
            "propagate": True,
        }
    },
}
