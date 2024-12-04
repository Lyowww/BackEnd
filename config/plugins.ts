export default ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('MAILER_HOST', 'smtp.gmail.com'),
        port: env('MAILER_PORT', 587),
        auth: {
          user: env('MAILER_USER'),
          pass: env('MAILER_PASS'),
        },
      },
      settings: {
        defaultFrom: env('MAILER_USER'),
        defaultReplyTo: env('MAILER_USER'),
      },
    },
  },
});
