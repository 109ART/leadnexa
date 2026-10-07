"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Button from "@/components/ui/Button";

export default function LogoutButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleLogout() {
    setLoading(true);
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Log out
      </Button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] grid place-items-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
          >
            <div
              className="absolute inset-0 bg-navy/50"
              onClick={() => !loading && setOpen(false)}
            />
            <div className="relative w-full max-w-sm rounded-card bg-surface p-6 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-primary">
                <LogOut size={22} />
              </span>
              <h2 id="logout-title" className="mt-4 text-lg font-semibold">
                Log out of LeadNexa?
              </h2>
              <p className="mt-1 text-sm text-muted">
                You will need to log in again to access your leads.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button onClick={handleLogout} disabled={loading}>
                  {loading ? "Logging out..." : "Yes, log out"}
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}