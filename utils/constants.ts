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
  primary: "#2563EB", // Vibrant blue
  primaryLight: "#3B82F6",
  success: "#059669", // Emerald green
  danger: "#DC2626", // Vibrant red
  background: "#F8FAFC", // Light blue-gray
  text: "#1E293B", // Dark blue-gray
  textLight: "#64748B", // Medium blue-gray
  white: "#FFFFFF",
};
