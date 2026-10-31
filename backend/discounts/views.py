from rest_framework import viewsets, permissions
from .models import Discount
from .serializers import DiscountSerializer

class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all().order_by('-created_at')
    serializer_class = DiscountSerializer
    permission_classes = [permissions.AllowAny]
