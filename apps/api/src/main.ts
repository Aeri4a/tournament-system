import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: 'http://localhost:5173', // frontend
    credentials: true,
  });

  app.use(
    session({
      name: 'auth-session',
      secret: 'big-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 5 * 60 * 1000, // 5 minutes
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
