# Full-Stack Item Manager

A complete full-stack application built with Django REST API and React frontend for managing items with comprehensive CRUD operations and advanced features.

## Features

- **Backend (Django REST API)**
  - RESTful API endpoints for CRUD operations
  - Enhanced Item model with comprehensive fields
  - Unique name validation within groups (Primary/Secondary)
  - Proper error handling and HTTP status codes
  - CORS configuration for frontend communication
  - Advanced filtering and search capabilities

- **Frontend (React + Chakra UI)**
  - Modern, responsive UI with Chakra UI
  - Complete CRUD operations interface
  - Advanced filtering by group and status
  - Enhanced item cards with rich information display
  - Form validation and error handling
  - Beautiful card-based layout with color-coded badges
  - Number inputs for price and quantity
  - Tag management with visual badges

- **Docker Support**
  - Containerized backend and frontend
  - Docker Compose for easy development setup
  - Production-ready configuration

## Item Model

The application supports a comprehensive item model with the following fields:

### Core Fields
- **`name`** - Item name (required, unique within group)
- **`group`** - Item group (Primary/Secondary)
- **`description`** - Detailed item description
- **`status`** - Item status (Active/Inactive/Archived)
- **`priority`** - Priority level (Low/Medium/High/Urgent)

### Additional Fields
- **`price`** - Item price (decimal with 2 decimal places)
- **`quantity`** - Stock quantity (positive integer)
- **`location`** - Item location or storage area
- **`tags`** - Comma-separated tags for categorization
- **`created_at`** - Creation timestamp (auto-generated)
- **`updated_at`** - Last update timestamp (auto-generated)

### Computed Properties
- **`tag_list`** - Returns tags as a list
- **`is_urgent`** - Checks if priority is urgent
- **`is_active`** - Checks if status is active

## Project Structure

```
full-stack-item-manager/
├── backend/
│   ├── item_manager/          # Django project settings
│   ├── items/                 # Items app with models and API
│   ├── requirements.txt       # Python dependencies
│   └── Dockerfile            # Backend container
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API service
│   │   └── App.js           # Main app component
│   ├── package.json          # Node.js dependencies
│   └── Dockerfile           # Frontend container
├── docker-compose.yml        # Development setup
├── docker-compose.prod.yml   # Production setup
└── README.md                # This file
```

## API Endpoints

- `GET /api/items/` - List all items
- `POST /api/items/` - Create a new item
- `GET /api/items/{id}/` - Get a specific item
- `PATCH /api/items/{id}/` - Update an existing item

## API Response

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
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-01T12:00:00Z"
}
```

## Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd full-stack-item-manager
   ```

2. **Start the services**
   ```bash
   docker-compose up --build
   ```

3. **Access the applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api/
   - Django Admin: http://localhost:8000/admin/

### Production Setup

1. **Set environment variables**
   ```bash
   export SECRET_KEY="your-secret-key-here"
   export REACT_APP_API_URL="http://your-domain.com/api"
   ```

2. **Start production services**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

## Manual Setup (Without Docker)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

## Django Admin Interface

The Django admin interface provides a powerful web-based interface for managing items and viewing system data. It's accessible at `http://localhost:8000/admin/` after setting up the backend.

### Accessing the Admin Interface

1. **Create a superuser account** (if not already done):
   ```bash
   cd backend
   python manage.py createsuperuser
   ```
   Follow the prompts to create your admin username and password.

2. **Access the admin interface**:
   - Navigate to `http://localhost:8000/admin/`
   - Log in with your superuser credentials

### Admin Features

#### Item Management
- **View all items** in a table format with sortable columns
- **Add new items** directly through the admin interface
- **Edit existing items** with full form validation
- **Delete items** with confirmation dialogs
- **Bulk operations** for multiple items
- **Search and filter** items by various fields

#### Data Display
The admin interface shows all item fields:
- **Basic Info**: Name, Description, Group, Status, Priority
- **Inventory**: Price, Quantity, Location
- **Metadata**: Tags, Created Date, Updated Date
- **Computed Fields**: Tag list, Urgent status, Active status

#### Advanced Features
- **Inline editing** for quick field updates
- **Export functionality** for data backup
- **Audit trail** showing creation and modification dates
- **Permission-based access** (if multiple admin users)

## Usage

### Creating Items
1. Click "Add Item" button in the header
2. Fill in the required fields:
   - **Name** (required)
   - **Group** (Primary or Secondary)
   - **Status** (Active, Inactive, or Archived)
   - **Priority** (Low, Medium, High, or Urgent)
3. Optionally add:
   - **Description** for detailed information
   - **Price** for item cost
   - **Quantity** for stock count
   - **Location** for storage area
   - **Tags** for categorization (comma-separated)
4. Submit the form

### Viewing Items
- All items are displayed on the home page with enhanced cards
- Use the **Group filter** to view items by Primary/Secondary
- Use the **Status filter** to view items by Active/Inactive/Archived
- Each item card shows:
  - Item name and description
  - Color-coded status and priority badges
  - Price and quantity information
  - Location with emoji icon
  - Tags as purple badges
  - Creation date

### Editing Items
1. Click "Edit" on any item card
2. Modify any field as needed
3. Submit the changes

### Item Rules
- Each group (Primary/Secondary) can only contain unique item names
- The same name can exist in both groups
- Items are automatically timestamped when created and updated
- Status and priority have predefined options
- Price supports decimal values with 2 decimal places
- Quantity must be a positive integer
- Tags are stored as comma-separated values and displayed as badges

## UI Features

### Color-Coded Badges
- **Status**: Green (Active), Gray (Inactive), Red (Archived)
- **Priority**: Red (Urgent), Orange (High), Yellow (Medium), Green (Low)
- **Group**: Blue (Primary), Green (Secondary)
- **Tags**: Purple badges

### Advanced Filtering
- Filter by **Group** (All, Primary, Secondary)
- Filter by **Status** (All, Active, Inactive, Archived)
- Combined filtering for precise item selection

### Responsive Design
- Mobile-friendly interface
- Responsive grid layout
- Adaptive form layouts
- Touch-friendly controls

## Technology Stack

### Backend
- **Django 4.2.7** - Web framework
- **Django REST Framework 3.14.0** - API framework
- **django-cors-headers 4.3.1** - CORS handling
- **python-decouple 3.8** - Environment configuration

### Frontend
- **React 18.2.0** - UI library
- **Chakra UI 2.8.0** - Component library
- **React Router 6.14.2** - Routing
- **Axios 1.4.0** - HTTP client
- **React Icons 4.10.1** - Icon library

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## Development

### Adding New Features
1. Backend changes: Modify models, views, or serializers in `backend/items/`
2. Frontend changes: Add components in `frontend/src/components/`
3. Test changes with Docker Compose

### Database Changes
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

### API Testing
Use tools like Postman or curl to test API endpoints:
```bash
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
```

## Security Features

### Environment Variables
- **SECRET_KEY** - Django cryptographic secret for security operations
- **DEBUG** - Development/production mode toggle
- **CORS settings** - Cross-origin request handling

### Data Validation
- Unique name validation within groups
- Required field validation
- Data type validation (price as decimal, quantity as integer)
- Status and priority constraint validation
