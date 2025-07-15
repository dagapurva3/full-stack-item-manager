from rest_framework import serializers
from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    tag_list = serializers.ReadOnlyField()
    is_urgent = serializers.ReadOnlyField()
    is_active = serializers.ReadOnlyField()

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

        return data
