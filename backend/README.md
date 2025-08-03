# Express TypeScript Backend

A modern Express.js backend built with TypeScript, featuring hot-reload for development.

## Features

- ⚡ **Hot Reload**: Automatic server restart on file changes
- 🔒 **Security**: Helmet.js for security headers
- 🌐 **CORS**: Cross-origin resource sharing enabled
- 📝 **Logging**: Morgan HTTP request logger
- 🏥 **Health Check**: Built-in health endpoint
- 🛡️ **Error Handling**: Comprehensive error handling middleware
- 📦 **TypeScript**: Full TypeScript support with strict mode

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Start the development server with hot-reload:
```bash
npm run dev
```

The server will start on `http://localhost:3000` and automatically restart when you make changes to files in the `src` directory.

### Production

Build the project:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

```
src/
├── config/          # Configuration files
├── middleware/      # Express middleware
├── routes/          # API routes
└── index.ts         # Main application entry point
```

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build the project for production
- `npm start` - Start the production server
- `npm run clean` - Clean the dist folder

## API Endpoints

- `GET /api/health` - Health check endpoint

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000)
- `CORS_ORIGIN` - CORS origin (default: *)

## License

MIT