import { Plus, X } from "lucide-react-native";
import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { COLORS, defaultAnimations, defaultStyling } from "@/utils/constants";
import { AnimatedPressable } from "../AnimatedPressable/AnimatedPressable";
import { StatementForm } from "./StatementForm";

export function FormToggle() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  function onToggle() {
    setIsFormVisible(!isFormVisible);
  }

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withSpring(isFormVisible ? "45deg" : "0deg", {
            damping: 15,
            stiffness: 200,
          }),
        },
      ],
      backgroundColor: withTiming(
        isFormVisible ? COLORS.danger : COLORS.primary,
        { duration: 300 }
      ),
    };
  }, [isFormVisible]);

  return (
    <Animated.View layout={defaultAnimations.layout}>
      <AnimatedPressable
        entering={defaultAnimations.entering}
        exiting={defaultAnimations.exiting}
        layout={defaultAnimations.layout}
        onPress={onToggle}
      >
        <Animated.View style={[styles.buttonContainer, buttonStyle]}>
          {isFormVisible ? (
            <X size={24} color={COLORS.white} />
          ) : (
            <>
              <Plus size={24} color={COLORS.white} />
              <Text style={styles.buttonLabel}>Add Statement</Text>
            </>
          )}
        </Animated.View>
      </AnimatedPressable>

      {isFormVisible && (
        <KeyboardAvoidingView>
          <StatementForm onClose={onToggle} />
        </KeyboardAvoidingView>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: defaultStyling.spacing / 2,
    padding: defaultStyling.spacing,
    borderRadius: defaultStyling.borderRadius - defaultStyling.spacing / 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: defaultStyling.spacing / 2,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonLabel: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: "600",
  },
});
