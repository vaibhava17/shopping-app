import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/colorScheme";

import { SafeAreaView } from "react-native";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
              headerShown: false,
              tabBarButton: HapticTab,
              tabBarBackground: () => 0,
              tabBarStyle: Platform.select({
                ios: {
                  position: "absolute",
                },
                default: {},
              }),
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                tabBarIcon: ({ color }) => (
                  <Feather color={color} size={28} name={"home"} />
                ),
              }}
            />
            <Tabs.Screen
              name="user"
              options={{
                title: "User",
                tabBarIcon: ({ color }) => (
                  <Feather color={color} size={28} name={"user"} />
                ),
              }}
            />
          </Tabs>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
