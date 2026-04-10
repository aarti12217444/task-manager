# MERN Task Manager

A simple full-stack Task Manager built with MongoDB, Express, React, and Node.js.

## Features

- Create tasks with required title validation
- Fetch all tasks
- Mark tasks as completed/incomplete
- Delete tasks
- Loading and error states in the frontend
- Minimal folder structure focused on functionality

## Project Structure

```text
assignment/
  backend/
    src/
      config/
      controllers/
      models/
      routes/
  frontend/
    src/
      components/
      services/
```

## Prerequisites

- Node.js 18+ (or newer)
- npm
- MongoDB running locally or a MongoDB Atlas URI

## Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/task_manager
FRONTEND_URL=http://localhost:5173
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=https://task-manager-backend-7g67.onrender.com
```

For deployed setup, set `VITE_API_BASE_URL` to your deployed backend URL (example: `https://your-api.onrender.com`) and set backend `FRONTEND_URL` to your deployed frontend URL.

`.env.example` files are included in both `backend` and `frontend`.

## Setup & Run

### 1) Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2) Start backend

```bash
cd backend
npm run dev
```

Backend runs on `https://task-manager-backend-7g67.onrender.com`.

### 3) Start frontend

In another terminal:

```bash
cd frontend
npm run dev
```

Frontend runs on Vite default port (usually `http://localhost:5173`).

## API Endpoints

- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create a new task (`title` required)
- `PATCH /tasks/:id` - Update `completed` status
- `DELETE /tasks/:id` - Delete a task

Example create payload:

```json
{ "title": "Buy milk" }
```

Example patch payload:

```json
{ "completed": true }
```

## Assumptions

- `id` is exposed as a derived string from MongoDB `_id`.
- API errors return JSON with `success: false` and an error message.
- UI intentionally stays minimal (no design framework) to keep the solution simple and readable.
