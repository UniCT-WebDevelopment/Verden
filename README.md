<div align="center">

# Verden 🌐🎨

</div>

This software is part of a project for the Web Programming course at UNICT.

---

This is a mono-repo of a backend, which is available at [this link](https://github.com/UniCT-WebDevelopment/Verden/tree/main/backend) and
a frontend, follow [this
link](https://github.com/UniCT-WebDevelopment/Verden/tree/main/frontend).

In both of them you can read a tutorial of "how to deploy this app on Dokku"
which is an open-source Heroku alternative. Total free.

## Requirements

### Backend

It uses Rust at version 1.62 (maybe it'll be avaiable with a previous version
but it has been tested with 1.62).

You should install all the recommended software such as Cargo:

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Frontend

It uses Nuxt.js at version 2 of Vue. You need Node to compile the code for
production (and run a web server for development) and `npm` for packaging.
By the way, the used version is into `.nvmrc` file.

### Database

PostgreSQL is the database! Why? Because it has the good things of a
relantion-based DB and JSON columns.

## Deploy

A demo is reachable at
[https://verden.demo.dcariotti.me/](https://verden.demo.dcariotti.me/) deployed
with Dokku following the 2 Dockerfiles.

Why did I used two different repos? So you can split the code and deploy
over-and-over again into different machines.
Do not forget to run `sqlx migrate run` for migrations upload, create the volume
for data storage and change the `client_max_body_size` to `50MB`.

### Extra for deploy

You can track auto-issues with Sentry, everything you need is define the
`SENTRY_DSN` environment variable.
