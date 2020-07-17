import { makeSchema } from '@nexus/schema';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import { join } from 'path';
import * as types from './nexus';
import { Context } from '../types';

export const nexusPrisma = nexusSchemaPrisma({
  experimentalCRUD: true,
  paginationStrategy: 'prisma',
  prismaClient: (ctx: Context) => ctx.db,
});

export const schema = makeSchema({
  types,
  plugins: [nexusPrisma],
  outputs: {
    typegen: join(process.cwd(), 'generated', 'index.d.ts'),
    schema: join(process.cwd(), 'generated', 'schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      // We also need to import this source in order to provide it as the `contextType` below.
      {
        source: join(process.cwd(), 'types.ts'),
        alias: 'ctx',
      },
    ],
    contextType: 'ctx.Context',
  },
});
