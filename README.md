# Full-Stack Item Manager

A complete full-stack application built with Django REST API and React frontend for managing items with CRUD operations.

## Features

- **Backend (Django REST API)**
  - RESTful API endpoints for CRUD operations
  - Item model with name, group, and timestamps
  - Unique name validation within groups (Primary/Secondary)
  - Proper error handling and HTTP status codes
  - CORS configuration for frontend communication

- **Frontend (React + Chakra UI)**
  - Modern, responsive UI with Chakra UI
  - Complete CRUD operations interface
  - Item filtering by group
  - Form validation and error handling
  - Beautiful card-based layout

- **Docker Support**
  - Containerized backend and frontend
  - Docker Compose for easy development setup
  - Production-ready configuration

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

## Usage

### Creating Items
1. Click "Add Item" button in the header
2. Fill in the item name and select a group (Primary or Secondary)
3. Submit the form

### Viewing Items
- All items are displayed on the home page
- Use the filter dropdown to view items by group
- Click "View" to see detailed information

### Editing Items
1. Click "Edit" on any item card
2. Modify the name or group
3. Submit the changes

### Item Rules
- Each group (Primary/Secondary) can only contain unique item names
- The same name can exist in both groups
- Items are automatically timestamped when created and updated

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

# Create an item
curl -X POST http://localhost:8000/api/items/ \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Item", "group": "Primary"}'
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.