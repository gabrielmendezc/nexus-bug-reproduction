import { objectType } from "@nexus/schema";
import differenceInYears from "date-fns/differenceInYears";

export const Artist = objectType({
  name: "Artist",
  description: "An artist, trainee or dancer",
  definition(t) {
    t.model.stage_name({
      // @ts-ignore
      description: "The name an artist as commonly known by",
      alias: "stageName",
    });
    t.model.birth_date({
      alias: "birthDate",
    });
    // t.model.group({

    //   description: "aaa"
    // })
    // t.int("id")
    t.int("age", {
      nullable: true,
      description: "Artist's age, null if the birth date is not known.",
      resolve(artist) {
        if (!artist.birth_date) {
          return null;
        }
        return differenceInYears(new Date(), artist.birth_date);
      },
    });
    t.int("koreanAge", {
      nullable: true,
      description: "Artist's korean age, null if the birth date is not known.",
      resolve(artist) {
        if (!artist.birth_date) {
          return null;
        }
        return new Date().getFullYear() + 1 - artist.birth_date.getFullYear();
      },
    });
    // t.string("description", {
    //   nullable: true,
    //   description: "Brief description of the artist's accomplishments",
    // })
    // t.string("fullName", {
    //   nullable: true,
    //   description: 'The full name of the artist in Latin characters',
    // })
    // t.string("stageName", {
    //   nullable: true,
    //   description: 'The main name an artist is known by in Latin characters',
    // })
    // t.string("koreanStageName", {
    //   nullable: true,
    //   description: 'Stage name of the artist in Korean',
    // })
    // t.string("nativeName", {
    //   nullable: true,
    //   description: "Artist's full name in their native language. Ex: Lisa's native name ลลิษา มโนบาล",
    // })
    // t.list.string("aliases", { description: 'Aliases an artist is known by, this does not include pet names.' })
    // t.field("thumbnail", {
    //   type: Media,
    //   nullable: true,
    //   description: 'Main thumbnail of the artist, preferably at least 500x500 px but not guaranteed',
    // })
    // t.field("banner", {
    //   type: Media,
    //   nullable: true,
    //   description: 'A wide banner of the artist, preferably at least 1900px wide but not guaranteed',
    // })
    // t.string("countryOfOrigin", {
    //   nullable: true,
    //   description: 'The birth country of the artist. Given in ISO-3166 compliant format',
    // })
    // t.string("birthCity", {
    //   nullable: true,
    //   description: 'The birth city of the artist',
    // })
    // t.date("birthDate", { nullable: true })
    // t.field("birthDatePrecision", {
    //   type: DatePrecision,
    //   nullable: true,
    // })
    // t.field("bloodType", {
    //   type: BloodType,
    //   nullable: true,
    //   description: "Known blood type of the artist, I honestly don't know why anyone would care about this but\nthis pops up everywhere there's kpop information so I guess...",
    // })
    // t.boolean("soloAct", {
    //   nullable: true,
    //   description: 'The solo',
    // })
    // t.field("mainGroup", {
    //   type: Group,
    //   nullable: true,
    //   description: "The main group membership of the artist. Solo acts are not\ncounted (unless artist is not a member of any other group). Ex: Moonbyul's\nmain group is Mamamoo despite also being a solo artist",
    // })
    // t.field("gender", {
    //   type: Gender,
    //   nullable: true,
    //   description: 'Gender the artist publicly identifies as',
    // })
    // t.float("height", {
    //   nullable: true,
    //   description: 'Latest recorded height of the artist, centimeters by default.',
    //   args: {
    //     units: arg({
    //       type: Units,
    //       default: 'Metric'
    //     }),
    //   },
    // })
    // t.string("youtubeId", {
    //   nullable: true,
    //   description: "Id of the artist's youtube channel",
    // })
    // t.list.field("memberOf", {
    //   type: GroupMember,
    //   description: 'All groups (including solo acts) this artist is a member of',
    // })
    // t.field("zodiac", {
    //   type: ZodiacSign,
    //   nullable: true,
    // })
    // t.string("instagramUsername", { nullable: true })
    // t.string("twitterHandle", { nullable: true })
    // t.string("melonId", { nullable: true })
  },
});
