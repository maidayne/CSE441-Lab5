import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

export default function TransactionListScreen({ navigation }) {
  const [transactions, setTransactions] = useState([{}]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://kami-backend-5rs0.onrender.com/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  // Fetch data once when the component mounts
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Refetch data every time the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchTransactions();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
    >
      <Text style={styles.code}>Code: {item._id}</Text>
      <Text >Customer: {item.customer ? item.customer.name : 'N/A'}</Text>
      <Text>Created At: {item.createdAt}</Text>
      {Array.isArray(item.services) && item.services.length > 0 ? (
        item.services.map((service) => (
          <Text key={service.id} style={styles.service}>
            Services: {service.name}
          </Text>
        ))
      ) : (
        <Text style={styles.service}>No services available</Text>
      )}
    <Text style={styles.amount}>Total: {item.price} đ</Text>
      <Text style={styles.status}>{item.status === 'Cancelled' ? 'Cancelled' : 'Completed'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  code: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  service: {
    color: '#000000',
    fontWeight: '200',
    fontSize: 14,
  },
  amount: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  status: {
    marginTop: 5,
    color: '#269143',
    fontWeight: '600',
  },
});