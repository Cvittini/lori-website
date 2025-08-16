"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    email: {
        config: {
            provider: "nodemailer",
            providerOptions: {
                host: env("SMTP_HOST", "smtp.gmail.com"),
                port: env.int("SMTP_PORT", 587),
                secure: env.bool("SMTP_SECURE", false), // STARTTLS
                auth: { user: env("SMTP_USERNAME"), pass: env("SMTP_PASSWORD") },
            },
            settings: {
                defaultFrom: env("EMAIL_DEFAULT_FROM", "Lorimar Fitness <lorimarfitness@gmail.com>"),
                defaultReplyTo: env("EMAIL_DEFAULT_REPLY_TO", "Lorimar Fitness <lorimarfitness@gmail.com>"),
            },
        },
    },
});
