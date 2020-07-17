import * as user from './resolvers/user';
import * as artist from './resolvers/artist';
import * as group from './resolvers/group';
import { objectType } from '@nexus/schema';

const Query = {
  Users: user.userQueries,
  Artist: artist.artistQueries,
  Group: group.groupQueries,
};

const GroupMembers = objectType({
  name: 'GroupMember',
  description: "An artist's future, current or past relationship with a group",
  definition(t) {
    t.model.group();
    t.model.artist();
  },
});

export const resolvers = {
  Query,
  User: user.Users,
  Arist: artist.Artist,
  Group: group.Group,
  GroupStatus: group.GroupStatus,
  GroupGender: group.GroupGender,
  GroupMembers,
};
