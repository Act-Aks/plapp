import { COLORS } from "@/utils/constants";
import { formatIndianCurrency } from "@/utils/currencyFormat";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  SlideInUp,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface FinalResultCardProps {
  netResult: number;
  showResult: boolean;
}

export function FinalResultCard({
  netResult,
  showResult,
}: FinalResultCardProps) {
  const resultStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(showResult ? 1 : 0.8, {
            damping: 15,
            stiffness: 200,
          }),
        },
      ],
    };
  }, [showResult]);

  if (!showResult) return null;

  return (
    <Animated.View
      entering={SlideInUp.springify().damping(15).stiffness(200).mass(0.5)}
      style={[styles.resultContainer, resultStyle]}
    >
      <View
        style={[
          styles.resultCard,
          {
            backgroundColor: netResult >= 0 ? "#E8F5E9" : "#FFEBEE",
            borderLeftColor: netResult >= 0 ? COLORS.success : COLORS.danger,
          },
        ]}
      >
        <Text style={styles.resultLabel}>Final Net Earnings</Text>
        <Text
          style={[
            styles.resultValue,
            {
              color: netResult >= 0 ? COLORS.success : COLORS.danger,
            },
          ]}
        >
          {formatIndianCurrency(Math.abs(netResult))}
        </Text>
        <Text
          style={[
            styles.resultType,
            {
              color: netResult >= 0 ? COLORS.success : COLORS.danger,
            },
          ]}
        >
          {netResult >= 0 ? "NET PROFIT" : "NET LOSS"}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    marginBottom: 24,
  },
  resultCard: {
    backgroundColor: COLORS.white,
    padding: 24,
    borderRadius: 12,
    borderLeftWidth: 4,
    alignItems: "center",
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultLabel: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 12,
  },
  resultValue: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  resultType: {
    fontSize: 18,
    fontWeight: "600",
  },
});
