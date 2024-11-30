import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  ListRenderItem,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { addItem, removeItem, toggleComplete } from '@/store/shoppingListSlice';
import { ShoppingItem } from '@/types';
import { styles } from '@/styles/screens';

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

export default ShoppingList;