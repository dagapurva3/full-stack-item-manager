from django.urls import path

from . import views

urlpatterns = [
    path("items/", views.item_list, name="item-list"),
    path("items/<int:pk>/", views.item_detail, name="item-detail"),
    path("items/constants/", views.item_constants, name="item-constants"),
    path(
        "items/status/<str:status_value>/",
        views.items_by_status,
        name="items-by-status",
    ),
    path(
        "items/priority/<str:priority_value>/",
        views.items_by_priority,
        name="items-by-priority",
    ),
    path("items/urgent/", views.urgent_items, name="urgent-items"),
    path("items/active/", views.active_items, name="active-items"),
]
