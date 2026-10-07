# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

The development server disables Cloudflare Turnstile entirely and simulates contact-form email
delivery, so no service keys are needed locally. To send real email during development, configure
the SMTP2GO values from `.env.example` in `.env` and set `SMTP2GO_ENABLED=true`.

Production requires `PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` as well as the SMTP2GO
settings in `.env.example`. Turnstile tokens are verified on the server before sending email;
missing keys or failed verification block delivery. `TURNSTILE_CHALLENGE_URI` is optional and
defaults to [Cloudflare's Siteverify endpoint](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
Production previews also require these settings.

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
