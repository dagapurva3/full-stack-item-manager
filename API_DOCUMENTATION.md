# API Documentation

## Base URL
```
http://localhost:8000/api/
```

## Authentication
Currently, the API does not require authentication for basic CRUD operations.

## Endpoints

### 1. List All Items
**GET** `/items/`

Returns a list of all items.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Sample Item",
    "group": "Primary",
    "created_at": "2024-01-01T12:00:00Z",
    "updated_at": "2024-01-01T12:00:00Z"
  }
]
```

### 2. Create New Item
**POST** `/items/`

Creates a new item.

**Request Body:**
```json
{
  "name": "New Item",
  "group": "Primary"
}
```

**Response:**
```json
{
  "id": 2,
  "name": "New Item",
  "group": "Primary",
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-01T12:00:00Z"
}
```

**Validation Rules:**
- `name` is required and must be a string
- `group` must be either "Primary" or "Secondary"
- Item names must be unique within the same group

### 3. Get Specific Item
**GET** `/items/{id}/`

Returns details of a specific item.

**Response:**
```json
{
  "id": 1,
  "name": "Sample Item",
  "group": "Primary",
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-01T12:00:00Z"
}
```

### 4. Update Item
**PATCH** `/items/{id}/`

Updates an existing item.

**Request Body:**
```json
{
  "name": "Updated Item Name",
  "group": "Secondary"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Updated Item Name",
  "group": "Secondary",
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-01T13:00:00Z"
}
```

## Error Responses

### 400 Bad Request
```json
{
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
| Field | Type | Description |
|-------|------|-------------|
| id | Integer | Unique identifier (auto-generated) |
| name | String | Item name (required) |
| group | String | Item group ("Primary" or "Secondary") |
| created_at | DateTime | Creation timestamp (auto-generated) |
| updated_at | DateTime | Last update timestamp (auto-generated) |

## Business Rules

1. **Unique Names per Group**: Item names must be unique within the same group
2. **Cross-Group Names**: The same name can exist in both Primary and Secondary groups
3. **Group Validation**: Only "Primary" and "Secondary" groups are allowed
4. **Timestamps**: Created and updated timestamps are automatically managed

## Testing with curl

```bash
# List all items
curl http://localhost:8000/api/items/

# Create an item
curl -X POST http://localhost:8000/api/items/ \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Item", "group": "Primary"}'

# Get specific item
curl http://localhost:8000/api/items/1/

# Update an item
curl -X PATCH http://localhost:8000/api/items/1/ \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Item", "group": "Secondary"}'
``` 