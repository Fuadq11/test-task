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
  const { hasPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!hasPermission(permission)) {
      router.replace("/unauthorized");
    }
  }, [permission]);

  if (!hasPermission(permission)) return null;

  return <>{children}</>;
}
