import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { store } from "@/store/store";
import ShoppingList from "@/screens/ShoppingList";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          <ShoppingList />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
