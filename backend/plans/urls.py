from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlanViewSet, PlanFeatureViewSet

router = DefaultRouter()
router.register(r'features', PlanFeatureViewSet, basename='plan-feature')
router.register(r'', PlanViewSet, basename='plan')

urlpatterns = [
    path('', include(router.urls)),
]
