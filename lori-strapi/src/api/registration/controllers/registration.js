'use strict';

module.exports = {
  async create(ctx) {
    const body = ctx.request.body?.data || ctx.request.body;

    if (!body?.fullName || !body?.email || !body?.selectedEvent) {
      return ctx.badRequest('Missing required fields');
    }

    if (body.honeypot) {
      return ctx.badRequest('Bot detected');
    }

    // Save the registration
    const entry = await strapi.entityService.create('api::registration.registration', {
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone || '',
        selectedEvent: body.selectedEvent,
        honeypot: '',
      },
    });

    // Get event info for the email
    const event = await strapi.entityService.findOne('api::event.event', body.selectedEvent, {
      fields: ['title', 'date', 'time', 'location', 'price'],
    });

    // Notify business email
    const adminText = `
New Registration:
- Name: ${body.fullName}
- Email: ${body.email}
- Phone: ${body.phone || 'N/A'}

Event:
- ${event?.title || 'Event'}
- ${event?.date || ''} ${event?.time || ''}
- ${event?.location || ''}
- Price: ${event?.price != null ? `$${event.price}` : 'N/A'}
`;

    await strapi.plugin('email').service('email').send({
      to: 'lorimarfitness@gmail.com',
      subject: `New Registration – ${event?.title || 'Event'}`,
      text: adminText,
    });

    // Confirmation to user (optional)
    await strapi.plugin('email').service('email').send({
      to: body.email,
      subject: `You're registered: ${event?.title || 'Event'}`,
      text: `Hi ${body.fullName},\n\nYou're registered for ${event?.title}.\nDate: ${event?.date || ''} ${event?.time || ''}\nLocation: ${event?.location || ''}\n\nSee you there!\n— Lorimar Fitness`,
    });

    ctx.body = { data: { id: entry.id } };
  },
};
