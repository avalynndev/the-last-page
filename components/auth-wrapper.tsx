"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Indie_Flower } from "next/font/google";

const indieFlower = Indie_Flower({
  subsets: ["latin"],
  weight: "400",
});

const AVATARS = [
  "/avatar-1.png",
  "/avatar-2.png",
  "/avatar-3.png",
  "/avatar-4.png",
  "/avatar-5.png",
  "/avatar-6.png",
  "/avatar-7.png",
  "/avatar-8.png",
];

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<"intro" | "auth">("intro");
  const [username, setUsername] = useState<string>("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [randomAvatars, setRandomAvatars] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load stored data
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    const storedAvatar = localStorage.getItem("avatar");

    if (storedName && storedAvatar) {
      setUsername(storedName);
      setAvatar(storedAvatar);
      setIsLoggedIn(true);
    } else {
      const shuffled = [...AVATARS].sort(() => 0.5 - Math.random());
      setRandomAvatars(shuffled.slice(0, 4));
    }

    setTimeout(() => setLoading(false), 200);
  }, []);

  const handleSubmit = () => {
    if (username.trim() && avatar) {
      localStorage.setItem("username", username.trim());
      localStorage.setItem("avatar", avatar);
      setIsLoggedIn(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ReloadIcon className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  if (isLoggedIn) return <>{children}</>;

  if (step === "intro") {
    return (
      <div
        className={`flex flex-col items-center justify-center h-screen px-6 text-center`}
      >
        <h1 className={`text-5xl  ${indieFlower.className}`}>
          Welcome to The Last Page!
        </h1>
        <p className="text-lg max-w-md">
          A simple page where everyone can write something, pick a username and
          avatar, and leave their mark.
        </p>
        <Button onClick={() => setStep("auth")} className="mt-4">
          OO!
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen gap-6 ${indieFlower.className}`}
    >
      <h1 className="text-3xl text-center leading-snug">
        Enter your username <span className="block">&</span> pick an avatar
      </h1>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-64 text-lg"
      />
      <div className="grid grid-cols-2 gap-4">
        {randomAvatars.map((a) => (
          <div
            key={a}
            className={`cursor-pointer rounded-full border-2 transition-transform ${
              avatar === a ? "border-primary scale-105" : "border-transparent"
            }`}
            onClick={() => setAvatar(a)}
          >
            <Avatar className="w-24 h-24">
              <AvatarImage src={a} alt="avatar" />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
      <Button
        onClick={handleSubmit}
        disabled={!username.trim() || !avatar}
        className="w-40"
      >
        STARRT!
      </Button>
    </div>
  );
}
