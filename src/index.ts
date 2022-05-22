import dotenv from "dotenv";

dotenv.config();

import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import config from "config";
import { resolvers } from "./resolvers";

async function bootstrap() {
  const port = config.get("port");
  // build schema
  const schema = await buildSchema({
    resolvers,
    // authChecker,
  });
  // init express
  const app = express();

  app.use(cookieParser());
  // create apollo server
  const server = new ApolloServer({
    schema,
    context: (ctx) => {
      console.log(ctx);
      return ctx;
    },
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  // server start
  await server.start();
  // apply middleware
  server.applyMiddleware({ app });

  app.listen({ port: port }, () => {
    console.log(`App is listening on http://localhost:${port}`);
  });
  // connect to db
}

bootstrap();
