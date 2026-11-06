import { Inngest } from "inngest";
import { connectDB } from "./connectDB.js";
import User from "../model/user.model.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({
  id: "RemoteInterview",
  isDev: process.env.NODE_ENV === "production" ? false : false,
});

const syncUser = inngest.createFunction(
  {
    id: "sync-user",
    triggers: { event: "clerk/user.created" },
  },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`,
      profileImage: image_url,
    };

    await User.create(newUser);

    //in the stream

    await upsertStreamUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      image: newUser.profileImage,
    });
  },
);

const deleteUser = inngest.createFunction(
  {
    id: "delete-user",
    triggers: { event: "clerk/user.deleted" },
  },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    await User.deleteOne({ clerkId: id });

    //in stream
    await deleteStreamUser(id.toString());
  },
);

export const functions = [syncUser, deleteUser];
