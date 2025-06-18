import { COLORS, defaultAnimations } from "@/utils/constants";
import { ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { StockStatement } from "../../store/useStore";
import { formatIndianCurrency } from "../../utils/currencyFormat";
import { AnimatedPressable } from "../AnimatedPressable/AnimatedPressable";

interface StatementCardProps {
  item: StockStatement;
  onDelete: (id: string) => void;
}

const getCardStyle = (profitLoss: number) => {
  if (profitLoss > 0) {
    return {
      backgroundColor: "#E8F5E9",
      borderLeftColor: COLORS.success,
    };
  } else if (profitLoss < 0) {
    return {
      backgroundColor: "#FFEBEE",
      borderLeftColor: COLORS.danger,
    };
  }
  return {
    backgroundColor: "#F5F5F5",
    borderLeftColor: "#9E9E9E",
  };
};

const formatDateTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };
  return new Intl.DateTimeFormat("en-IN", options).format(date);
};

export function StatementCard({ item, onDelete }: StatementCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withSpring(isExpanded ? "180deg" : "0deg", {
            damping: 15,
            stiffness: 200,
          }),
        },
      ],
    };
  }, [isExpanded]);

  return (
    <Animated.View
      entering={defaultAnimations.entering}
      exiting={defaultAnimations.exiting}
      layout={defaultAnimations.layout}
      style={[styles.statementCard, getCardStyle(item.profitLoss)]}
    >
      <AnimatedPressable
        layout={defaultAnimations.layout}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text
              style={[
                styles.profitLoss,
                {
                  color: item.profitLoss >= 0 ? COLORS.success : COLORS.danger,
                },
              ]}
            >
              {item.profitLoss >= 0 ? "Profit" : "Loss"}:{" "}
              {formatIndianCurrency(Math.abs(item.profitLoss))}
            </Text>
          </View>
          <Animated.View style={[styles.chevronContainer, chevronStyle]}>
            <ChevronDown size={20} color={COLORS.text} />
          </Animated.View>
        </View>
      </AnimatedPressable>

      {isExpanded && (
        <Animated.View
          entering={defaultAnimations.entering}
          exiting={defaultAnimations.exiting}
          layout={defaultAnimations.layout}
        >
          <View style={styles.details}>
            <View style={styles.row}>
              <Text style={styles.label}>Buying Price:</Text>
              <Text style={styles.value}>
                {formatIndianCurrency(item.buyingPrice)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Selling Price:</Text>
              <Text style={styles.value}>
                {formatIndianCurrency(item.sellingPrice)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Quantity:</Text>
              <Text style={styles.value}>{item.quantity}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Buying Time:</Text>
              <Text style={styles.value}>
                {formatDateTime(item.buyingTime)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Selling Time:</Text>
              <Text style={styles.value}>
                {formatDateTime(item.sellingTime)}
              </Text>
            </View>
          </View>

          <AnimatedPressable
            layout={defaultAnimations.layout}
            onPress={() => onDelete(item.id)}
          >
            <View style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </View>
          </AnimatedPressable>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  statementCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  symbol: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  chevronContainer: {
    marginLeft: 8,
  },
  details: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
  },
  profitLoss: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: 16,
    padding: 8,
    backgroundColor: COLORS.danger,
    borderRadius: 6,
    alignItems: "center",
  },
  deleteButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
});
