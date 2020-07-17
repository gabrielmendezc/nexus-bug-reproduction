import { formatISO } from "date-fns";
import { countBy } from "lodash";
import { objectType, enumType } from "@nexus/schema";

export function deriveGroupGender(memberGenders: any[]): any {}

export const Group = objectType({
  name: "Group",
  description: "A group or solo act",
  definition(t) {
    t.model.id();
    t.model.company_name({
      alias: "companyName",
    });
    t.model.fandom_name({
      alias: "fandomName",
    });
    t.model.created_at({
      alias: "createdAt",
    });
    t.model.debut_date({
      alias: "debutDate",
    });
    t.model.debut_date_precision({
      alias: "debutDatePrecision",
    });
    t.model.description();
    t.model.disband_date({
      alias: "disbandDate",
    });
    t.model.disband_date_precision({
      alias: "disbandDatePrecision",
    });
    t.model.facebook_username({
      alias: "facebookUsername",
    });
    // this is gonna have to be moved out sometime later
    t.model.discord_server_id({
      alias: "discordServerId",
    });
    t.field("gender", {
      type: "GroupGender",
      async resolve(group, args, ctx) {
        const idols = await ctx.db.artists.findMany({
          include: {
            genders: true,
          },
          where: {
            group_members: {
              some: {
                group_id: group.id,
              },
            },
          },
        });
        const genders = idols.map((i) => i.gender);
        return deriveGroupGender(genders);
      },
    });
    t.model.instagram_username({
      alias: "instagramUsername",
    });
    t.list.field("likedBy", {
      type: "User",
      resolve(group, args, ctx) {
        return ctx.db.user.findMany({
          where: {
            user_group_likes: {
              some: {
                group_id: group.id,
              },
            },
          },
        });
      },
    });
    // t.model.user_group_likes({
    //   alias: "likedBy",
    //   type: "users",
    //   resolve(group, args, ctx) {
    //     return ctx.db.users.findMany({
    //       take: args.first,
    //       where: {
    //         user_group_likes: {
    //           some: {
    //             group_id: group.id
    //           }
    //         }
    //       }
    //     });
    //   }
    // });
    // t.field("isLiked", {
    //   alias: "instagramUsername"
    // })
    t.field("isSubunit", {
      type: "Boolean",
      resolve(group) {
        return Boolean(group.parent_group_id);
      },
    });
    t.model.korean_name({
      alias: "koreanName",
    });
    // t.field("latestRelease", {
    //
    // })
    t.field("likeCount", {
      type: "Int",
      resolve(group, args, ctx) {
        return ctx.db.user_group_likes.count({
          where: {
            group_id: group.id,
          },
        });
      },
    });
    t.model.group_members({
      alias: "members",
    });
    t.model.name();
    t.model.parent_group({
      alias: "parentGroup",
    });
    t.model.spotify_id({
      alias: "spotifyId",
    });
    t.field("status", {
      type: "GroupStatus",
      resolve(group) {
        const today = new Date();
        if (!group.debut_date || group.debut_date > today) {
          return "PRE_DEBUT";
        }

        if (group.disband_date && group.disband_date > today) {
          return "DISBANDING";
        }

        if (group.disband_date && group.disband_date <= today) {
          return "DISBANDED";
        }
        // TODO: Add hiatus support
        return "ACTIVE";
      },
    });
    t.model.subunits();
    t.model.tiktok_username({
      alias: "tiktokUsername",
    });
    t.model.type();
    t.model.updated_at({
      alias: "updatedAt",
    });
    t.model.vlive_id({
      alias: "vliveId",
    });
    t.model.website_url({
      alias: "websiteUrl",
    });
    t.model.youtube_id({
      alias: "youtubeId",
    });
    t.model.name();
    t.model.debut_date({
      alias: "debutDate",
      resolve(group) {
        console.log(formatISO(new Date(group.debut_date)));
        return formatISO(group.debut_date);
      },
    });
    t.model.group_members({
      alias: "members",
    });
    t.field("status", {
      type: "GroupStatus",
      resolve(group, args) {
        const today = new Date();
        if (!group.debut_date || group.debut_date > today) {
          return "PRE_DEBUT";
        }

        if (group.disband_date && group.disband_date > today) {
          return "DISBANDING";
        }

        if (group.disband_date && group.disband_date <= today) {
          return "DISBANDED";
        }
        // TODO: Add hiatus support
        return "ACTIVE";
      },
    });
    t.model.discord_server_id({
      alias: "discordServerId",
    });
    t.model.facebook_username({
      alias: "facebookUsername",
    });
    t.model.fan_cafe_id({
      alias: "fanCafeId",
    });
  },
});

export const GroupStatus = enumType({
  name: "GroupStatus",
  members: [
    {
      description: "A group or solo act that is currently active.",
      name: "ACTIVE",
      value: "ACTIVE",
    },
    {
      description: "A group or solo act that has officially disbanded.",
      name: "DISBANDED",
      value: "DISBANDED",
    },
    {
      description:
        "A group or solo act that has set an official date for disbanding\nbut hasn't disbanded",
      name: "DISBANDING",
      value: "DISBANDING",
    },
    {
      description:
        "A group or solo act that is current on an officially confirmed hiatus.",
      name: "HIATUS",
      value: "HIATUS",
    },
    {
      description:
        "A group or solo artist that has a debut date set but has not yet debuted.",
      name: "PRE_DEBUT",
      value: "PRE_DEBUT",
    },
  ],
});

export const GroupType = enumType({
  name: "GroupType",
  members: [
    {
      description: "A group with more than 1 member",
      name: "GROUP",
      value: "GROUP",
    },
    {
      description:
        "A solo project with only 1 member. Also applies to groups that turned into solo projects\nafter being a group like Bolbbalgan4.",
      name: "SOLO",
      value: "SOLO",
    },
  ],
});

export const GroupGender = enumType({
  name: "GroupGender",
  members: [
    {
      description: "A group with all male members",
      name: "BOY_BAND",
      value: "BOY_BAND",
    },
    {
      description:
        "A group with a mixed gender composition. Note: if ever applicable, groups with non-binary\ngroup members are considered co-ed",
      name: "COED",
      value: "COED",
    },
    {
      description: "A group with all female members",
      name: "GIRL_GROUP",
      value: "GIRL_GROUP",
    },
    {
      description:
        "A group with an unknown gender composition. Usually means\nthere are no members in the group.",
      name: "UNKNOWN",
      value: "UNKNOWN",
    },
  ],
});
