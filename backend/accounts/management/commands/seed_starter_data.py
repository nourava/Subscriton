"""Management command to populate initial starter data for Brightloop."""
from django.core.management.base import BaseCommand
from accounts.models import User, UserRole
from products.models import Product, ProductVariant
from plans.models import Plan, BillingInterval, PlanFeature

class Command(BaseCommand):
    help = 'Seeds initial demonstration accounts and plans for Brightloop development'

    def handle(self, *args, **options):
        # 1. Seed demo users for each role
        users_data = [
            {'username': 'admin_brightloop', 'email': 'admin@brightloop.io', 'role': UserRole.ADMIN, 'first_name': 'Sarah', 'last_name': 'Connor', 'is_staff': True, 'is_superuser': True},
            {'username': 'staff_alex', 'email': 'alex@brightloop.io', 'role': UserRole.STAFF, 'first_name': 'Alex', 'last_name': 'Rivera', 'is_staff': True, 'is_superuser': False},
            {'username': 'cust_acme', 'email': 'billing@acmecorp.com', 'role': UserRole.CUSTOMER, 'first_name': 'John', 'last_name': 'Doe', 'company_name': 'Acme Corp', 'is_staff': False, 'is_superuser': False},
        ]

        for u in users_data:
            if not User.objects.filter(username=u['username']).exists():
                user = User.objects.create_user(
                    username=u['username'],
                    email=u['email'],
                    password='brightloop_demo_password_2026',
                    role=u['role'],
                    first_name=u['first_name'],
                    last_name=u['last_name'],
                    company_name=u.get('company_name', 'Brightloop Internal'),
                    is_staff=u['is_staff'],
                    is_superuser=u['is_superuser']
                )
                self.stdout.write(self.style.SUCCESS(f"Created user {user.username} ({user.role})"))

        # 2. Seed demo Product and Plans
        product, _ = Product.objects.get_or_create(
            sku='PROD-BRIGHTLOOP-CORE',
            defaults={
                'name': 'Brightloop Subscription Suite',
                'description': 'Enterprise-grade billing and subscription orchestration engine.'
            }
        )

        plans_data = [
            {'name': 'Starter Tier', 'code': 'PLAN-STARTER', 'price': 49.00, 'interval': BillingInterval.MONTHLY, 'trial': 14},
            {'name': 'Growth Tier', 'code': 'PLAN-GROWTH', 'price': 149.00, 'interval': BillingInterval.MONTHLY, 'trial': 14},
            {'name': 'Enterprise Tier', 'code': 'PLAN-ENTERPRISE', 'price': 499.00, 'interval': BillingInterval.YEARLY, 'trial': 30},
        ]

        for p in plans_data:
            plan, created = Plan.objects.get_or_create(
                code=p['code'],
                defaults={
                    'name': p['name'],
                    'product': product,
                    'price': p['price'],
                    'billing_interval': p['interval'],
                    'trial_period_days': p['trial'],
                    'description': f"Standard {p['name']} for Brightloop clients."
                }
            )
            if created:
                PlanFeature.objects.create(plan=plan, title="API Access", limit_value="Standard", is_included=True)
                PlanFeature.objects.create(plan=plan, title="Multi-currency Billing", limit_value="Supported", is_included=True)
                self.stdout.write(self.style.SUCCESS(f"Created plan {plan.name}"))

        self.stdout.write(self.style.SUCCESS("Starter seed completed successfully!"))
