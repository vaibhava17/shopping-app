import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 2,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  quantityInput: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  item: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#666",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export { styles };
