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
   
   **For local development (Prisma migrations):**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your PostgreSQL database URL
   # DATABASE_URL="postgresql://postgres:password@localhost:5432/medium_clone?schema=public"
   ```

   **For Cloudflare Workers (local development):**
   ```bash
   # Copy the example file
   cp .dev.vars.example .dev.vars
   
   # Edit .dev.vars and add your Prisma Accelerate connection string and JWT secret
   # Get Prisma Accelerate URL from: https://www.prisma.io/data-platform
   ```

   ⚠️ **IMPORTANT**: Never commit `.env` or `.dev.vars` files to version control!

4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Generate Prisma client:
   ```bash
   npx prisma generate --no-engine
   ```

6. Start the development server:
   ```bash
   npx wrangler dev
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
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and set your backend API URL
   # For local development: VITE_API_URL="http://localhost:8787"
   # For production: VITE_API_URL="https://your-backend-worker.workers.dev"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

## 🚀 Deployment

### Backend Deployment (Cloudflare Workers)

1. Set production environment variables in Cloudflare dashboard:
   ```bash
   # Go to Workers & Pages > Your Worker > Settings > Variables
   # Add the following secrets:
   # - DATABASE_URL (your Prisma Accelerate connection string)
   # - JWT_SECRET (a secure random string)
   ```

2. Deploy to Cloudflare Workers:
   ```bash
   cd backend
   npx wrangler deploy
   ```

### Frontend Deployment

The frontend can be deployed to various platforms:

**Vercel:**
```bash
cd frontend
# Set environment variable VITE_API_URL to your deployed backend URL
vercel --prod
```

**Netlify or Cloudflare Pages:**
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_URL` = your backend URL

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
