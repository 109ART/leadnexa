type PasswordRule = {
  id: string;
  label: string;
  test: (password: string) => boolean;
};

export const passwordRules: PasswordRule[] = [
  { id: "length", label: "At least 8 characters", test: (p) => p.length >= 8 },
  { id: "upper", label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { id: "lower", label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
  { id: "number", label: "One number", test: (p) => /[0-9]/.test(p) },
  {
    id: "special",
    label: "One special character (!@#$%...)",
    test: (p) => /[^A-Za-z0-9]/.test(p),
  },
];

export function getPasswordError(password: string): string | null {
  const failed = passwordRules.find((rule) => !rule.test(password));
  return failed ? `Password needs: ${failed.label.toLowerCase()}` : null;
}