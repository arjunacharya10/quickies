import { Info, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function Home() {
  const [quickieText, setQuickieText] = useState("");

  return (
    <div className="h-full w-full flex flex-col p-1 border-0">
      <div className="flex flex-row justify-between items center mt-1 px-2">
        <p className="text-sm font-bold text-[#ffde59]">Thinker Quickie</p>
        <Settings width={16} height={16} />
      </div>
      <Textarea
        onChange={(e) => setQuickieText(e.target.value)}
        value={quickieText}
        placeholder="Start typing ..."
        className="w-full h-full mt-2 mb-2 border-0 resize-none overflow-auto"
      />
      <div className="flex flex-row justify-between items-end mb-1 px-2">
        <Info width={16} height={16} className="mb-1" />
        <Button size={"sm"} variant={"secondary"}>
          Add Quickie
        </Button>
      </div>
    </div>
  );
}
