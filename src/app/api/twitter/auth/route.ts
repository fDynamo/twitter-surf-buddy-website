import { createResponse } from "@/utilities/apiHelpers";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  try {
    const code = searchParams.get("code");
    if (!code) {
      return createResponse("Invalid inputs", { status: 400 });
    }

    const headerKey = process.env.TWITTER_AUTH_CODE;
    const clientId = process.env.TWITTER_CLIENT_ID;
    const redirectUri = process.env.REDIRECT_URL;

    const headersList = {
      Accept: "*/*",
      "User-Agent": "surf buddy API",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + headerKey,
    };

    const bodyContent = `code=${code}&grant_type=authorization_code&client_id=${clientId}&redirect_uri=${redirectUri}&code_verifier=challenge`;

    const reqOptions = {
      url: "https://api.twitter.com/2/oauth2/token",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    const authRes = await axios.request(reqOptions);
    return createResponse(authRes.data);
  } catch (error) {
    console.error(error);
    return createResponse(error, { status: 500 });
  }
}

/**
     * Example response from twitter
     * {
  "token_type": "bearer",
  "expires_in": 7200,
  "access_token": "RjlKZjhJNWtFNmN3YjgyQjZiREhQalk0OEt5b1JsMHoxUjctWmg4UDhjXzdnOjE3MTc0NjA2NzY0NTk6MTowOmF0OjE",
  "scope": "tweet.write offline.access",
  "refresh_token": "bUFEMWxodVM3SXo3XzJpY2NpMVZTdkM3cnRVc05HbjJMUWg2aXZmWm9TSFBfOjE3MTc0NjA2NzY0NTk6MTowOnJ0OjE"
}
     * 
     */
