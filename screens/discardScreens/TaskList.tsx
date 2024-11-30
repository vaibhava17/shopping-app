import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableOpacity,
  Alert,
} from "react-native";

const TaskItem = ({ task, onDelete, onComplete }) => {
  // Animation values
  const swipeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Pan responder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        // Only allow horizontal swipe
        if (Math.abs(gesture.dx) > Math.abs(gesture.dy)) {
          swipeAnim.setValue(gesture.dx);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        // If swipe is more than 120px, trigger delete
        if (gesture.dx < -120) {
          Animated.timing(swipeAnim, {
            toValue: -1000,
            duration: 300,
            useNativeDriver: true,
          }).start(() => onDelete(task.id));
        } else {
          // Reset position
          Animated.spring(swipeAnim, {
            toValue: 0,
            tension: 40,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderGrant: () => {
        // Scale down slightly when touched
        Animated.spring(scaleAnim, {
          toValue: 0.95,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  // Animation for task completion
  const handleComplete = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onComplete(task.id));
  };

  return (
    <Animated.View
      style={[
        styles.taskContainer,
        {
          transform: [{ translateX: swipeAnim }, { scale: scaleAnim }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity style={styles.taskContent} onPress={handleComplete}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskDescription}>{task.description}</Text>
      </TouchableOpacity>

      {/* Background delete view (revealed on swipe) */}
      <View style={styles.deleteBackground}>
        <Text style={styles.deleteText}>Delete</Text>
      </View>
    </Animated.View>
  );
};

const TaskList = () => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Learn React Native",
      description: "Master animations and gestures",
    },
    {
      id: "2",
      title: "Build Project",
      description: "Create a task management app",
    },
    // Add more tasks as needed
  ]);

  const handleDelete = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    Alert.alert("Task Deleted");
  };

  const handleComplete = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    Alert.alert("Task Completed! 🎉");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Tasks</Text>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={handleDelete}
          onComplete={handleComplete}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  taskContainer: {
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  taskContent: {
    padding: 20,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  deleteBackground: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: "#ff4444",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TaskList;
