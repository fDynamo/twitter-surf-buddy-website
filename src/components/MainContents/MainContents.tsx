"use client";

import styles from "./MainContents.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function MainContents() {
  const params = useSearchParams();
  const codeParam = params.get("code");
  const stateParam = params.get("state");
  const [authCode, setAuthCode] = useState("");

  useEffect(() => {
    if (codeParam && stateParam) {
      //TODO: State validation
      getAccessToken(codeParam);
    }
  }, [codeParam, stateParam]);

  async function getAccessToken(code: string) {
    try {
      const apiEndpoint =
        window.location.origin + "/api/twitter/auth?code=" + code;
      const res = await axios.get(apiEndpoint);

      const { access_token, refresh_token } = res.data;
      const toSave = access_token + "[|]" + refresh_token + "[END]";
      const encoded = btoa(toSave);
      setAuthCode(encoded);
    } catch (err) {
      console.error(err);
    }
  }

  function handleCopyClick() {
    // Copy the text inside the text field
    navigator.clipboard.writeText(authCode);
  }

  return (
    <main className={styles.main}>
      <div className={styles["content"]}>
        <h1>Copy this key into TweetPal</h1>
        <div className={styles["copy-code"]}>
          <input value={authCode} readOnly></input>
          <button onClick={handleCopyClick}>copy</button>
        </div>
      </div>
    </main>
  );
}
