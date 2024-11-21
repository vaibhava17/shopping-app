import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const ProfileCard = () => {
  const [likes, setLikes] = useState(0);

  const handleLikePress = () => {
    setLikes((prev) => prev + 1);
    Alert.alert("Liked!", `Total likes: ${likes + 1}`);
  };

  return (
    <View style={styles.card}>
      {/* Profile Image */}
      <Image
        source={{
          uri: "https://placekitten.com/200/200",
        }}
        style={styles.image}
      />

      {/* Profile Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.role}>Full Stack Developer</Text>

        {/* Bio */}
        <Text style={styles.bio}>
          React Native enthusiast, coffee lover, and code ninja
        </Text>

        {/* Like Button */}
        <TouchableOpacity style={styles.likeButton} onPress={handleLikePress}>
          <Text style={styles.likeButtonText}>❤️ Like ({likes})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android shadow
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
  },
  infoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  role: {
    fontSize: 18,
    color: "#666",
    marginTop: 5,
  },
  bio: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  likeButton: {
    backgroundColor: "#ff4d4d",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  likeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileCard;
