import express from 'express';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import ErrorHandler from './error/ErrorHandler.js';
import UserRouter from './user/UserRouter.js';
import AuthenticationRouter from './auth/AuthenticationRouter.js';

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      lookupHeader: 'accept-language',
    },
  });

const app = express();

app.use(middleware.handle(i18next));

app.use(express.json());

app.use(UserRouter);
app.use(AuthenticationRouter);

app.use(ErrorHandler);

export default app;
