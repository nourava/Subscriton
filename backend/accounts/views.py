"""Accounts API views."""
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer, RegisterSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing users.
    Permissions: Staff and Admin can view all users.
    """
    queryset = User.objects.all().order_by('-created_at')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class CurrentUserView(APIView):
    """
    Returns the currently authenticated user's profile and permissions.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        if not request.user.is_authenticated:
            # Starter mock response for development convenience
            return Response({
                "authenticated": False,
                "message": "User not logged in.",
                "sample_roles": ["ADMIN", "STAFF", "CUSTOMER"]
            })
        serializer = UserSerializer(request.user)
        return Response({
            "authenticated": True,
            "user": serializer.data
        })
