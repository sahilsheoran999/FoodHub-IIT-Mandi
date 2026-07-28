# FoodHub IIT Mandi

A comprehensive food ordering web application designed for local development and testing.

## 🌟 Features

- Restaurant Selection
- User Authentication
- Product Catalog
- Shopping Cart
- Order Management
- Responsive Design
- Modern UI

## 🛠 Tech Stack

- React.js (Frontend)
- Node.js, Express.js (Backend)
- MongoDB, Mongoose
- Tailwind CSS, Redux Toolkit, Axios

## 🚀 Getting Started

This repository includes both the frontend and backend apps for the FoodHub IIT Mandi full-stack project.

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Local development

1. Install backend dependencies:
   ```sh
   cd "FoodHub IIT Mandi Backend"
   npm install
   ```
2. Create the backend env file:
   ```sh
   cp .env.example .env
   ```
   Then update `.env` values for `DB_URL`, `JWT_SECRET`, `FRONTEND_URL`, and `COOKIE_SECURE`.

3. Start the backend:
   ```sh
   npm start
   ```
4. Install frontend dependencies:
   ```sh
   cd "FoodHub IIT Mandi Frontend"
   npm install
   ```
5. Create the frontend env file:
   ```sh
   cp .env.example .env
   ```
6. Start the frontend:
   ```sh
   npm run dev
   ```
7. Open your browser at http://localhost:5173

### Production deployment
- The frontend is configured for GitHub Pages deployment from the `main` branch to `gh-pages`.
- The backend can be deployed to any Node.js host such as Render, Railway, Vercel, or a VPS.

### Notes
- The frontend reads the backend base URL from `VITE_BACKEND_URL`.
- The backend uses `FRONTEND_URL` for CORS and cookie configuration.

*Developed with ❤️ for the IIT Mandi community*
