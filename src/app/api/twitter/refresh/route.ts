import { createResponse } from "@/utilities/apiHelpers";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return createResponse("Invalid inputs", { status: 400, allowAll: true });
    }

    const headerKey = process.env.TWITTER_AUTH_CODE;
    const clientId = process.env.TWITTER_CLIENT_ID;

    const headersList = {
      Accept: "*/*",
      "User-Agent": "surf buddy API",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + headerKey,
    };

    const bodyContent = `refresh_token=${code}&grant_type=refresh_token&client_id=${clientId}`;

    const reqOptions = {
      url: "https://api.twitter.com/2/oauth2/token",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    const authRes = await axios.request(reqOptions);
    return createResponse(authRes.data, { allowAll: true });
  } catch (error) {
    console.error(error);
    return createResponse(error, { status: 500, allowAll: true });
  }
}

/**
     * Example response from twitter
 {"token_type":"bearer","expires_in":7200,"access_token":"Z21DTWFmVWJiTUs4S3doS2l1d19Db2szWWlPbURYdjZjZVRzMllieDlmbnNiOjE3MTc1MzE0NjA4NDg6MTowOmF0OjE","scope":"tweet.write offline.access","refresh_token":"aXFnOXM4ejFlcTVhVTlDMV9XaWR5c2owSzZ4Z1ZXUUJnN3h3ZkRYSmQtTmFUOjE3MTc1MzE0NjA4NDg6MTowOnJ0OjE"}
     * 
     */
