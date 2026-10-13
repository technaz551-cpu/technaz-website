import "server-only";
import dbConnect from "@/lib/dbConnect";
import ContactContent from "@/models/ContactContent";
import { cmsDynamic } from "@/lib/cmsDynamic";
import { FOOTER_TAGLINE_DEFAULT } from "@/lib/pageMetadata";

function isPakistanOffice(office) {
  if (!office) return false;
  const country = (office.country || "").toLowerCase();
  const name = (office.name || "").toLowerCase();
  const address = (office.address || "").toLowerCase();
  return (
    country === "pakistan" ||
    name.includes("pakistan") ||
    address.includes("pakistan")
  );
}

export function sanitizePublicContactContent(doc) {
  const offices = (doc.offices || []).filter((o) => !isPakistanOffice(o));
  return {
    ...doc,
    offices,
    footerBlurb: doc.footerBlurb?.trim() || FOOTER_TAGLINE_DEFAULT,
  };
}

export async function getContactContent() {
  cmsDynamic();
  await dbConnect();
  let doc = await ContactContent.findOne({}).lean();
  if (!doc) {
    doc = (await ContactContent.create({})).toObject();
  }
  return sanitizePublicContactContent(JSON.parse(JSON.stringify(doc)));
}
