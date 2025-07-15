from django.contrib import admin
from .models import Item


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
    list_filter = ["group", "status", "priority", "created_at", "updated_at"]
    search_fields = ["name", "description", "location", "tags"]
    readonly_fields = ["created_at", "updated_at", "tag_list", "is_urgent", "is_active"]

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
                ),
                "classes": ("collapse",),
            },
        ),
    )

    list_per_page = 25
    ordering = ["-created_at"]
