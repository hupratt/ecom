
from allauth.socialaccount.providers.oauth2.urls import default_urlpatterns

from .provider import GoogleProvider


urlpatterns = default_urlpatterns(GoogleProvider)
