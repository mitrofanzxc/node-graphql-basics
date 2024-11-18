import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, RootSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { getDataLoaders } from './data-loaders/get-data-loaders.js';

const MAX_DEPTH = 5;

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;
      const documentAST = parse(query);
      const validationResults = validate(RootSchema, documentAST, [
        depthLimit(MAX_DEPTH),
      ]);

      if (validationResults.length) {
        return { errors: validationResults };
      }

      const dataLoaders = getDataLoaders(prisma);

      return await graphql({
        schema: RootSchema,
        source: query,
        variableValues: variables,
        contextValue: { prisma, dataLoaders },
      });
    },
  });
};

export default plugin;
