import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AddCustomerScreen = ({ route }) => {
  const navigation = useNavigation();
  const { loginToken } = route.params || {}; // Ensure route.params exists
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    console.log('Login Token:', loginToken);
  }, [loginToken]);

  const handleAddCustomer = async () => {
    if (!name || !phone) {
      Alert.alert('Error', 'Please enter both the customer name and phone.');
      return;
    }

    if (!loginToken) {
      Alert.alert('Error', 'Login token is missing.');
      return;
    }

    try {
      const response = await axios.post(
        'https://kami-backend-5rs0.onrender.com/customers',
        { name, phone },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );

      if (response.data) {
        Alert.alert('Success', 'Customer added successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Customer'),
          },
        ]);
      } else {
        Alert.alert('Error', 'Failed to add customer.');
      }
    } catch (error) {
      console.log('Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Could not add customer. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Customer Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType='phone-pad'
      />
      <TouchableOpacity style={styles.button} onPress={handleAddCustomer}>
        <Text style={styles.buttonText}>Add Customer</Text>
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

export default AddCustomerScreen;
