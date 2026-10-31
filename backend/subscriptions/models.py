"""Subscriptions models for Brightloop."""
from django.db import models
from django.conf import settings
from plans.models import Plan

class SubscriptionStatus(models.TextChoices):
    TRIALING = 'TRIALING', 'Trialing'
    ACTIVE = 'ACTIVE', 'Active'
    PAST_DUE = 'PAST_DUE', 'Past Due'
    CANCELED = 'CANCELED', 'Canceled'
    PAUSED = 'PAUSED', 'Paused'

class Subscription(models.Model):
    subscription_number = models.CharField(max_length=50, unique=True)
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='subscriptions', on_delete=models.CASCADE)
    plan = models.ForeignKey(Plan, related_name='subscriptions', on_delete=models.PROTECT)
    status = models.CharField(
        max_length=20,
        choices=SubscriptionStatus.choices,
        default=SubscriptionStatus.ACTIVE
    )
    start_date = models.DateField()
    current_period_start = models.DateField()
    current_period_end = models.DateField()
    cancel_at_period_end = models.BooleanField(default=False)
    canceled_at = models.DateTimeField(null=True, blank=True)
    auto_renew = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.subscription_number} - {self.customer.username} ({self.plan.name})"
