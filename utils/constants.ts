import { FadeInDown, FadeOut, LinearTransition } from "react-native-reanimated";

export const defaultStyling = {
  spacing: 10,
  color: "#ececec",
  borderRadius: 16,
  damping: 14,
};

export const defaultAnimations = {
  entering: FadeInDown.springify().damping(defaultStyling.damping),
  exiting: FadeOut.springify().damping(defaultStyling.damping),
  layout: LinearTransition.springify().damping(defaultStyling.damping),
};

export const COLORS = {
  primary: "#2563EB",
  primaryLight: "#3B82F6",
  success: "#059669",
  danger: "#DC2626",
  background: "#F8FAFC",
  text: "#1E293B",
  textLight: "#64748B",
  white: "#FFFFFF",
  warning: "#F59E0B",
} as const;
