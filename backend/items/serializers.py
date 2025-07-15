from rest_framework import serializers
from .models import Item, ItemGroup, ItemStatus, ItemPriority


class ItemSerializer(serializers.ModelSerializer):
    tag_list = serializers.ReadOnlyField()
    is_urgent = serializers.ReadOnlyField()
    is_active = serializers.ReadOnlyField()
    is_primary_group = serializers.ReadOnlyField()
    is_high_priority = serializers.ReadOnlyField()

    class Meta:
        model = Item
        fields = [
            "id",
            "name",
            "description",
            "group",
            "status",
            "priority",
            "price",
            "quantity",
            "location",
            "tags",
            "tag_list",
            "is_urgent",
            "is_active",
            "is_primary_group",
            "is_high_priority",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
            "tag_list",
            "is_urgent",
            "is_active",
            "is_primary_group",
            "is_high_priority",
        ]

    def validate(self, data):
        # Check for unique name within the same group
        name = data.get("name")
        group = data.get("group")
        instance = self.instance

        if name and group:
            existing_item = Item.objects.filter(name=name, group=group)
            if instance:
                existing_item = existing_item.exclude(pk=instance.pk)

            if existing_item.exists():
                raise serializers.ValidationError(
                    f"An item with name '{name}' already exists in the {group} group."
                )

        # Validate enum values
        if "group" in data and data["group"] not in ItemGroup.values():
            raise serializers.ValidationError(
                {"group": f"Invalid group value. Must be one of: {ItemGroup.values()}"}
            )

        if "status" in data and data["status"] not in ItemStatus.values():
            raise serializers.ValidationError(
                {
                    "status": f"Invalid status value. Must be one of: {ItemStatus.values()}"
                }
            )

        if "priority" in data and data["priority"] not in ItemPriority.values():
            raise serializers.ValidationError(
                {
                    "priority": f"Invalid priority value. Must be one of: {ItemPriority.values()}"
                }
            )

        return data

    def to_representation(self, instance):
        """Custom representation with enum validation"""
        data = super().to_representation(instance)

        # Ensure enum values are valid in representation
        if data["group"] not in ItemGroup.values():
            data["group"] = ItemGroup.PRIMARY.value

        if data["status"] not in ItemStatus.values():
            data["status"] = ItemStatus.ACTIVE.value

        if data["priority"] not in ItemPriority.values():
            data["priority"] = ItemPriority.MEDIUM.value

        return data
