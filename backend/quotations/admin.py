from django.contrib import admin
from .models import Quotation, QuotationItem

class QuotationItemInline(admin.TabularInline):
    model = QuotationItem
    extra = 1

@admin.register(Quotation)
class QuotationAdmin(admin.ModelAdmin):
    list_display = ('reference_number', 'customer', 'status', 'total_amount', 'valid_until', 'created_at')
    list_filter = ('status', 'valid_until')
    inlines = [QuotationItemInline]
