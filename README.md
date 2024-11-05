# Smart Home Management System

This is a Typescript project for a Smart Home Management System. It consists of a backend server and a frontend client.

## Backend

The backend of this project is located in the `server/` directory. It is written using the following technologies:

- [Bun](https://github.com/bunjs/bun): A lightweight web framework for Node.js
- [Hono](https://github.com/bunjs/hono): A middleware for Bun that provides routing and request handling
- [Postgres.js](https://github.com/porsager/postgres): A PostgreSQL client for Node.js

## Frontend

The frontend of this project is located in the `client/` directory. It is written using [Next.js](https://nextjs.org/), a React framework for server-side rendering and static site generation.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository: `git clone https://github.com/seatedro/shems.git`
2. Install dependencies for the backend: `cd server/ && bun install`
3. Install dependencies for the frontend: `cd client/ && bun install`
4. Start the backend server: `cd server/ && bun run --hot src/index.ts`
5. Start the frontend client: `cd client/ && bun dev`

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
