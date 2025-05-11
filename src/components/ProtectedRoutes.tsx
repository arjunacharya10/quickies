import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useAuth();
  const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) {
        setHasSubscription(false);
        return;
      }

      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching subscription:", error);
        setHasSubscription(false);
      } else {
        setHasSubscription(!!data); // true if subscription exists
      }

      setLoading(false);
    };

    checkSubscription();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="h-full w-full flex flex-col p-1 border-0 justify-center items-center">
        <p>Checking subscription...</p>
      </div>
    );
  }

  if (!hasSubscription) {
    return (
      <div className="h-full w-full flex flex-col p-1 border-0 justify-center items-center">
        <h1 className="text-md">Hey, {user.email} </h1>
        <p className="text-xs mt-1 text-foreground/50">
          You <b className="text-foreground text-red-400">do not</b> have an
          active subscription. <br />
          Please visit{" "}
          <a
            href="https://web.thinkerapp.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            <b className="text-[#ffde59]">Thinker Home</b>
          </a>{" "}
          to subscribe.
        </p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
