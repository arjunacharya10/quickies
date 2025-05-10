// pages/Login.tsx
import { supabase } from "@/lib/supabase";
import { handleLinkClick } from "@/lib/utils";
import { openUrl } from "@tauri-apps/plugin-opener";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppleSignin from "./login/AppleSignin";
import EmailForm from "./login/EmailForm";
import { FormMessage } from "./login/form-message";
import GoogleSigning from "./login/GoogleSignin";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");
  const error = searchParams.get("error");

  console.log(searchParams);

  const signIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return navigate(
        `/login?message=Couldn't authenticate User&error=${error.message}`
      );
    }

    return navigate("/");
  };

  const handleAppleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: {
        skipBrowserRedirect: true,
        redirectTo: `https://web.thinkerapp.org/auth/forward`,
      },
    });

    if (data.url) {
      await openUrl(data.url); // use the redirect API for your server framework
    } else {
      return navigate(
        `/login?message=Couldn't authenticate user&error=${error?.message}`
      );
    }
  };

  const handleGoogleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        skipBrowserRedirect: true,
        redirectTo: `https://web.thinkerapp.org/auth/forward`,
      },
    });

    if (data.url) {
      await openUrl(data.url); // use the redirect API for your server framework
    } else {
      return navigate(
        `/login?message=Couldn't authenticate user&error=${error?.message}`
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="grid gap-4">
        <div className="grid gap-3">
          <GoogleSigning buttonClick={handleGoogleSignin} />
          <AppleSignin buttonClick={handleAppleSignin} />
        </div>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-foreground/75">
            Or
          </span>
        </div>
        <EmailForm formAction={signIn} />
      </div>
      <div className="mt-4 text-center text-xs">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => handleLinkClick("https://web.thinkerapp.org/signup")}
          className="underline text-blue-500"
        >
          Sign up
        </button>
        <FormMessage message={message} error={error} />
      </div>
    </div>
  );
};

export default Login;
