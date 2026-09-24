import "server-only";
import dbConnect from "@/lib/dbConnect";
import ContactContent from "@/models/ContactContent";

export async function getContactContent() {
  await dbConnect();
  let doc = await ContactContent.findOne({}).lean();
  if (!doc) {
    doc = (await ContactContent.create({})).toObject();
  }
  return JSON.parse(JSON.stringify(doc));
}
