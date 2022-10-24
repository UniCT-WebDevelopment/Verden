import Vue from "vue";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

export default ({ app, _, env }) => {
  app.sentry = Sentry.init({
    Vue,
    dsn: env.sentry_dsn,
    integrations: [new BrowserTracing()],
    tracesSampleRate: env.sentry_rate,
    environment: env.sentry_env,
  });
};
