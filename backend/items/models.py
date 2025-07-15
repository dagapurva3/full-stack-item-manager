from django.db import models
from django.core.exceptions import ValidationError
from .enums import ItemGroup, ItemStatus, ItemPriority
from .utils.validators import validate_enum_value, validate_unique_name_within_group


class Item(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    group = models.CharField(
        max_length=20, choices=ItemGroup.choices(), default=ItemGroup.PRIMARY.value
    )
    status = models.CharField(
        max_length=20, choices=ItemStatus.choices(), default=ItemStatus.ACTIVE.value
    )
    priority = models.CharField(
        max_length=20, choices=ItemPriority.choices(), default=ItemPriority.MEDIUM.value
    )
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    quantity = models.PositiveIntegerField(default=1)
    location = models.CharField(max_length=200, blank=True, null=True)
    tags = models.CharField(
        max_length=500, blank=True, null=True
    )  # Comma-separated tags
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ["name", "group"]
        ordering = ["-created_at"]
        verbose_name = "Item"
        verbose_name_plural = "Items"

    def clean(self):
        """Validate the item instance for unique name and valid enum values."""
        validate_unique_name_within_group(Item, self.name, self.group, self.pk)
        validate_enum_value(self.group, ItemGroup.values(), "group")
        validate_enum_value(self.status, ItemStatus.values(), "status")
        validate_enum_value(self.priority, ItemPriority.values(), "priority")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.group})"

    @property
    def tag_list(self):
        """Return tags as a list"""
        if self.tags:
            return [tag.strip() for tag in self.tags.split(",")]
        return []

    @property
    def is_urgent(self):
        """Check if item is urgent priority"""
        return self.priority == ItemPriority.URGENT.value

    @property
    def is_active(self):
        """Check if item is active"""
        return self.status == ItemStatus.ACTIVE.value

    @property
    def is_primary_group(self):
        """Check if item belongs to primary group"""
        return self.group == ItemGroup.PRIMARY.value

    @property
    def is_high_priority(self):
        """Check if item has high or urgent priority"""
        return self.priority in [ItemPriority.HIGH.value, ItemPriority.URGENT.value]

    @classmethod
    def get_by_status(cls, status):
        """Get all items by status"""
        if status not in ItemStatus.values():
            raise ValueError(f"Invalid status: {status}")
        return cls.objects.filter(status=status)

    @classmethod
    def get_by_priority(cls, priority):
        """Get all items by priority"""
        if priority not in ItemPriority.values():
            raise ValueError(f"Invalid priority: {priority}")
        return cls.objects.filter(priority=priority)

    @classmethod
    def get_by_group(cls, group):
        """Get all items by group"""
        if group not in ItemGroup.values():
            raise ValueError(f"Invalid group: {group}")
        return cls.objects.filter(group=group)

    @classmethod
    def get_urgent_items(cls):
        """Get all urgent items"""
        return cls.objects.filter(priority=ItemPriority.URGENT.value)

    @classmethod
    def get_active_items(cls):
        """Get all active items"""
        return cls.objects.filter(status=ItemStatus.ACTIVE.value)
