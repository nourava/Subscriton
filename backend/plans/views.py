from rest_framework import viewsets, permissions
from .models import Plan, PlanFeature
from .serializers import PlanSerializer, PlanFeatureSerializer

class PlanViewSet(viewsets.ModelViewSet):
    """API endpoint for managing subscription plans."""
    queryset = Plan.objects.all().order_by('price')
    serializer_class = PlanSerializer
    permission_classes = [permissions.AllowAny]

class PlanFeatureViewSet(viewsets.ModelViewSet):
    """API endpoint for managing plan features."""
    queryset = PlanFeature.objects.all()
    serializer_class = PlanFeatureSerializer
    permission_classes = [permissions.AllowAny]
