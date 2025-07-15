# API Documentation

## Base URL
```
http://localhost:8000/api/
```

## Authentication
Currently, the API does not require authentication for basic CRUD operations.

## Endpoints

### 1. Get Constants and Enum Values
**GET** `/items/constants/`

Returns all available enum values, color schemes, and field descriptions for the frontend.

**Response:**
```json
{
  "groups": ["Primary", "Secondary"],
  "statuses": ["active", "inactive", "archived"],
  "priorities": ["low", "medium", "high", "urgent"],
  "color_schemes": {
    "group": {
      "Primary": "blue",
      "Secondary": "green"
    },
    "status": {
      "active": "green",
      "inactive": "gray",
      "archived": "red"
    },
    "priority": {
      "low": "green",
      "medium": "yellow",
      "high": "orange",
      "urgent": "red"
    }
  },
  "field_descriptions": {
    "name": "Item name (required, unique within group)",
    "description": "Detailed item description",
    "group": "Item group (Primary, Secondary)",
    "status": "Item status (active, inactive, archived)",
    "priority": "Priority level (low, medium, high, urgent)",
    "price": "Item price (decimal with 2 decimal places)",
    "quantity": "Stock quantity (positive integer)",
    "location": "Item location or storage area",
    "tags": "Comma-separated tags for categorization"
  },
  "validation_messages": {
    "group": "Group must be one of: ['Primary', 'Secondary']",
    "status": "Status must be one of: ['active', 'inactive', 'archived']",
    "priority": "Priority must be one of: ['low', 'medium', 'high', 'urgent']"
  }
}
```

### 2. List All Items
**GET** `/items/`

Returns a list of all items.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Sample Item",
    "description": "A detailed description of the item",
    "group": "Primary",
    "status": "active",
    "priority": "high",
    "price": "29.99",
    "quantity": 5,
    "location": "Warehouse A, Shelf 3",
    "tags": "electronics, gadgets, new",
    "tag_list": ["electronics", "gadgets", "new"],
    "is_urgent": false,
    "is_active": true,
    "is_primary_group": true,
    "is_high_priority": true,
    "created_at": "2024-01-01T12:00:00Z",
    "updated_at": "2024-01-01T12:00:00Z"
  }
]
```

### 3. Create New Item
**POST** `/items/`

Creates a new item.

**Request Body:**
```json
{
  "name": "New Item",
  "description": "A detailed description",
  "group": "Primary",
  "status": "active",
  "priority": "high",
  "price": "29.99",
  "quantity": 5,
  "location": "Warehouse A",
  "tags": "electronics, gadgets, new"
}
```

**Validation Rules:**
- `name` is required and must be a string
- `group` must be one of: "Primary", "Secondary"
- `status` must be one of: "active", "inactive", "archived"
- `priority` must be one of: "low", "medium", "high", "urgent"
- Item names must be unique within the same group
- `price` must be a positive decimal with 2 decimal places
- `quantity` must be a positive integer

### 4. Get Specific Item
**GET** `/items/{id}/`

Returns details of a specific item.

**Response:**
```json
{
  "id": 1,
  "name": "Sample Item",
  "description": "A detailed description of the item",
  "group": "Primary",
  "status": "active",
  "priority": "high",
  "price": "29.99",
  "quantity": 5,
  "location": "Warehouse A, Shelf 3",
  "tags": "electronics, gadgets, new",
  "tag_list": ["electronics", "gadgets", "new"],
  "is_urgent": false,
  "is_active": true,
  "is_primary_group": true,
  "is_high_priority": true,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-01T12:00:00Z"
}
```

### 5. Update Item
**PATCH** `/items/{id}/`

Updates an existing item.

**Request Body:**
```json
{
  "name": "Updated Item Name",
  "status": "inactive",
  "priority": "urgent"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Updated Item Name",
  "description": "A detailed description of the item",
  "group": "Primary",
  "status": "inactive",
  "priority": "urgent",
  "price": "29.99",
  "quantity": 5,
  "location": "Warehouse A, Shelf 3",
  "tags": "electronics, gadgets, new",
  "tag_list": ["electronics", "gadgets", "new"],
  "is_urgent": true,
  "is_active": false,
  "is_primary_group": true,
  "is_high_priority": true,
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-01T13:00:00Z"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "group": ["Invalid group value. Must be one of: ['Primary', 'Secondary']"],
  "status": ["Invalid status value. Must be one of: ['active', 'inactive', 'archived']"],
  "priority": ["Invalid priority value. Must be one of: ['low', 'medium', 'high', 'urgent']"],
  "name": ["An item with name 'Test Item' already exists in the Primary group."]
}
```

### 404 Not Found
```json
{
  "error": "Item not found"
}
```

## Data Model

### Item
| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| id | Integer | Unique identifier (auto-generated) | - |
| name | String | Item name (required) | Unique within group |
| description | Text | Detailed item description | Optional |
| group | String | Item group | "Primary" or "Secondary" |
| status | String | Item status | "active", "inactive", or "archived" |
| priority | String | Priority level | "low", "medium", "high", or "urgent" |
| price | Decimal | Item price | Optional, 2 decimal places |
| quantity | Integer | Stock quantity | Required, positive integer |
| location | String | Item location | Optional |
| tags | String | Comma-separated tags | Optional |
| created_at | DateTime | Creation timestamp | Auto-generated |
| updated_at | DateTime | Last update timestamp | Auto-generated |

### Computed Properties
| Property | Type | Description |
|----------|------|-------------|
| tag_list | Array | Tags as a list |
| is_urgent | Boolean | True if priority is urgent |
| is_active | Boolean | True if status is active |
| is_primary_group | Boolean | True if group is Primary |
| is_high_priority | Boolean | True if priority is high or urgent |

## Enum Values

### Groups
- `Primary`
- `Secondary`

### Statuses
- `active`
- `inactive`
- `archived`

### Priorities
- `low`
- `medium`
- `high`
- `urgent`

## Business Rules

1. **Unique Names per Group**: Item names must be unique within the same group
2. **Cross-Group Names**: The same name can exist in both Primary and Secondary groups
3. **Enum Validation**: All enum fields must use predefined values
4. **Timestamps**: Created and updated timestamps are automatically managed
5. **Price Validation**: Price must be positive with 2 decimal places
6. **Quantity Validation**: Quantity must be a positive integer

## Testing with curl

```bash
# Get constants
curl http://localhost:8000/api/items/constants/

# List all items
curl http://localhost:8000/api/items/

# Create an item with all fields
curl -X POST http://localhost:8000/api/items/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Item",
    "description": "A test item with full details",
    "group": "Primary",
    "status": "active",
    "priority": "high",
    "price": "29.99",
    "quantity": 5,
    "location": "Warehouse A",
    "tags": "test, sample, new"
  }'

# Get specific item
curl http://localhost:8000/api/items/1/

# Update an item
curl -X PATCH http://localhost:8000/api/items/1/ \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Item", "status": "inactive"}'
``` 