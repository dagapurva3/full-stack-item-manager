from enum import Enum


class ItemGroup(Enum):
    PRIMARY = "Primary"
    SECONDARY = "Secondary"

    @classmethod
    def choices(cls):
        return [(member.value, member.value) for member in cls]

    @classmethod
    def values(cls):
        return [member.value for member in cls]


class ItemStatus(Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    ARCHIVED = "archived"

    @classmethod
    def choices(cls):
        return [(member.value, member.value.title()) for member in cls]

    @classmethod
    def values(cls):
        return [member.value for member in cls]


class ItemPriority(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

    @classmethod
    def choices(cls):
        return [(member.value, member.value.title()) for member in cls]

    @classmethod
    def values(cls):
        return [member.value for member in cls]
