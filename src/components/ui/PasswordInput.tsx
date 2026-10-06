"use client";

import { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import Input from "./Input";
import { passwordRules } from "@/lib/password";
import { cn } from "@/lib/utils";

type PasswordInputProps = {
  name: string;
  placeholder?: string;
  autoComplete?: string;
  showRules?: boolean;
};

export default function PasswordInput({
  name,
  placeholder = "Password",
  autoComplete,
  showRules = false,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div>
      <div className="relative">
        <Input
          name={name}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pr-12"
          required
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-text"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {showRules && (
        <ul className="mt-3 space-y-1.5 text-xs">
          {passwordRules.map((rule) => {
            const passed = rule.test(value);
            return (
              <li
                key={rule.id}
                className={cn(
                  "flex items-center gap-2 transition-colors",
                  passed ? "text-success" : "text-muted"
                )}
              >
                {passed ? <Check size={14} /> : <X size={14} />}
                {rule.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}