import { PrismaClient } from "@prisma/client";

export let client: PrismaClient;

// nextjs doesn't offer any real way to inject singletons into the runtime
// so we have to do dumb shit like this unfortunately
if (process.env.NODE_ENV === "production") {
  client = new PrismaClient();
} else {
  // @ts-ignore
  if (!global.client) {
    // @ts-ignore
    global.client = new PrismaClient();
  }

  // @ts-ignore
  client = global.client;
}
