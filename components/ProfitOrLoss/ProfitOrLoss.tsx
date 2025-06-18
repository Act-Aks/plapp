import { router } from "expo-router";
import { Calculator } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { FormToggle } from "./FormToggle";
import { StatementList } from "./StatementList";

const COLORS = {
  primary: "#2563EB",
  primaryLight: "#3B82F6",
  success: "#059669",
  danger: "#DC2626",
  background: "#F8FAFC",
  text: "#1E293B",
  textLight: "#64748B",
  white: "#FFFFFF",
};

export function ProfitOrLoss() {
  const handleNavigateToCalculate = () => {
    router.push("/calculateEarnings");
  };

  return (
    <View style={styles.container}>
      <FormToggle />
      <StatementList />

      {/* Floating Action Button for Calculate Earnings */}
      <Animated.View
        entering={FadeIn.springify().damping(15).stiffness(200).mass(0.5)}
        style={styles.fabContainer}
      >
        <TouchableOpacity
          style={styles.fab}
          onPress={handleNavigateToCalculate}
          activeOpacity={0.8}
        >
          <Calculator size={24} color={COLORS.white} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  fabContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.success,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
