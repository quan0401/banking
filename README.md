# Banking

This repository contains both the backend and frontend components of the project. Follow the instructions below to set up and run the project locally.

## Prerequisites

- Docker
- Docker Compose
- Node.js
- npm

## Getting Started

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Install backend dependencies:**

   ```bash
   npm install
   ```

3. **Run the backend services:**

   ```bash
   docker-compose up -d
   ```

4. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```

5. **Install frontend dependencies:**

   ```bash
   npm install
   ```

6. **Run the frontend development server:**
   ```bash
   npm run dev
   ```

## Accessing the Services

- **Backend:** The backend services will run on [http://localhost:6969](http://localhost:6969).
- **Frontend:** The frontend development server will be available at [http://localhost:3002](http://localhost:3002).

## Important Note for Backend

you will need to specify these secrets for it to work properly.

- **For services like uploading images, you need to specify the Cloudinary secret.**

- **For sending emails, you need to specify the email and token.**

- Ensure these secrets are set in the `docker-compose.yml` file within the backend directory.

## Additional Information

- Ensure that Docker and Docker Compose are properly installed and running on your machine.
- The ports specified above (6969 for the backend and 3002 for the frontend) should be configured in your project's settings.

## Contributing
