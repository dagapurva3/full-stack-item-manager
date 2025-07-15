from django.db import models
from django.core.exceptions import ValidationError


class Item(models.Model):
    GROUP_CHOICES = [
        ("Primary", "Primary"),
        ("Secondary", "Secondary"),
    ]

    STATUS_CHOICES = [
        ("active", "Active"),
        ("inactive", "Inactive"),
        ("archived", "Archived"),
    ]

    PRIORITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
        ("urgent", "Urgent"),
    ]

    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    group = models.CharField(max_length=20, choices=GROUP_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="active")
    priority = models.CharField(
        max_length=20, choices=PRIORITY_CHOICES, default="medium"
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

    def clean(self):
        # Check for unique name within the same group
        if (
            Item.objects.filter(name=self.name, group=self.group)
            .exclude(pk=self.pk)
            .exists()
        ):
            raise ValidationError(
                f"An item with name '{self.name}' already exists in the {self.group} group."
            )

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
        return self.priority == "urgent"

    @property
    def is_active(self):
        """Check if item is active"""
        return self.status == "active"
