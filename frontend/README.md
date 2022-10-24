# Verden 🌐🎨

This software is part of a project for the Web Programming course at UNICT.

---

This is an UI wrote in Vue.js for the backend of Verden. Here below you can read
how to run locally this app and how to set up on production.

# Development

It works with Node v14.6 and Vue 2.
If you use [nvm](https://github.com/nvm-sh/nvm) you can just call `nvm use` into the folder.

1. Clone this repo
   ```
   git clone https://git.dcariotti.me/verden/verden-ui
   ```
2. Install packages
   ```
   cd verden-ui
   npm i
   ```
3. Run server
   ```
   npm run dev
   ```

# Production

This is a guide for a good deploy on a [Dokku](https://dokku.me) server, which
deploys Verden on port 80.

1. Log into the server and create a new app
   ```
   dokku apps:create verden
   ```
2. Set docker-options
   ```
   dokku docker-options:add build '--build-arg BACKEND_URL='
   dokku docker-options:add build '--build-arg SENTRY_DSN='
   dokku docker-options:add build '--build-arg SENTRY_RATE='
   dokku docker-options:add build '--build-arg SENTRY_ENV='
   ```
3. Add a remote and push this code
   ```
   git remote add dokku dokku_user@your_server:verden
   git push dokku main
   ```
4. Install [Let's Encrypt](https://github.com/dokku/dokku-letsencrypt)
   ```
   sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
   dokku config:set --no-restart verden DOKKU_LETSENCRYPT_EMAIL=your_email
   dokku letsencrypt:enable verden
   ```
5. Enjoy Verden at `https://verden.<your-server>`
