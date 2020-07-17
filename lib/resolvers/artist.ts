import { objectType, extendType } from '@nexus/schema';

export const Artist = objectType({
  name: 'Artist',
  definition(t) {
    t.model.stage_name();
    t.int('age', {
      resolve(root) {
        // We got types!!
      },
    });
  },
});

export const artistQueries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.artist();
    t.crud.artists({ ordering: true });
  },
});
