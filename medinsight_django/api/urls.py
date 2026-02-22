from django.urls import path
from . import views

urlpatterns = [
    path("analyze/prescription/", views.analyze_prescription, name="analyze_prescription"),
    path("analyze/cxr/", views.analyze_cxr, name="analyze_cxr"),
    path("analyze/qa/", views.analyze_qa, name="analyze_qa"),
    path("warmup/", views.warmup),
]
