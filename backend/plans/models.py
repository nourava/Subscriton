"""Subscription plans models for Brightloop."""
from django.db import models
from products.models import Product

class BillingInterval(models.TextChoices):
    MONTHLY = 'MONTHLY', 'Monthly'
    QUARTERLY = 'QUARTERLY', 'Quarterly'
    YEARLY = 'YEARLY', 'Yearly'

class Plan(models.Model):
    name = models.CharField(max_length=150)
    code = models.CharField(max_length=50, unique=True)
    product = models.ForeignKey(Product, related_name='plans', on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    billing_interval = models.CharField(
        max_length=20,
        choices=BillingInterval.choices,
        default=BillingInterval.MONTHLY
    )
    trial_period_days = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.get_billing_interval_display()})"

class PlanFeature(models.Model):
    plan = models.ForeignKey(Plan, related_name='features', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    limit_value = models.CharField(max_length=100, blank=True, help_text="e.g. '10 Users' or 'Unlimited'")
    is_included = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.plan.name} - {self.title}"
