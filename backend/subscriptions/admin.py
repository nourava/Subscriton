from django.contrib import admin
from .models import Subscription

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('subscription_number', 'customer', 'plan', 'status', 'current_period_end', 'auto_renew')
    list_filter = ('status', 'auto_renew', 'plan')
    search_fields = ('subscription_number', 'customer__username', 'customer__email')
