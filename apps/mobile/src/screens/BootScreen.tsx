import React from "react";
import { Text, View } from "react-native";

/** Props for BootScreen. */
export type BootScreenProps = {
  apiBaseUrl: string;
  healthOk: boolean;
};

/** Boot screen for initial wiring checks. */
export function BootScreen({ apiBaseUrl, healthOk }: BootScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>FocusQuadrant</Text>
      <Text>API: {apiBaseUrl}</Text>
      <Text>Shared health ok: {healthOk ? "true" : "false"}</Text>
    </View>
  );
}
