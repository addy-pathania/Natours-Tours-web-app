# Product Requirements Document (PRD)

## Project Natours Tour's

### 1. Product Overview

**Product Name:** Project Natours Tour's Full App (Frontend/Backend)
**Version:** 1.0.0
**Product Type:** Backend API for Project Management System

Project Natours Tour is a RESTful API service designed to for traversing the tours site.

### 3. Core Features

#### 3.1 User Authentication & Authorization

- **User Registration:** Account creation with email verification
- **User Login:** Secure authentication with JWT tokens
- **Password Management:** Change password, forgot/reset password functionality
- **Email Verification:** Account verification via email tokens
- **Token Management:** Access token refresh mechanism
- **Role-Based Access Control:** Three-tier permission system (Admin, Project Admin, Member)
- **Other API features**
  - Setup ESlint and prettier
  - Rate Limit
  - Security
    - encrypt passwords
    - ecrypt password reset tokens wiht expiry date
    - implmenet rate limiting
    - implement max login attempts
    - store JWT in httpOnly cookies
    - sanitize input data(express-mongo-sanitize and xss-clean)
    - set special http header (use helmet pcakage)
    - limit the data sent in body
    - ALways use HTTPS
    - Use SSL - create certificate
    - Install NDB for debugging
  - Error Handling class
  - Deployment

- **Implement later**
  - CI /CD
  - Setup payments
  - Use Multer to update images through form
    - Optimize images

##### 3.1.1 Single Sign On (SSO)

![alt text](image-1.png)
![alt text](image.png)

#### 3.2 System Health

- **Health Check:** API endpoint for system status monitoring

### 4. Technical Specifications

#### 4.1 API Endpoints Structure

**Authentication Routes** (`/api/v1/auth/`)

- `POST /register` - User registration
- `POST /login` - User authentication
- `POST /logout` - User logout (secured)
- `GET /current-user` - Get current user info (secured)
- `POST /change-password` - Change user password (secured)
- `POST /refresh-token` - Refresh access token
- `GET /verify-email/:verificationToken` - Email verification
- `POST /forgot-password` - Request password reset
- `POST /reset-password/:resetToken` - Reset forgotten password
- `POST /resend-email-verification` - Resend verification email (secured)

**Tours Routes** (`/api/v1/tours/)

- `POST /` - Create new tour
- `GET /` - Get all tours
- `DELETE /:id` - Delete a tour
- `PATCH /:id` - Update a tour
- `GET /:id` - Get single tour

**Health Check** (`/api/v1/healthcheck/`)

- `GET /` - System health status

#### 4.2 Data Models

- User model
  - avatar
  - username
  - email
  - password
  - fullname
  - accessToken
  - refreshToken
  - isEmailVerified
  - forgotPasswordToken
  - forgotPasswordExpiry,
  - emailVerificationToken
  - emailVerificationExpiry
  - passwordChangedAt
  - role ['user', 'guide', 'lead guide', 'admin']
- Tours model
  - name
  - slug
  - duration
  - maxGroupSize
  - difficulty
  - ratingsAverage
  - ratingsQuantity
  - price
  - discount
  - summary
  - description
  - imageCover
  - images
  - createdAt
  - startDates
  - secretTour

**User Roles:**

- `admin` - Full system access
- `lead_guide` - Project-level administrative access
- `member` - Basic project member access

**Packages Used**

- Express
- cookie-parser
- cors
- dotenv
- express-validator
- mailgen
- nodemailer
- mongoose
- jsonwebtoken
- bcrypt
- express-mongo-sanitize
- express-rate-limit
- helmet
- morgan
- hpp
- xss-clean
- multer
- eslint
- prettier
