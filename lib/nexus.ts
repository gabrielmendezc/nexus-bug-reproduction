import { queryType, objectType } from "@nexus/schema";
import * as group from "./resolvers/group";
import * as user from "./resolvers/user";
import * as artist from "./resolvers/artist";

const Query = queryType({
  definition(t) {
    t.crud.user();
    t.crud.users({
      ordering: true,
    });

    t.crud.artist();
    t.crud.artists();

    t.crud.group();
    t.crud.groups({ ordering: true, filtering: true });
  },
});

const GroupMembers = objectType({
  name: "GroupMember",
  description: "An artist's future, current or past relationship with a group",
  definition(t) {
    t.model.group();
    t.model.artist();
  },
});

export default [
  GroupMembers,
  Query,
  artist.Artist,
  user.Users,
  group.GroupStatus,
  group.GroupGender,
  group.Group,
  group.GroupType,
];
