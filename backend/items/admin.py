from django.contrib import admin
from .models import Item, ItemGroup, ItemStatus, ItemPriority


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "group",
        "status",
        "priority",
        "price",
        "quantity",
        "location",
        "created_at",
        "updated_at",
    ]
    list_filter = [
        ("group", admin.ChoicesFieldListFilter),
        ("status", admin.ChoicesFieldListFilter),
        ("priority", admin.ChoicesFieldListFilter),
        "created_at",
        "updated_at",
    ]
    search_fields = ["name", "description", "location", "tags"]
    readonly_fields = [
        "created_at",
        "updated_at",
        "tag_list",
        "is_urgent",
        "is_active",
        "is_primary_group",
        "is_high_priority",
    ]

    fieldsets = (
        ("Basic Information", {"fields": ("name", "description", "group")}),
        ("Status & Priority", {"fields": ("status", "priority")}),
        ("Details", {"fields": ("price", "quantity", "location", "tags")}),
        (
            "Metadata",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                    "tag_list",
                    "is_urgent",
                    "is_active",
                    "is_primary_group",
                    "is_high_priority",
                ),
                "classes": ("collapse",),
            },
        ),
    )

    list_per_page = 25
    ordering = ["-created_at"]

    def get_queryset(self, request):
        """Optimize queryset with select_related if needed"""
        return super().get_queryset(request)

    def get_list_display(self, request):
        """Customize list display based on user permissions"""
        list_display = list(super().get_list_display(request))
        return list_display

    def get_list_filter(self, request):
        """Customize list filters"""
        list_filter = list(super().get_list_filter(request))
        return list_filter

    def get_search_fields(self, request):
        """Customize search fields"""
        search_fields = list(super().get_search_fields(request))
        return search_fields

    def get_readonly_fields(self, request, obj=None):
        """Customize readonly fields"""
        readonly_fields = list(super().get_readonly_fields(request, obj))
        return readonly_fields

    def get_fieldsets(self, request, obj=None):
        """Customize fieldsets"""
        fieldsets = list(super().get_fieldsets(request, obj))
        return fieldsets

    # Custom admin actions
    def make_active(self, request, queryset):
        """Mark selected items as active"""
        updated = queryset.update(status=ItemStatus.ACTIVE.value)
        self.message_user(request, f"{updated} items marked as active.")

    make_active.short_description = "Mark selected items as active"

    def make_inactive(self, request, queryset):
        """Mark selected items as inactive"""
        updated = queryset.update(status=ItemStatus.INACTIVE.value)
        self.message_user(request, f"{updated} items marked as inactive.")

    make_inactive.short_description = "Mark selected items as inactive"

    def make_urgent(self, request, queryset):
        """Mark selected items as urgent priority"""
        updated = queryset.update(priority=ItemPriority.URGENT.value)
        self.message_user(request, f"{updated} items marked as urgent priority.")

    make_urgent.short_description = "Mark selected items as urgent priority"

    actions = [make_active, make_inactive, make_urgent]
