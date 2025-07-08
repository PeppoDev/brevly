# Brevly - URL Shortening Service

A modern URL shortening service built with React, Fastify, and PostgreSQL. Create short, memorable links with analytics and export capabilities.

## 🚀 Features

- **URL Shortening**: Create custom short URLs with validation
- **Link Management**: View, delete, and track your shortened links
- **Analytics**: Track access counts for each link
- **Export**: Download link data as CSV reports
- **API Documentation**: Auto-generated Swagger documentation

## 🏗️ Architecture

This is a monorepo containing:

- **`web/`** - React frontend application
- **`server/`** - Fastify backend API
- **Shared tooling** - TypeScript, Biome, and development scripts

### Tech Stack

**Frontend:**
- React 19 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Query for data fetching
- Formik + Zod for form validation
- React Router for navigation

**Backend:**
- Fastify with TypeScript
- PostgreSQL with Drizzle ORM
- Zod for schema validation
- Swagger for API documentation
- Cloudflare R2 for file storage

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- pnpm
- PostgreSQL
- Cloudflare R2 account (or Amazon S3)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd brevly
   ```

2. **Install dependencies**
   ```bash
   pnpm install:all
   ```

3. **Environment Setup**

   Create `.env` files in both `server/` and `web/` directories:

   **Server Environment (`server/.env`)**
   ```env
   PORT=3333
   HOST=localhost
   NODE_ENV=development
   
   # Database
   POSTGRESQL_USERNAME=postgres
   POSTGRESQL_PASSWORD=postgres
   POSTGRESQL_DATABASE=brevly
   POSTGRESQL_PORT=5432
   
   # Cloudflare R2
   CLOUDFLARE_ACCOUNT_ID=your_account_id
   CLOUDFLARE_ACCESS_KEY_ID=your_access_key
   CLOUDFLARE_SECRET_ACCESS_KEY=your_secret_key
   CLOUDFLARE_BUCKET=your_bucket_name
   CLOUDFLARE_PUBLIC_URL=https://your-public-url.com
   ```

   **Frontend Environment (`web/.env`)**
   ```env
   VITE_BACKEND_URL=http://localhost:3333
   ```

4. **Database Setup**
   ```bash
   cd server
   pnpm db:generate
   pnpm db:migrate
   ```

## 🚀 Development

### Start Development Servers

Run both frontend and backend simultaneously:
```bash
pnpm dev
```

Or run them separately:

**Backend:**
```bash
cd server
pnpm dev
```

**Frontend:**
```bash
cd web
pnpm dev
```

### Database Commands

```bash
cd server
pnpm db:generate    # Generate new migrations
pnpm db:migrate     # Run migrations
pnpm db:studio      # Open Drizzle Studio
```


## 🏗️ Project Structure

```
brevly/
├── web/                          # Frontend application
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/               # Page components
│   │   ├── http/                # API client and hooks
│   │   ├── schemas/             # Zod validation schemas
│   │   ├── utils/               # Utility functions
│   │   └── router/              # React Router configuration
│   └── package.json
├── server/                       # Backend API
│   ├── src/
│   │   ├── controllers/         # API route handlers
│   │   ├── use-cases/           # Business logic
│   │   ├── infra/               # Infrastructure (DB, storage)
│   │   ├── middlewares/         # Fastify middlewares
│   │   └── errors/              # Custom error classes
│   └── package.json
└── package.json                  # Monorepo configuration
```


## 🚀 Deployment

### Docker

The server includes Docker configuration:

```bash
cd server
docker build -t brevly-server .
docker run -p 3333:3333 brevly-server
```

### Environment Variables

Make sure to set all required environment variables for production deployment.

## 📄 License

ISC License
