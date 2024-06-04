import { createResponse } from "@/utilities/apiHelpers";
import axios from "axios";
import { NextRequest } from "next/server";

export async function OPTIONS() {
  return createResponse("", {
    status: 200,
    allowAll: true,
  });
}

export async function POST(req: NextRequest) {
  let tweetText = "";
  let authCode = "";

  try {
    const reqBody = await req.json();
    tweetText = reqBody.tweet_text;
    authCode = reqBody.twitter_auth_code;

    if (!tweetText || !authCode) {
      throw new Error();
    }
  } catch {
    return createResponse("Invalid inputs", {
      status: 400,
      allowAll: true,
      method: "POST",
    });
  }

  try {
    const headersList = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + authCode,
    };

    const bodyContent = {
      text: tweetText,
    };

    const reqOptions = {
      url: "https://api.twitter.com/2/tweets",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    const postRes = await axios.request(reqOptions);
    return createResponse(
      { postRes: postRes.data },
      { allowAll: true, method: "POST" }
    );
  } catch (error) {
    console.error(error);
    return createResponse(error, {
      status: 500,
      allowAll: true,
      method: "POST",
    });
  }
}

/**
     * Example response from twitter
 {"token_type":"bearer","expires_in":7200,"access_token":"Z21DTWFmVWJiTUs4S3doS2l1d19Db2szWWlPbURYdjZjZVRzMllieDlmbnNiOjE3MTc1MzE0NjA4NDg6MTowOmF0OjE","scope":"tweet.write offline.access","refresh_token":"aXFnOXM4ejFlcTVhVTlDMV9XaWR5c2owSzZ4Z1ZXUUJnN3h3ZkRYSmQtTmFUOjE3MTc1MzE0NjA4NDg6MTowOnJ0OjE"}
     * 
     */
