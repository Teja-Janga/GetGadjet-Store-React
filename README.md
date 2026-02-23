# 🛒 GetGadjet Store - React Edition

A modernized, full-stack e-commerce application featuring a React frontend, a containerized PHP API, and a managed cloud database.

## 🚀 Live Demo
**Frontend:** [https://get-gadjet-store-react.vercel.app/](https://get-gadjet-store-react.vercel.app/)  
**Backend API:** [https://getgadjet-store-api.onrender.com/](https://getgadjet-store-api.onrender.com/)

## 🏗️ Architecture Overview
This project represents a migration from a legacy PHP monolith to a distributed cloud architecture:
- **Frontend:** React.js (Vite) for a fast, responsive UI.
- **Backend:** PHP 8.2 API hosted in a **Docker** container on Render.
- **Database:** Managed MySQL via **Aiven.io**.
- **Deployment:** CI/CD integration with GitHub, Vercel, and Render.

## ✨ Key Upgrades
- **CORS Management:** Implemented a global middleware for secure cross-origin resource sharing.
- **Environment Security:** Secured sensitive database credentials using server-side environment variables.
- **Containerization:** Used Docker to standardize the PHP environment, including `mysqli` extensions.
- **State Management:** Efficient React state handling for Cart logic and Admin dashboards.

## 🛠️ Tech Stack
- **Frontend:** React, CSS.
- **Backend:** PHP (MySQLi), Docker.
- **Database:** Managed MySQL (Aiven.io).
- **Hosting:** Vercel (Frontend), Render (API).

## 📸 Preview
*![alt text](image.png)*

## 🛠️ Installation & Setup
1. Clone the repository.
2. Install dependencies: `npm install`
3. Configure `src/config.js` with your API URL.
4. Start development: `npm run dev`