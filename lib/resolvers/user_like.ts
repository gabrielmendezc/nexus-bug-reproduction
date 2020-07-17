import { objectType } from '@nexus/schema';

const UserLike = objectType({
  name: 'UserLike',
  definition(t) {
    // Missing the date scalar
    // t.date("likedAt")
    t.string('user');
  },
});
