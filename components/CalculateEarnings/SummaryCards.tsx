import { COLORS } from "@/utils/constants";
import { formatIndianCurrency } from "@/utils/currencyFormat";
import { StyleSheet, Text, View } from "react-native";

interface SummaryCardsProps {
  totalStatements: number;
  totalProfit: number;
  totalLoss: number;
}

export function SummaryCards({
  totalStatements,
  totalProfit,
  totalLoss,
}: SummaryCardsProps) {
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Statements</Text>
        <Text style={styles.summaryValue}>{totalStatements}</Text>
      </View>

      <View style={[styles.summaryCard, { backgroundColor: "#E8F5E9" }]}>
        <Text style={styles.summaryLabel}>Total Profit</Text>
        <Text style={[styles.summaryValue, { color: COLORS.success }]}>
          {formatIndianCurrency(totalProfit)}
        </Text>
      </View>

      <View style={[styles.summaryCard, { backgroundColor: "#FFEBEE" }]}>
        <Text style={styles.summaryLabel}>Total Loss</Text>
        <Text style={[styles.summaryValue, { color: COLORS.danger }]}>
          {formatIndianCurrency(totalLoss)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: "center",
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 8,
    textAlign: "center",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
  },
});
