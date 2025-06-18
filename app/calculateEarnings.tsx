import { AnimatedPressable } from "@/components/AnimatedPressable/AnimatedPressable";
import { CalculateButton } from "@/components/CalculateEarnings/CalculateButton";
import { ChargesInput } from "@/components/CalculateEarnings/ChargesInput";
import { FinalResultCard } from "@/components/CalculateEarnings/FinalResultCard";
import { NetResultCard } from "@/components/CalculateEarnings/NetResultCard";
import { SummaryCards } from "@/components/CalculateEarnings/SummaryCards";
import { COLORS, defaultAnimations } from "@/utils/constants";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "../store/useStore";

export default function CalculateEarnings() {
  const statements = useStore((state) => state.statements);
  const [charges, setCharges] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [netResult, setNetResult] = useState(0);

  // Calculate totals from statements
  const totalProfit = statements
    .filter((s) => s.profitLoss > 0)
    .reduce((sum, s) => sum + s.profitLoss, 0);

  const totalLoss = statements
    .filter((s) => s.profitLoss < 0)
    .reduce((sum, s) => sum + Math.abs(s.profitLoss), 0);

  const netProfitLoss = totalProfit - totalLoss;
  const totalStatements = statements.length;

  const handleCalculate = () => {
    const chargesAmount = parseFloat(charges) || 0;
    const finalResult = netProfitLoss - chargesAmount;
    setNetResult(finalResult);
    setShowResult(true);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <AnimatedPressable
          layout={defaultAnimations.layout}
          style={styles.backButton}
          onPress={handleGoBack}
        >
          <ArrowLeft size={24} color={COLORS.text} />
        </AnimatedPressable>
        <Text style={styles.headerTitle}>Calculate Earnings</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <SummaryCards
          totalStatements={totalStatements}
          totalProfit={totalProfit}
          totalLoss={totalLoss}
        />

        <NetResultCard netProfitLoss={netProfitLoss} />

        <ChargesInput charges={charges} onChargesChange={setCharges} />

        <CalculateButton onPress={handleCalculate} />

        <FinalResultCard netResult={netResult} showResult={showResult} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    elevation: 2,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
});
