# NotesApp

A full-stack note-taking and task management application built with the MERN stack (MongoDB, Express, React, Node.js). 

This repository contains both the frontend client and the backend API.

## Features
- **User Authentication**: Secure sign up and login using JWT.
- **Task Management**: Create, read, update, and delete notes and tasks.
- **Responsive UI**: A modern frontend built with React and Vite.
- **RESTful API**: A robust backend powered by Express and MongoDB.

## Tech Stack
- **Frontend**: React, Vite, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Deployment Ready**: Configured for Vercel deployment (Serverless Functions)

---

## 🚀 Getting Started Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local installation or MongoDB Atlas URI)

### Installation

1. **Clone the repo**
   ```sh
   git clone https://github.com/YashveerRajput/NotesApp.git
   ```
2. **Setup Backend**
   ```sh
   cd NotesApp/backend
   npm install
   ```
   Create a `.env` file in the `backend` directory based on `.env.example`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```

3. **Setup Frontend**
   ```sh
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Running the App

1. **Start Backend Server**
   ```sh
   cd NotesApp/backend
   npm run dev
   ```
2. **Start Frontend Development Server** (in a new terminal)
   ```sh
   cd NotesApp/frontend
   npm run dev
   ```

The app should now be running! Open your browser and navigate to `http://localhost:5173`.

---

## 🤝 Contributing Guidelines

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To start contributing, please follow these steps:

### 1. Fork the Project
Click the "Fork" button at the top right corner of this repository to create your own copy.

### 2. Clone Your Fork
```sh
git clone https://github.com/YOUR_USERNAME/NotesApp.git
cd NotesApp
```

### 3. Create a Branch
Create a new branch for your feature or bug fix:
```sh
git checkout -b feature/AmazingFeature
# or
git checkout -b fix/BugDescription
```

### 4. Make Your Changes
Implement your feature or fix. Make sure your code is clean and you have tested it locally using the environment setup instructions above.

### 5. Commit Your Changes
Use clear and descriptive commit messages.
```sh
git commit -m "Add some AmazingFeature"
```

### 6. Push to Your Branch
```sh
git push origin feature/AmazingFeature
```

### 7. Open a Pull Request
Go to the original repository on GitHub, and you'll see a prompt to open a Pull Request from your recently pushed branch. Provide a clear description of the changes you've made.

### Code Style Expectations
- Ensure you have run any linting tools if available in the `frontend` or `backend` folders before committing.
- Keep comments concise and explain *why* over *what*.
- Feel free to discuss proposed architectural or large changes by opening an Issue first!

## License

Distributed under the MIT License. See `LICENSE` for more information.
