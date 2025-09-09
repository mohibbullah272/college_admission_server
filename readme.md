# College Booking System - Backend API

This repository contains the backend API for the College Booking System, a MERN stack application that enables users to explore colleges, submit admission applications, and manage reviews and profiles. This API documentation provides detailed information on endpoints, request/response formats, and authentication requirements to facilitate seamless integration with the frontend.

## Table of Contents
- [Base URL](#base-url)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Authentication Routes](#authentication-routes)
  - [College Routes](#college-routes)
  - [Admission Routes](#admission-routes)
  - [Review Routes](#review-routes)
- [Error Handling](#error-handling)
- [Installation](#installation)
- [Contributing](#contributing)


## Base URL
The base URL for all API endpoints is:

```
http://localhost:5000/api
```

## Authentication
Most endpoints require a JSON Web Token (JWT) for authentication, included in the request header as:

```
Authorization: Bearer <your_token>
```

The exceptions are `/auth/register` and `/auth/login`, which are publicly accessible.

## API Endpoints

### Authentication Routes
#### POST `/api/auth/register`
**Purpose**: Register a new user.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "avatar": "https://example.com/avatar.jpg" // optional
}
```

**Response**:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

#### POST `/api/auth/login`
**Purpose**: Log in a user.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

#### GET `/api/auth/profile`
**Purpose**: Retrieve the authenticated user's profile.  
**Headers**: `Authorization: Bearer <token>`  
**Response**:
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://example.com/avatar.jpg",
    "address": "123 Main St",
    "university": "Example University",
    "createdAt": "2023-10-01T12:00:00.000Z"
  }
}
```

#### PUT `/api/auth/profile`
**Purpose**: Update the authenticated user's profile.  
**Headers**: `Authorization: Bearer <token>`  
**Request Body**:
```json
{
  "name": "John Updated",
  "email": "updated@example.com",
  "address": "456 New St",
  "university": "New University",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

**Response**: Same as GET `/api/auth/profile`.

### College Routes
#### GET `/api/colleges`
**Purpose**: Retrieve a paginated list of colleges with optional search.  
**Query Parameters**:
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Items per page
- `search` (optional) - Search term for college names

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "college_id",
      "name": "College Name",
      "image": "college_image_url",
      "rating": 4.5,
      "admissionDate": "2023-12-01T00:00:00.000Z",
      "researchCount": 15,
      "events": ["Event 1", "Event 2"],
      "sports": ["Sport 1", "Sport 2"],
      "researchHistory": ["Research 1", "Research 2"],
      "gallery": ["image1.jpg", "image2.jpg"],
      "admissionProcess": "Admission process description",
      "createdAt": "2023-10-01T12:00:00.000Z",
      "updatedAt": "2023-10-01T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

#### GET `/api/colleges/featured`
**Purpose**: Retrieve featured (highest-rated) colleges.  
**Query Parameters**:
- `limit` (optional, default: 3) - Number of colleges to return

**Response**: Array of college objects.

#### GET `/api/colleges/:id`
**Purpose**: Retrieve a specific college by ID.  
**Response**: Single college object.

#### POST `/api/colleges`
**Purpose**: Create a new college (Admin only).  
**Headers**: `Authorization: Bearer <token>`  
**Request Body**:
```json
{
  "name": "College Name",
  "image": "college_image_url",
  "rating": 4.5,
  "admissionDate": "2023-12-01",
  "researchCount": 15,
  "events": ["Event 1", "Event 2"],
  "sports": ["Sport 1", "Sport 2"],
  "researchHistory": ["Research 1", "Research 2"],
  "gallery": ["image1.jpg", "image2.jpg"],
  "admissionProcess": "Admission process description"
}
```

**Response**: Created college object.

#### PUT `/api/colleges/:id`
**Purpose**: Update a college (Admin only).  
**Headers**: `Authorization: Bearer <token>`  
**Request Body**: Same as POST, with all fields optional.  
**Response**: Updated college object.

#### DELETE `/api/colleges/:id`
**Purpose**: Delete a college (Admin only).  
**Headers**: `Authorization: Bearer <token>`  
**Response**: Success message.

### Admission Routes
#### POST `/api/admissions`
**Purpose**: Create a new admission application.  
**Headers**: `Authorization: Bearer <token>`  
**Request Body**:
```json
{
  "candidateName": "John Doe",
  "candidateEmail": "john@example.com",
  "candidatePhone": "+1234567890",
  "address": "123 Main St, City, Country",
  "dateOfBirth": "2000-01-01",
  "subject": "Computer Science",
  "image": "applicant_image_url",
  "college": "college_id"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "_id": "admission_id",
    "candidateName": "John Doe",
    "candidateEmail": "john@example.com",
    "candidatePhone": "+1234567890",
    "address": "123 Main St, City, Country",
    "dateOfBirth": "2000-01-01T00:00:00.000Z",
    "subject": "Computer Science",
    "image": "applicant_image_url",
    "college": {
      "_id": "college_id",
      "name": "College Name"
    },
    "user": "user_id",
    "status": "pending",
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:00:00.000Z"
  }
}
```

#### GET `/api/admissions/my`
**Purpose**: Retrieve the authenticated user's admission applications.  
**Headers**: `Authorization: Bearer <token>`  
**Response**: Array of admission objects.

#### GET `/api/admissions/all`
**Purpose**: Retrieve all admissions (Admin only).  
**Headers**: `Authorization: Bearer <token>`  
**Query Parameters**:
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Items per page

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "admission_id",
      "candidateName": "John Doe",
      "candidateEmail": "john@example.com",
      "candidatePhone": "+1234567890",
      "address": "123 Main St, City, Country",
      "dateOfBirth": "2000-01-01T00:00:00.000Z",
      "subject": "Computer Science",
      "image": "applicant_image_url",
      "college": {
        "_id": "college_id",
        "name": "College Name"
      },
      "user": {
        "_id": "user_id",
        "name": "User Name",
        "email": "user@example.com"
      },
      "status": "pending",
      "createdAt": "2023-10-01T12:00:00.000Z",
      "updatedAt": "2023-10-01T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### PUT `/api/admissions/:id/status`
**Purpose**: Update admission status (Admin only).  
**Headers**: `Authorization: Bearer <token>`  
**Request Body**:
```json
{
  "status": "approved" // or "rejected" or "pending"
}
```

**Response**: Updated admission object.

### Review Routes
#### POST `/api/reviews`
**Purpose**: Create a new review for a college.  
**Headers**: `Authorization: Bearer <token>`  
**Request Body**:
```json
{
  "rating": 5,
  "comment": "Excellent college with great facilities",
  "college": "college_id"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "_id": "review_id",
    "rating": 5,
    "comment": "Excellent college with great facilities",
    "college": {
      "_id": "college_id",
      "name": "College Name"
    },
    "user": {
      "_id": "user_id",
      "name": "User Name"
    },
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:00:00.000Z"
  }
}
```

#### GET `/api/reviews/college/:collegeId`
**Purpose**: Retrieve reviews for a specific college.  
**Response**: Array of review objects.

#### GET `/api/reviews/all`
**Purpose**: Retrieve all reviews with pagination.  
**Query Parameters**:
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Items per page

**Response**: Paginated list of review objects.

#### GET `/api/reviews/featured`
**Purpose**: Retrieve featured (highest-rated) reviews.  
**Query Parameters**:
- `limit` (optional, default: 5) - Number of reviews to return

**Response**: Array of review objects.

## Error Handling
All endpoints return consistent error responses with the following format:

```json
{
  "success": false,
  "message": "Error description"
}
```

**Common HTTP Status Codes**:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid or missing token)
- `404`: Not Found
- `500`: Internal Server Error

## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/college-booking-backend.git
   cd college-booking-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory with:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     ```

4. **Run the server**:
   ```bash
   npm start
   ```

5. **Access the API**:
   - The API will be available at `http://localhost:5000/api`.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

