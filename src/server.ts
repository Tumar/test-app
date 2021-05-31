import express from 'express';
import pinoHttp from 'pino-http';
import { ApolloServer } from 'apollo-server-express';
import { AwilixContainer } from 'awilix';

import User from 'src/models/Product';

import resolvers from './resolvers';
import typeDefs from './typedefs';
import { container } from './util/container';
import { createAuthenticationMiddleware } from './middlewares/auth';
import { isProduction, config } from './util/config';
import { ensureKnexConnection } from './util/knex';

declare global {
  interface GraphQLContext {
    diContainer: AwilixContainer;
    req: Express.Request & {
      user?: User;
    };
  }
}

const main = async () => {
  await ensureKnexConnection();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      diContainer: container,
      req,
    }),
    playground: isProduction
      ? false
      : {
        settings: {
          'request.credentials': 'include',
        },
      },
  });

  const loggingMiddleware = pinoHttp();
  const app = express()
    .use((req, res, next) => {
      loggingMiddleware(req, res, next);
    })
    .use(container.build(createAuthenticationMiddleware));

  server.applyMiddleware({
    app,
    path: '/graphql',
  });

  app.listen({ port: config.server.port }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    );
  });
};

main();
