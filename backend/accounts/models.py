"""
Accounts models for Brightloop.
Defines User model with Role-Based Access Control (Admin, Staff, Customer).
"""
from django.contrib.auth.models import AbstractUser
from django.db import models

class UserRole(models.TextChoices):
    ADMIN = 'ADMIN', 'Admin'
    STAFF = 'STAFF', 'Staff'
    CUSTOMER = 'CUSTOMER', 'Customer'

class User(AbstractUser):
    """
    Custom user model supporting Brightloop roles.
    """
    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.CUSTOMER,
        help_text="Designates the system role and permission level."
    )
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    company_name = models.CharField(max_length=150, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def is_admin(self):
        return self.role == UserRole.ADMIN or self.is_superuser

    @property
    def is_staff_member(self):
        return self.role == UserRole.STAFF or self.is_admin

    @property
    def is_customer(self):
        return self.role == UserRole.CUSTOMER

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
