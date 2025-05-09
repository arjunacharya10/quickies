"use client";

import { handleLinkClick } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function EmailForm({
  formAction,
}: {
  formAction: (formData: FormData) => Promise<void>;
}) {
  const [showForm, setShowForm] = useState(false);

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      email: { value: string };
      password: { value: string };
    };
    const formData = new FormData();
    formData.append("email", formElements.email.value);
    formData.append("password", formElements.password.value);
    formAction(formData);
  }

  return (
    <>
      {!showForm ? (
        <Button
          onClick={() => setShowForm(true)}
          variant="outline"
          size={"sm"}
          className="w-full text-xs"
        >
          Continue with Email
        </Button>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-xs">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                className="text-xs"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-xs">
                  Password
                </Label>
                <p
                  onClick={() =>
                    handleLinkClick(
                      "https://web.thinkerapp.org/forgot-password"
                    )
                  }
                  className="ml-auto text-xs underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </p>
              </div>
              <Input
                className="text-xs"
                name="password"
                id="password"
                type="password"
                required
              />
            </div>
            <Button
              size={"sm"}
              variant={"secondary"}
              type="submit"
              className="w-full text-xs"
            >
              Login
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
