import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../lib/schema';
import { client } from '../../prisma';

const angery = `
query {
  groups {
    name
    members {
      artist {
        stageName
      }
    }
  }
}
`;

const endpoint = `/api`;

const apolloServer = new ApolloServer({
  schema,
  playground: {
    title: 'Kiyomi',
    faviconUrl: '/api_logo_alt.jpg',
    tabs: [
      {
        name: ':(',
        endpoint,
        query: angery,
      },
    ],
    settings: {
      // including the user's login credentials from the site
      'request.credentials': 'same-origin',
      'editor.fontSize': 16,
      'editor.fontFamily':
        'Jetbrains Mono,Consolas,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace,sans-serif',
    },
  },
  engine: {
    graphVariant: process.env.NODE_ENV,
    reportSchema: true,
  },
  introspection: true,
  // plugins: [examplePlugin()],
  tracing: process.env.NODE_ENV !== 'production',
  async context({ req, res }) {
    return {
      req,
      prisma: client,
      db: client,
      res,
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api' });
