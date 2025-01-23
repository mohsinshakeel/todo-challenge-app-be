# Full-Stack: Todo List App

This project is a full-stack application built with Express.js for the server side, and Prisma for database management. The application is written in TypeScript.

## Server Side

### Installation

Navigate to the server directory and install the dependencies:

```bash
cd server
yarn install
# or
npm install
```

### Running the Server

To start the server, use:

```bash
npm run start
# or
yarn start
```

For development, you can use nodemon to automatically restart the server on changes:

```bash
npm run dev
# or
yarn dev
```

## 3. Database

This project uses Prisma for database management. Ensure your `.env` file is updated with the correct database connection string.

### Database Migration

To apply database migrations, run:

```bash
npx prisma migrate dev --name init
```

After running migrations, generate the Prisma client:

```bash
npx prisma generate
```