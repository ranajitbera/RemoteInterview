import { StreamChat } from "stream-chat";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;
if (!apiKey || !apiSecret) {
  console.log("STREAM api key or secret is missing!");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

//creat and update user, thats why it is called upsert
export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
  } catch (error) {
    console.error("Error upsertStream user",error);
  }
};

//delete the user
export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
  } catch (error) {
    console.error("Error deleteStreamUser user", error);
  }
};
