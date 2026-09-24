"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useLogoutMutation } from "@/store/api/technazApi";
import { useAppDispatch } from "@/store/hooks";
import { clearAuth } from "@/store/slices/authSlice";

export default function LogoutButton() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } finally {
      dispatch(clearAuth());
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand-dark px-4 py-2.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-dark hover:text-white disabled:opacity-60"
    >
      <LogOut size={16} />
      {isLoading ? "Signing out..." : "Logout"}
    </button>
  );
}
