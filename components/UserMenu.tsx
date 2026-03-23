"use client";

import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

export default function UserMenu() {
  const router = useRouter();

  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label="Analysis History"
          labelIcon={<LayoutDashboard size={16} />}
          onClick={() => router.push("/dashboard")}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};