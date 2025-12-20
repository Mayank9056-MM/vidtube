# Video playing and tweet applicaton - vidtube (Random Name)

## overview

This backend service provides secure APIs for video upload, update, streaming,
and metadata management. It is designed to handle large media files, role-based
authentication, and scalable cloud storage with tweets

## tech stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)
- cloudinary (media storage)
- Docker (will be in future)
- redis
- cors
- jwt

## arthitecture overview

The system follows a layered backend architecture where responsibilities
are clearly separated to ensure scalability, maintainability, and testability.

Client requests are received by the Express server, routed through controllers,
processed by the service layer, and persisted in the database.

## project structure

```bash
<--- Stucture Start Here --->

├── app.log # logging request comming on backend
├── package.json  
├── package-lock.json
├── public # storing file temporary
│ └── temp  
├── readme.md
└── src  
 ├── app.js # configuration file
├── config # extras
│ └── redis.js
├── constants.js # global constants
├── controllers # Handles HTTP request/response logic
│ ├── comment.controllers.js
│ ├── dashboard.controllers.js
│ ├── healthCheck.controllers.js
│ ├── health.controllers.js
│ ├── like.controllers.js
│ ├── playlist.controllers.js
│ ├── subscription.controllers.js
│ ├── tweet.controllers.js
│ ├── user.controllers.js
│ └── video.controllers.js
├── db
│ └── index.js # database entry file
├── index.js # Application entry
├── logger.js
├── middlewares # Authentication, validation, error handling
│ ├── error.middleware.js
│ ├── multer.middleware.js
│ └── verifyAuth.js
├── models # Database schemas and ORM models
│ ├── comment.models.js
│ ├── like.models.js
│ ├── playlist.models.js
│ ├── subscription.models.js
│ ├── tweet.models.js
│ ├── user.models.js
│ └── video.models.js
├── readme.md
├── routes # Defines API endpoints and route bindings
│ ├── comment.routes.js
│ ├── dashboard.routes.js
│ ├── healthcheck.routes.js
│ ├── health.routes.js
│ ├── like.routes.js
│ ├── playlist.routes.js
│ ├── subscription.routes.js
│ ├── tweet.routes.js
│ ├── user.routes.js
│ └── video.routes.js
└── utils # Reusable helper utilities
├── ApiError.js
├── ApiResponse.js
├── asyncHandler.js
├── cloudinary.js
└── mailService.js

<--- Stucture Ends Here --->
```

## Environment variables

```text
PORT=
NODE_ENV=development
ENABLE_REDIS=false
CORS_ORIGIN=
MONGODB_URI=

SECRET_KEY=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

FRONTEND_URL=
CLIENT_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

APP_NAME=vidtube

EMAIL_USER=""
EMAIL_PASS=""
```

## Intallation & setup

```bash
git clone https://github.com/Mayank9056-MM/vidtube
cd vidtube
npm intall
```

### running the server

```bash
npm run server # development server
npm run start # production
```

## API DOCUMENTATION

(using swagger and OpenAPI)

## Authentication & Security

- JWT-based authentication
- Passwords hashed using bcrypt
- Role-based access control
- Rate limiting enabled

## Error Handling

- Centralized error middleware
- Standard HTTP status codes
- Structured JSON error responses

## Logging

- Winston logger
- Request/response logging
- Error logs stored separately

## License

MIT

## Contributing

Pull requests are welcome.
