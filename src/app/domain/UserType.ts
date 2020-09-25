const UserTypes = {
  PREMIUM: "Premium",
  NORMAL: "Normal"
} as const;

export type UserType = typeof UserTypes[keyof typeof UserTypes];
