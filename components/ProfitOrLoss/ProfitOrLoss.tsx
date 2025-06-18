import { StyleSheet, View } from "react-native";
import { FormToggle } from "./FormToggle";
import { StatementList } from "./StatementList";

export function ProfitOrLoss() {
  return (
    <View style={styles.container}>
      <FormToggle />
      <StatementList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
});
