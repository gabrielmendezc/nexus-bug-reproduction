import { schema } from "nexus";
import { formatISO } from "date-fns";
import { countBy } from "lodash";
import { Gender, GroupGender, GroupStatus } from "../../__generated__";
import { objectType } from "@nexus/schema";

const UserLike = objectType({
  name: "UserLike",
  definition(t) {
    t.date("likedAt")
    t.string("user")
  }
})
