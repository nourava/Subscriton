"""
URL configuration for Brightloop Subscription Management System (config).

API routing architecture designed for multi-developer modular development.
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """
    Health check and API catalog endpoint.
    Used by the frontend to verify backend connectivity.
    """
    return Response({
        "status": "online",
        "service": "Brightloop Subscription Management API",
        "version": "1.0.0",
        "endpoints": {
            "auth": "/api/auth/",
            "products": "/api/products/",
            "plans": "/api/plans/",
            "quotations": "/api/quotations/",
            "subscriptions": "/api/subscriptions/",
            "invoices": "/api/invoices/",
            "discounts": "/api/discounts/",
            "payments": "/api/payments/",
            "reports": "/api/reports/",
            "health": "/api/health/",
        },
        "developer_note": "Modular architecture ready for feature team expansion."
    })

urlpatterns = [
    # Admin Panel
    path('admin/', admin.site.urls),

    # Health & Meta
    path('api/health/', health_check, name='api_health'),

    # Modular App Endpoints
    path('api/auth/', include('accounts.urls')),
    path('api/products/', include('products.urls')),
    path('api/plans/', include('plans.urls')),
    path('api/quotations/', include('quotations.urls')),
    path('api/subscriptions/', include('subscriptions.urls')),
    path('api/invoices/', include('invoices.urls')),
    path('api/discounts/', include('discounts.urls')),
    path('api/payments/', include('payments.urls')),
    path('api/reports/', include('reports.urls')),
]
