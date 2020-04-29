from django.templatetags.static import static
from django.urls import reverse
from django.views.generic import TemplateView
from django.shortcuts import render


def index(request):
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
