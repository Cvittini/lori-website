module.exports = [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000'], // update with your deployed site later
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      methods: ['GET','POST','PUT','PATCH','DELETE','HEAD','OPTIONS'],
      credentials: true,
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
