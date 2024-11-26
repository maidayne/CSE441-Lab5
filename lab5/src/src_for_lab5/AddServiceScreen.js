import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import axios from 'axios';

const AddServiceScreen = ({ route }) => {
  const navigation = useNavigation();
  const { loginToken } = route.params; 
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    // Add listener when the screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {

    });

    return unsubscribe;
  }, [navigation]);

  const handleAddService = async () => {
    if (!name || !price) {
      Alert.alert('Error', 'Please enter both the service name and price.');
      return;
    }

    try {
      const response = await axios.post(
        'https://kami-backend-5rs0.onrender.com/services',
        { name, price: parseInt(price) },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );

      if (response.data) {
        Alert.alert('Success', 'Service added successfully!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Home');
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'Failed to add service.');
      }
    } catch (error) {
      console.log('Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Could not add service. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Service Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleAddService}>
        <Text style={styles.buttonText}>Add Service</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#ff6b6b',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddServiceScreen;
