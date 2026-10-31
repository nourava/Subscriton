from django.contrib import admin
from .models import Plan, PlanFeature

class PlanFeatureInline(admin.TabularInline):
    model = PlanFeature
    extra = 1

@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'price', 'currency', 'billing_interval', 'is_active')
    list_filter = ('billing_interval', 'is_active')
    inlines = [PlanFeatureInline]
