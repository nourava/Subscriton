from rest_framework import viewsets, permissions
from .models import Quotation, QuotationItem
from .serializers import QuotationSerializer, QuotationItemSerializer

class QuotationViewSet(viewsets.ModelViewSet):
    """API endpoint for managing quotations."""
    queryset = Quotation.objects.all().order_by('-created_at')
    serializer_class = QuotationSerializer
    permission_classes = [permissions.AllowAny]

class QuotationItemViewSet(viewsets.ModelViewSet):
    queryset = QuotationItem.objects.all()
    serializer_class = QuotationItemSerializer
    permission_classes = [permissions.AllowAny]
