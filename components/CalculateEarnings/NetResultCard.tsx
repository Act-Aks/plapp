import { COLORS } from "@/utils/constants";
import { formatIndianCurrency } from "@/utils/currencyFormat";
import { StyleSheet, Text, View } from "react-native";

interface NetResultCardProps {
  netProfitLoss: number;
}

export function NetResultCard({ netProfitLoss }: NetResultCardProps) {
  return (
    <View
      style={[
        styles.netCard,
        {
          backgroundColor: netProfitLoss >= 0 ? "#E8F5E9" : "#FFEBEE",
          borderLeftColor: netProfitLoss >= 0 ? COLORS.success : COLORS.danger,
        },
      ]}
    >
      <Text style={styles.netLabel}>Net Profit/Loss</Text>
      <Text
        style={[
          styles.netValue,
          {
            color: netProfitLoss >= 0 ? COLORS.success : COLORS.danger,
          },
        ]}
      >
        {formatIndianCurrency(Math.abs(netProfitLoss))}
      </Text>
      <Text
        style={[
          styles.netType,
          {
            color: netProfitLoss >= 0 ? COLORS.success : COLORS.danger,
          },
        ]}
      >
        {netProfitLoss >= 0 ? "PROFIT" : "LOSS"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  netCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  netLabel: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  netValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  netType: {
    fontSize: 14,
    fontWeight: "600",
  },
});
