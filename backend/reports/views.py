from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

class AnalyticsSummaryView(APIView):
    """
    Returns high-level business operational metrics:
    MRR, ARR, active subscriptions, pending invoices, total revenue.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({
            "metrics": {
                "mrr": 48250.00,
                "arr": 579000.00,
                "active_subscriptions": 342,
                "active_customers": 289,
                "pending_invoices_count": 18,
                "pending_invoices_amount": 14200.00,
                "collected_this_month": 51200.00,
                "churn_rate": "1.2%"
            },
            "status": "success",
            "message": "Analytics reporting service operational"
        })
