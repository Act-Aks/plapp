import { COLORS } from "@/utils/constants";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface CalculateButtonProps {
  onPress: () => void;
}

export function CalculateButton({ onPress }: CalculateButtonProps) {
  return (
    <TouchableOpacity
      style={styles.calculateButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.calculateButtonText}>Calculate Net Earnings</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  calculateButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  calculateButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
