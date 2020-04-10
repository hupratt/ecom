from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.shortcuts import render
import debug_toolbar


def index(request):
    return render(request, "frontend/index.html")


urlpatterns = [
    path("api-auth/", include("rest_framework.urls")),
    path("rest-auth/", include("rest_auth.urls")),
    path("rest-auth/registration/", include("rest_auth.registration.urls")),
    path("admin/", admin.site.urls),
    path("api/", include("core.api.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# make sure this is always last
urlpatterns += [re_path(r"^.*", index)]

if settings.DEBUG:
    urlpatterns += [path("__debug__/", include(debug_toolbar.urls))]
