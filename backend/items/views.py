from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Item, ItemGroup, ItemStatus, ItemPriority
from .serializers import ItemSerializer
from .constants import (
    ITEM_GROUPS,
    ITEM_STATUSES,
    ITEM_PRIORITIES,
    COLOR_SCHEMES,
    FIELD_DESCRIPTIONS,
    VALIDATION_MESSAGES,
)
from .services import item_service


@api_view(["GET"])
def item_constants(request):
    """
    Get available enum values and constants for the frontend.
    """
    return Response(
        {
            "groups": ITEM_GROUPS,
            "statuses": ITEM_STATUSES,
            "priorities": ITEM_PRIORITIES,
            "color_schemes": COLOR_SCHEMES,
            "field_descriptions": FIELD_DESCRIPTIONS,
            "validation_messages": VALIDATION_MESSAGES,
        }
    )


@api_view(["GET", "POST"])
def item_list(request):
    """
    List all items or create a new item.
    """
    if request.method == "GET":
        data = item_service.list_items()
        return Response(data)

    elif request.method == "POST":
        data, status_code, errors = item_service.create_item(request.data)
        if status_code == status.HTTP_201_CREATED:
            return Response(data, status=status_code)
        return Response(errors, status=status_code)


@api_view(["GET", "PATCH"])
def item_detail(request, pk):
    """
    Retrieve or update a specific item.
    """
    try:
        get_object_or_404(Item, pk=pk)
    except Item.DoesNotExist:
        return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        data = item_service.get_item(pk)
        return Response(data)

    elif request.method == "PATCH":
        data, status_code, errors = item_service.update_item(pk, request.data)
        if status_code == status.HTTP_200_OK:
            return Response(data)
        return Response(errors, status=status_code)


@api_view(["GET"])
def items_by_status(request, status_value):
    """
    Get items filtered by status.
    """
    if status_value not in ITEM_STATUSES:
        return Response(
            {"error": f"Invalid status. Must be one of: {ITEM_STATUSES}"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    data = item_service.get_items_by_status(status_value)
    return Response(data)


@api_view(["GET"])
def items_by_priority(request, priority_value):
    """
    Get items filtered by priority.
    """
    if priority_value not in ITEM_PRIORITIES:
        return Response(
            {"error": f"Invalid priority. Must be one of: {ITEM_PRIORITIES}"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    data = item_service.get_items_by_priority(priority_value)
    return Response(data)


@api_view(["GET"])
def urgent_items(request):
    """
    Get all urgent items.
    """
    data = item_service.get_urgent_items()
    return Response(data)


@api_view(["GET"])
def active_items(request):
    """
    Get all active items.
    """
    data = item_service.get_active_items()
    return Response(data)
