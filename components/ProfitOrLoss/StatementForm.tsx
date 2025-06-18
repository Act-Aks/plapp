import { useStore } from "@/store/useStore";
import { COLORS, defaultAnimations, defaultStyling } from "@/utils/constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { AnimatedPressable } from "../AnimatedPressable/AnimatedPressable";

interface FormData {
  symbol: string;
  buyingPrice: string;
  sellingPrice: string;
  quantity: string;
  buyingTime: Date;
  sellingTime: Date;
}

const initialFormData: FormData = {
  symbol: "",
  buyingPrice: "",
  sellingPrice: "",
  quantity: "",
  buyingTime: new Date(),
  sellingTime: new Date(),
};

export function StatementForm({ onClose }: { onClose: () => void }) {
  const addStatement = useStore((state) => state.addStatement);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showBuyingPicker, setShowBuyingPicker] = useState(false);
  const [showSellingPicker, setShowSellingPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");

  const updateFormData = (field: keyof FormData, value: string | Date) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateTimeChange = (
    event: any,
    selectedDate?: Date,
    isBuying: boolean = true
  ) => {
    if (Platform.OS === "android") {
      setShowBuyingPicker(false);
      setShowSellingPicker(false);
    }

    if (event.type === "dismissed") {
      return;
    }

    if (selectedDate) {
      const field = isBuying ? "buyingTime" : "sellingTime";
      const currentDate = formData[field];

      if (pickerMode === "date") {
        // Update date while keeping current time
        const newDate = new Date(selectedDate);
        newDate.setHours(currentDate.getHours());
        newDate.setMinutes(currentDate.getMinutes());
        updateFormData(field, newDate);
      } else {
        // Update time while keeping current date
        const newDate = new Date(currentDate);
        newDate.setHours(selectedDate.getHours());
        newDate.setMinutes(selectedDate.getMinutes());
        updateFormData(field, newDate);
      }
    }
  };

  const showDateTimePicker = (isBuying: boolean = true) => {
    setPickerMode("date");
    if (isBuying) {
      setShowBuyingPicker(true);
    } else {
      setShowSellingPicker(true);
    }
  };

  const showTimePicker = (isBuying: boolean = true) => {
    setPickerMode("time");
    if (isBuying) {
      setShowBuyingPicker(true);
    } else {
      setShowSellingPicker(true);
    }
  };

  function onAddStatement() {
    if (
      !formData.symbol ||
      !formData.buyingPrice ||
      !formData.sellingPrice ||
      !formData.quantity
    )
      return;

    addStatement({
      symbol: formData.symbol,
      buyingPrice: parseFloat(formData.buyingPrice),
      sellingPrice: parseFloat(formData.sellingPrice),
      quantity: parseInt(formData.quantity),
      buyingTime: formData.buyingTime.toISOString(),
      sellingTime: formData.sellingTime.toISOString(),
    });

    // Reset form
    setFormData(initialFormData);
    onClose();
  }

  return (
    <Animated.View
      layout={defaultAnimations.layout}
      entering={SlideInDown.springify().damping(15).stiffness(100).mass(0.5)}
      exiting={SlideOutDown.springify().damping(15).stiffness(100).mass(0.5)}
      style={styles.container}
    >
      <ScrollView>
        <Text style={styles.title}>Add Statement</Text>

        <TextInput
          style={styles.input}
          placeholder="Stock Symbol"
          value={formData.symbol}
          onChangeText={(value) => updateFormData("symbol", value)}
          placeholderTextColor="#666"
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Buying Details</Text>

          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Buying Price"
                value={formData.buyingPrice}
                onChangeText={(value) => updateFormData("buyingPrice", value)}
                keyboardType="numeric"
                placeholderTextColor="#666"
              />
            </View>

            <AnimatedPressable
              layout={defaultAnimations.layout}
              onPress={() => showDateTimePicker(true)}
            >
              <View style={styles.dateTimeButton}>
                <Text style={styles.dateTimeButtonText}>📅 Date</Text>
                <Text style={styles.selectedValue}>
                  {formData.buyingTime.toLocaleDateString("en-IN")}
                </Text>
              </View>
            </AnimatedPressable>

            <AnimatedPressable
              layout={defaultAnimations.layout}
              onPress={() => showTimePicker(true)}
            >
              <View style={styles.dateTimeButton}>
                <Text style={styles.dateTimeButtonText}>🕐 Time</Text>
                <Text style={styles.selectedValue}>
                  {formData.buyingTime.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </Text>
              </View>
            </AnimatedPressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selling Details</Text>

          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Selling Price"
                value={formData.sellingPrice}
                onChangeText={(value) => updateFormData("sellingPrice", value)}
                keyboardType="numeric"
                placeholderTextColor="#666"
              />
            </View>

            <AnimatedPressable
              layout={defaultAnimations.layout}
              onPress={() => showDateTimePicker(false)}
            >
              <View style={styles.dateTimeButton}>
                <Text style={styles.dateTimeButtonText}>📅 Date</Text>
                <Text style={styles.selectedValue}>
                  {formData.sellingTime.toLocaleDateString("en-IN")}
                </Text>
              </View>
            </AnimatedPressable>

            <AnimatedPressable
              layout={defaultAnimations.layout}
              onPress={() => showTimePicker(false)}
            >
              <View style={styles.dateTimeButton}>
                <Text style={styles.dateTimeButtonText}>🕐 Time</Text>
                <Text style={styles.selectedValue}>
                  {formData.sellingTime.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </Text>
              </View>
            </AnimatedPressable>
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={formData.quantity}
          onChangeText={(value) => updateFormData("quantity", value)}
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
      </ScrollView>

      {showBuyingPicker && (
        <DateTimePicker
          value={formData.buyingTime}
          mode={pickerMode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) =>
            handleDateTimeChange(event, selectedDate, true)
          }
        />
      )}

      {showSellingPicker && (
        <DateTimePicker
          value={formData.sellingTime}
          mode={pickerMode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) =>
            handleDateTimeChange(event, selectedDate, false)
          }
        />
      )}
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
  section: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: COLORS.text,
  },
  dateTimeContainer: {
    marginBottom: 12,
  },
  dateTimeLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: COLORS.text,
  },
  dateTimeButtons: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  dateTimeButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    minHeight: 60,
  },
  dateTimeButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 4,
  },
  selectedValue: {
    fontSize: 12,
    color: COLORS.textLight,
    fontStyle: "italic",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: COLORS.text,
  },
});
