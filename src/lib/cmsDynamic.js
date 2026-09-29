import { unstable_noStore as noStore } from "next/cache";

/** Opt out of static/data cache so CMS content is read fresh from MongoDB. */
export function cmsDynamic() {
  noStore();
}
