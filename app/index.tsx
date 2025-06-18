import { ProfitOrLoss } from "@/components/ProfitOrLoss/ProfitOrLoss";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ProfitOrLoss />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
