// lori-strapi/config/middlewares.ts
export default ({ env }) => [
  'strapi::errors',
    {
      name: 'strapi::cors',
      config: {
        origin: env.array('CORS_ORIGIN', [
          'http://localhost:3000',      // front-end origin
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
