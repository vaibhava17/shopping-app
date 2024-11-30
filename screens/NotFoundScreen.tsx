import React from "react";
import { View, Text } from "react-native";
import { styles } from "@/styles/screens";

const NotFound: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Oops!!! This screen doesn't exist. Go to home screen!
      </Text>
    </View>
  );
};

export default NotFound;
