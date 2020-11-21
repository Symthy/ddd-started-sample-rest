export const UserTypes = {
  PREMIUM: "Premium",
  NORMAL: "Normal"
} as const;

export type UserType = typeof UserTypes[keyof typeof UserTypes];

export function transferType(value?: string): UserType | undefined {
  for (const type of Object.values(UserTypes)) {
    if (value === type) {
      return type;
    }
  }
  return undefined;
}
