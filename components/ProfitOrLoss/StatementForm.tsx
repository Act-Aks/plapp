import { COLORS, defaultAnimations, defaultStyling } from "@/utils/constants";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useStore } from "../../store/useStore";
import { AnimatedPressable } from "../AnimatedPressable/AnimatedPressable";

export function StatementForm({ onClose }: { onClose: () => void }) {
  const addStatement = useStore((state) => state.addStatement);
  const [symbol, setSymbol] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  function onAddStatement() {
    if (!symbol || !buyingPrice || !sellingPrice || !quantity) return;

    addStatement({
      symbol,
      buyingPrice: parseFloat(buyingPrice),
      sellingPrice: parseFloat(sellingPrice),
      quantity: parseInt(quantity),
      timestamp: new Date().toISOString(),
    });

    // Reset form
    setSymbol("");
    setBuyingPrice("");
    setSellingPrice("");
    setQuantity("");

    onClose();
  }

  return (
    <Animated.View
      layout={defaultAnimations.layout}
      entering={SlideInDown.springify().damping(15).stiffness(100).mass(0.5)}
      exiting={SlideOutDown.springify().damping(15).stiffness(100).mass(0.5)}
      style={styles.container}
    >
      <Text style={styles.title}>Add Statement</Text>

      <TextInput
        style={styles.input}
        placeholder="Stock Symbol"
        value={symbol}
        onChangeText={setSymbol}
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        placeholder="Buying Price"
        value={buyingPrice}
        onChangeText={setBuyingPrice}
        keyboardType="numeric"
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        placeholder="Selling Price"
        value={sellingPrice}
        onChangeText={setSellingPrice}
        keyboardType="numeric"
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        placeholderTextColor="#666"
      />

      <AnimatedPressable
        layout={defaultAnimations.layout}
        onPress={onAddStatement}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Add Statement</Text>
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: defaultStyling.borderRadius,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
