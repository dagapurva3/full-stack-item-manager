# Service layer for item-related business logic
from ..models import Item
from ..serializers import ItemSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from .base_service import BaseService


class ItemService(BaseService):
    model = Item
    serializer_class = ItemSerializer


def list_items() -> list:
    return ItemService.list()


def create_item(data: dict) -> tuple:
    return ItemService.create(data)


def get_item(pk: int) -> dict:
    return ItemService.retrieve(pk)


def update_item(pk: int, data: dict) -> tuple:
    return ItemService.update(pk, data)


def get_items_by_status(status_value: str) -> list:
    """Get items filtered by status."""
    items = Item.get_by_status(status_value)
    serializer = ItemSerializer(items, many=True)
    return serializer.data


def get_items_by_priority(priority_value: str) -> list:
    """Get items filtered by priority."""
    items = Item.get_by_priority(priority_value)
    serializer = ItemSerializer(items, many=True)
    return serializer.data


def get_urgent_items() -> list:
    """Get all urgent items."""
    items = Item.get_urgent_items()
    serializer = ItemSerializer(items, many=True)
    return serializer.data


def get_active_items() -> list:
    """Get all active items."""
    items = Item.get_active_items()
    serializer = ItemSerializer(items, many=True)
    return serializer.data
