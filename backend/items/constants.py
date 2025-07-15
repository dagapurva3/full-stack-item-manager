"""
Constants for the Items app.
This module centralizes all enum values and choices for better maintainability.
"""

from .models import ItemGroup, ItemStatus, ItemPriority

# Enum values for API documentation and frontend use
ITEM_GROUPS = ItemGroup.values()
ITEM_STATUSES = ItemStatus.values()
ITEM_PRIORITIES = ItemPriority.values()

# Choices for forms and serializers
ITEM_GROUP_CHOICES = ItemGroup.choices()
ITEM_STATUS_CHOICES = ItemStatus.choices()
ITEM_PRIORITY_CHOICES = ItemPriority.choices()

# Default values
DEFAULT_GROUP = ItemGroup.PRIMARY.value
DEFAULT_STATUS = ItemStatus.ACTIVE.value
DEFAULT_PRIORITY = ItemPriority.MEDIUM.value

# Validation messages
VALIDATION_MESSAGES = {
    "group": f"Group must be one of: {ITEM_GROUPS}",
    "status": f"Status must be one of: {ITEM_STATUSES}",
    "priority": f"Priority must be one of: {ITEM_PRIORITIES}",
    "name_required": "Item name is required",
    "name_unique": "An item with this name already exists in the selected group",
    "price_positive": "Price must be a positive number",
    "quantity_positive": "Quantity must be a positive integer",
}

# API field descriptions
FIELD_DESCRIPTIONS = {
    "name": "Item name (required, unique within group)",
    "description": "Detailed item description",
    "group": f'Item group ({", ".join(ITEM_GROUPS)})',
    "status": f'Item status ({", ".join(ITEM_STATUSES)})',
    "priority": f'Priority level ({", ".join(ITEM_PRIORITIES)})',
    "price": "Item price (decimal with 2 decimal places)",
    "quantity": "Stock quantity (positive integer)",
    "location": "Item location or storage area",
    "tags": "Comma-separated tags for categorization",
    "created_at": "Creation timestamp (auto-generated)",
    "updated_at": "Last update timestamp (auto-generated)",
}

# Color schemes for UI
COLOR_SCHEMES = {
    "group": {
        ItemGroup.PRIMARY.value: "blue",
        ItemGroup.SECONDARY.value: "green",
    },
    "status": {
        ItemStatus.ACTIVE.value: "green",
        ItemStatus.INACTIVE.value: "gray",
        ItemStatus.ARCHIVED.value: "red",
    },
    "priority": {
        ItemPriority.LOW.value: "green",
        ItemPriority.MEDIUM.value: "yellow",
        ItemPriority.HIGH.value: "orange",
        ItemPriority.URGENT.value: "red",
    },
}

# Business rules
BUSINESS_RULES = {
    "unique_name_per_group": True,
    "allow_same_name_different_groups": True,
    "auto_timestamps": True,
    "price_decimal_places": 2,
    "quantity_min_value": 1,
    "tags_separator": ",",
}
