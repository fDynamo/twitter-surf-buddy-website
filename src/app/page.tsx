"use client";

import styles from "./page.module.css";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function Home() {
  const params = useSearchParams();
  const codeParam = params.get("code");
  const stateParam = params.get("state");

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

      window.postMessage({ actionType: "AUTH_CREDS", authRes: res.data }, "*");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className={styles.main}>
      <h1>To implement lmao</h1>
    </main>
  );
}
