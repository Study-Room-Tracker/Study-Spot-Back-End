# How to Start the Server:

1. Clone the repository:
   git clone <git@github.com:Study-Room-Tracker/Study-Spot-Back-End.git>
   cd <Study-Spot-Back-End>

2. Install dependencies:
   npm install

3. Create a .env file(see template below).

4. Start the server in development:
   npm run dev

5. Test the server health endpoint:
   GET http://localhost:4000/health

# Environment Variable Template:

Create a .env file with the following variables:

Server port:

- PORT=4000

Environment: development, production, etc:

- NODE_ENV=development

JWT secret key (replace with a strong secret):

- JWT_SECRET=your_jwt_secret_here

JWT expiration (e.g., 1d, 7d, 12h):

- JWT_EXPIRES_IN=1d

# Available Endpoints(All endpoints except /auth and /contact(POST) require authentication via JWT in the Authorization header):

Auth:

- /api/auth/register = POST(method) = Register a new user
- /api/auth/login = POST(method) = Login and get JWT token

Users:

- /api/users = GET(method) = Get all users (admin only)
- /api/users/:id = GET(method) = Get user by ID (admin only)
- /api/users/:id = PATCH(method) = Update user by ID
- /api/users/:id = DELETE(method) = Delete user by ID (admin only)

Rooms:

- /api/rooms = GET(method) = Get all rooms
- /api/rooms = POST(method) = Create new room (admin only)
- /api/rooms/:id = GET(method) = Get room by ID
- /api/rooms/:id = PATCH(method) = Update room by ID (admin only)
- /api/rooms/:id = DELETE(method) = Delete room by ID (admin only)
- /api/rooms/changeStatus/:id = PATCH(method) = Update room status by ID

Contact:

- /api/contact = POST(method) = Send new message (Does NOT require JWT authorization)
- /api/contact = GET(method) = Get all messages (admin only)
