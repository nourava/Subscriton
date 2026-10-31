from rest_framework import viewsets, permissions
from .models import Product, ProductVariant
from .serializers import ProductSerializer, ProductVariantSerializer

class ProductViewSet(viewsets.ModelViewSet):
    """API endpoint for managing products."""
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

class ProductVariantViewSet(viewsets.ModelViewSet):
    """API endpoint for managing product variants."""
    queryset = ProductVariant.objects.all()
    serializer_class = ProductVariantSerializer
    permission_classes = [permissions.AllowAny]
