# Medium Clone

A full-stack Medium clone built with modern web technologies. This project replicates the core functionality of Medium, including user authentication, blog post creation, and a clean reading experience.

## 🚀 Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **React Router** for navigation

### Backend
- **Cloudflare Workers** for serverless backend
- **Hono** framework for routing
- **Prisma ORM** for database management
- **PostgreSQL** database
- **JWT** for authentication

## 📁 Project Structure

```
medium/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   └── assets/      # Static assets
│   └── package.json
│
└── backend/           # Cloudflare Workers backend
    ├── src/           # Source code
    ├── prisma/        # Database schema and migrations
    └── common/        # Shared types and utilities
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database
- Cloudflare account (for deployment)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory with:
   ```
   DATABASE_URL="your_postgresql_connection_string"
   JWT_SECRET="your_jwt_secret"
   ```

4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the frontend directory with:
   ```
   VITE_API_URL="your_backend_api_url"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Backend Deployment (Cloudflare Workers)
```bash
cd backend
npm run deploy
```

### Frontend Deployment
The frontend can be deployed to various platforms like Vercel, Netlify, or Cloudflare Pages.

## ✨ Features

- ✅ User authentication (Sign up, Sign in)
- ✅ Create, read, update, and delete blog posts
- ✅ Rich text editor for writing posts
- ✅ User profiles
- ✅ Responsive design
- ✅ Clean and modern UI

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Harsha Reddy Bathala
- GitHub: [@harshareddy-bathala](https://github.com/harshareddy-bathala)
