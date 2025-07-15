# backend/items/services/base_service.py
"""
Base service class for shared service logic.
Extend this for model-specific services.
"""
from typing import Any, Type

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response


class BaseService:
    model: Type[Any] = None
    serializer_class: Type[Any] = None

    @classmethod
    def list(cls):
        objects = cls.model.objects.all()
        serializer = cls.serializer_class(objects, many=True)
        return serializer.data

    @classmethod
    def retrieve(cls, pk: int):
        obj = get_object_or_404(cls.model, pk=pk)
        serializer = cls.serializer_class(obj)
        return serializer.data

    @classmethod
    def create(cls, data: dict):
        serializer = cls.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return serializer.data, status.HTTP_201_CREATED, None
        return None, status.HTTP_400_BAD_REQUEST, serializer.errors

    @classmethod
    def update(cls, pk: int, data: dict):
        obj = get_object_or_404(cls.model, pk=pk)
        serializer = cls.serializer_class(obj, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return serializer.data, status.HTTP_200_OK, None
        return None, status.HTTP_400_BAD_REQUEST, serializer.errors
