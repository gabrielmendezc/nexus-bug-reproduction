import * as user from './resolvers/user';
import * as artist from './resolvers/artist';

const Query = {
  Users: user.userQueries,
  Artist: artist.artistQueries,
};

export const resolvers = {
  Query,
  User: user.Users,
  Arist: artist.Artist,
};
