// src/screens/ShoppingList.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  ListRenderItem,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { addItem, removeItem, toggleComplete } from '../store/shoppingListSlice';
import { ShoppingItem } from '../types';

const ShoppingList: React.FC = () => {
  const [itemName, setItemName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const items = useAppSelector(state => state.shoppingList.items);
  const dispatch = useAppDispatch();

  const handleAddItem = (): void => {
    if (itemName.trim() === '') {
      Alert.alert('Error', 'Please enter an item name');
      return;
    }

    dispatch(addItem({
      name: itemName,
      quantity: quantity || '1',
    }));

    setItemName('');
    setQuantity('');
  };

  const renderItem: ListRenderItem<ShoppingItem> = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => dispatch(toggleComplete(item.id))}
    >
      <View style={styles.itemContent}>
        <Text style={[
          styles.itemName,
          item.completed && styles.completedText
        ]}>
          {item.name} (x{item.quantity})
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => dispatch(removeItem(item.id))}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Item name"
          value={itemName}
          onChangeText={setItemName}
        />
        <TextInput
          style={[styles.input, styles.quantityInput]}
          placeholder="Qty"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddItem}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList<ShoppingItem>
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 2,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  quantityInput: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ShoppingList;