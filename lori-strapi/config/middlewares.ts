// lori-strapi/config/middlewares.ts
export default ({ env }) => [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      origin: env.array('CORS_ORIGIN', [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:3001',      // CRA sometimes bumps to 3001
        'http://localhost:5173',      // Vite (if you ever switch)
        // 'https://your-frontend-domain.com', // add prod domain
      ]),
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      credentials: true,              // if true, origin cannot be "*"
    },
  },
  'strapi::security',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
