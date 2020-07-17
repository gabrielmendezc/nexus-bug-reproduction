import { objectType } from "@nexus/schema";

export const Users = objectType({
  name: "User",
  definition(t) {
    t.model.username();
    // t.model.avatar()
    // t.model.banner()
    t.model.banned();
    t.model.bio();
    t.model.locale({});
    // t.model.user_roles({
    //   alias: "roles"
    // })
    t.model.slug();
    t.string("profileLink", {
      resolve(user) {
        return "test";
      },
    });
    t.model.created_at({
      alias: "createdAt",
    });
    // t.model.user_group_likes({
    //   alias: "groupLikes"
    // })
    // t.boolean("isModerator", {
    //   resolve(user) {
    //     return user.roles
    //   }
    // })

    // t.model
    // t.list.connection("group_likes", {
    //   type: "groups",
    //   resolve() {
    //     // connectionFromArray
    //   }
    // })
  },
});
