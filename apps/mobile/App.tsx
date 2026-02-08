import React from "react";
import { Text, View } from "react-native";
import type { ApiHealth } from "@focusquadrant/shared";
import { useAppConfig } from "./src/app/useAppConfig";
import { BootScreen } from "./src/screens/BootScreen";

const fallbackHealth: ApiHealth = { ok: true };

export default function App() {
  const configState = useAppConfig();

  if (configState.status === "loading") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (configState.status === "error") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Config error: {configState.message}</Text>
      </View>
    );
  }

  return (
    <BootScreen
      apiBaseUrl={configState.config.apiBaseUrl}
      healthOk={fallbackHealth.ok}
    />
  );
}
