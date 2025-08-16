"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// /config/admin.ts
exports.default = ({ env }) => ({
    apiToken: { salt: env("API_TOKEN_SALT") },
    auth: { secret: env("ADMIN_JWT_SECRET") },
    // transfer: { token: { salt: env("TRANSFER_TOKEN_SALT") } },
    /**
     * Strapi Preview (v5)
     * Shows an "Open preview" button in the Content Manager and
     * sends the editor to your front-end with ?preview=1
     */
    preview: {
        enabled: true,
        config: {
            // Your front-end origin allowed to be embedded in the Strapi admin (for iframe/live preview)
            allowedOrigins: env("CLIENT_URL", "http://localhost:3000"),
            /**
             * Return the full front-end URL for the entry being edited.
             * If you don't have detail pages yet, point to the list route.
             */
            async handler(uid, { documentId, status /* 'draft' | 'published' */, locale }) {
                const clientUrl = env("PREVIEW_URL", env("CLIENT_URL", "http://localhost:3000"));
                // Load the document so we can read fields (e.g., slug)
                const document = await strapi.documents(uid).findOne({ documentId, locale });
                // Map content-types to front-end routes
                const getPathname = () => {
                    // If you have a slug on events, set it here:
                    const slug = (document === null || document === void 0 ? void 0 : document.slug) ||
                        (document === null || document === void 0 ? void 0 : document.path) ||
                        null; // fallback if you don't have slug fields yet
                    switch (uid) {
                        case "api::event.event":
                            // If you already have /events/:slug, switch to:
                            // return slug ? `/events/${slug}` : `/events`;
                            return `/events`; // list page works great during early buildout
                        // case "api::blog-post.blog-post": return slug ? `/blog/${slug}` : `/blog`;
                        default:
                            // returning null hides the Preview button for this type
                            return null;
                    }
                };
                const pathname = getPathname();
                if (!pathname)
                    return null;
                const qs = new URLSearchParams();
                qs.set("preview", "1");
                if (status)
                    qs.set("status", status); // optional, handy to read on FE
                return `${clientUrl}${pathname}?${qs.toString()}`;
            },
        },
    },
});
