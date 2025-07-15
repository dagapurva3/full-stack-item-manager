# backend/items/utils/validators.py
"""
Shared validators for the items app.
"""
from django.core.exceptions import ValidationError


def validate_enum_value(value, valid_values, field_name):
    if value not in valid_values:
        raise ValidationError(
            f"Invalid {field_name} value. Must be one of: {valid_values}"
        )


def validate_unique_name_within_group(model, name, group, pk=None):
    qs = model.objects.filter(name=name, group=group)
    if pk:
        qs = qs.exclude(pk=pk)
    if qs.exists():
        raise ValidationError(
            f"An item with name '{name}' already exists in the {group} group."
        )
