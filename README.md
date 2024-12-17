# Video Hosting Platform (Backend)

This project is a complex backend application built with Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, and other modern technologies. It is designed to be the backend for a video hosting platform, similar to YouTube, and includes a wide range of features like user authentication, video upload, comments, likes, subscriptions, and more.

## Features

The backend supports all the necessary features of a video hosting platform, including but not limited to:

- **User Authentication**: 
  - Signup
  - Login
  - JWT-based authentication (Access & Refresh Tokens)
  
- **Video Management**: 
  - Upload videos
  - Like and Dislike videos
  - Comment on videos
  - Reply to comments

- **Subscription System**:
  - Subscribe to channels
  - Unsubscribe from channels

- **User Profiles**:
  - View user profiles
  - Manage user data

## Technologies Used

This project utilizes the following technologies:

- **Node.js**: JavaScript runtime for building scalable applications.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **JWT (JSON Web Token)**: Used for secure authentication and authorization.
- **Bcrypt**: Used for hashing passwords and securing user data.
- **Access Tokens**: For securing APIs.
- **Refresh Tokens**: To keep the user logged in securely.

## API Endpoints

### Authentication

- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Login to an existing user account.
- **POST /api/auth/refresh-token**: Refresh the access token using a refresh token.

### Video

- **POST /api/videos/upload**: Upload a new video (requires authentication).
- **GET /api/videos**: Get a list of all videos.
- **GET /api/videos/:id**: Get details of a specific video.
- **POST /api/videos/:id/like**: Like a video.
- **POST /api/videos/:id/dislike**: Dislike a video.
- **POST /api/videos/:id/comment**: Add a comment on a video.
- **POST /api/videos/:id/comment/reply**: Reply to a comment.

### User

- **GET /api/users/profile**: Get the logged-in user's profile details.
- **PUT /api/users/profile**: Update the logged-in user's profile information.
- **POST /api/users/:id/subscribe**: Subscribe to a channel.
- **POST /api/users/:id/unsubscribe**: Unsubscribe from a channel.

## Authentication

This project uses JWT for secure user authentication. The API requires a valid access token for most endpoints.

1. **Login**: After a successful login, the user will receive an access token and a refresh token.
2. **Access Token**: Used for authentication in API requests and has a short expiration time.
3. **Refresh Token**: Used to obtain a new access token when the current one expires.

## Security Best Practices

- **Bcrypt** is used for password hashing to ensure sensitive data is securely stored.
- **JWT** is used to generate secure access tokens for authentication, ensuring only authorized users can access protected routes.



