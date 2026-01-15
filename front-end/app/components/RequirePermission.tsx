"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RequirePermission({
  permission,
  children,
}: {
  permission: string;
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !user.permissions.includes(permission)) {
      router.replace("/unauthorized");
    }
  }, [user, permission, router]);

  if (!user || !user.permissions.includes(permission)) return null;

  return <>{children}</>;
}
