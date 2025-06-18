import { defaultAnimations, defaultStyling } from "@/utils/constants";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";
import { useStore } from "../../store/useStore";
import { StatementCard } from "./StatementCard";

export function StatementList() {
  const hydrate = useStore((state) => state.hydrate);
  const statements = useStore((state) => state.statements);
  const removeStatement = useStore((state) => state.removeStatement);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Sort statements by selling time in descending order (newest first)
  const sortedStatements = [...statements].sort(
    (a, b) =>
      new Date(b.sellingTime).getTime() - new Date(a.sellingTime).getTime()
  );

  return (
    <Animated.View layout={defaultAnimations.layout} style={styles.container}>
      <FlatList
        data={sortedStatements}
        renderItem={({ item }) => (
          <StatementCard item={item} onDelete={removeStatement} />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No statements added yet</Text>
        }
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingVertical: defaultStyling.spacing,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 32,
  },
});
