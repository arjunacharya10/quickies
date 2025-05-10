// useDeepLinkHandler.ts
import { useEffect } from "react";
import { onOpenUrl } from "@tauri-apps/plugin-deep-link";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export const useDeepLinkHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unlisten = onOpenUrl(async (urls) => {
      console.log("Url", urls);
      const url = new URL(urls[0]);
      const hash = url.hash; // e.g., #access_token=...&refresh_token=...
      console.log("hash", hash);
      if (hash) {
        const params = new URLSearchParams(hash.slice(1));
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        console.log("access toke", access_token);
        console.log("refresh", refresh_token);

        if (access_token && refresh_token) {
          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          console.log(data, error);

          if (error || !data) {
            console.error("Failed to restore session", error);
          } else {
            navigate("/");
            console.log("Logged in via deep link");
          }
        }
      }
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);
};
