from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    customer_username = serializers.ReadOnlyField(source='customer.username')

    class Meta:
        model = Payment
        fields = '__all__'
