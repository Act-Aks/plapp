import { COLORS } from "@/utils/constants";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface ChargesInputProps {
  charges: string;
  onChargesChange: (value: string) => void;
}

export function ChargesInput({ charges, onChargesChange }: ChargesInputProps) {
  return (
    <View style={styles.chargesContainer}>
      <Text style={styles.chargesLabel}>Processing Charges</Text>
      <TextInput
        style={styles.chargesInput}
        placeholder="Enter charges amount"
        value={charges}
        onChangeText={onChargesChange}
        keyboardType="numeric"
        placeholderTextColor={COLORS.textLight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chargesContainer: {
    marginBottom: 24,
  },
  chargesLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  chargesInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: COLORS.text,
  },
});
