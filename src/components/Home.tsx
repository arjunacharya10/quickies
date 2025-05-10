import { Info, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Home() {
  const { user } = useAuth();
  const [quickieText, setQuickieText] = useState("");
  const [submissionState, setSubmissionState] = useState("");
  const [loading, setLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const addQuickie = async () => {
    setLoading(true);

    const { error } = await supabase.from("quickies").insert({
      user_id: user?.id,
      type: "text",
      data: quickieText,
    });

    if (error) {
      setSubmissionState("Failed to save.");
    } else {
      setSubmissionState("Saved successfully");
      setQuickieText("");
    }
    setLoading(false);
    setTimeout(() => {
      setSubmissionState("");
    }, 3000);
  };

  const signout = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    setSigningOut(false);
  };

  return (
    <div className="h-full w-full flex flex-col p-1 border-0">
      <div className="flex flex-row justify-between items center mt-1 px-2">
        <p className="text-sm font-bold text-[#ffde59]">Thinker Quickie</p>
        <div className="flex flex-row justify-around items-center gap-2">
          <Popover>
            <PopoverTrigger>
              <Info width={16} height={16} />
            </PopoverTrigger>
            <PopoverContent className="text-xs">
              Thinker quickie is the fastest way you can dump ideas into your
              Thinker Home.
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <Settings width={16} height={16} />
            </PopoverTrigger>
            <PopoverContent className="text-xs">
              <div className="relative block">
                <p className="text-xs">Hello {user?.email}</p>
                <p className="text-xs">
                  If you want to signout, please{" "}
                  <span onClick={signout} className="underline cursor-pointer">
                    {signingOut ? "Signing Out..." : "Click Here"}
                  </span>
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Textarea
        onChange={(e) => setQuickieText(e.target.value)}
        value={quickieText}
        placeholder="Start typing ..."
        className="w-full h-full mt-2 mb-2 border-0 resize-none overflow-auto text-sm"
      />
      <div className="flex flex-row justify-between items-end mb-1 px-2">
        {submissionState !== "" ? (
          <p className="text-xs text-foreground/50 mb-1">{submissionState}</p>
        ) : (
          <div></div>
        )}
        <Button
          onClick={addQuickie}
          disabled={loading}
          size={"sm"}
          variant={"default"}
          className="cursor-pointer"
        >
          {loading ? "Adding..." : "Add Quickie"}
        </Button>
      </div>
    </div>
  );
}
