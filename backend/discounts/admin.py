from django.contrib import admin
from .models import Discount

@admin.register(Discount)
class DiscountAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'discount_type', 'value', 'is_active', 'redeemed_count')
    list_filter = ('discount_type', 'is_active')
