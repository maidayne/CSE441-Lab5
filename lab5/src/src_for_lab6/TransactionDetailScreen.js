import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function TransactionDetail({ route }) {
  const { transactionId } = route.params;
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    axios
      .get('https://kami-backend-5rs0.onrender.com/transactions/${transactionId}')
      .then((response) => setTransaction(response.data))
      .catch((error) => console.error(error));
  }, [transactionId]);

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction Detail</Text>
      <Text style={styles.text}>Transaction Code: {transaction._id}</Text>
      <Text style={styles.text}>Customer: {transaction.customerName}</Text>
      <Text style={styles.text}>Created At: {transaction.createdAt}</Text>

      <Text style={styles.sectionTitle}>Services:</Text>
      {transaction.services.map((service, index) => (
        <Text key={index} style={styles.serviceItem}>
          {service.name} x{service.quantity} - {service.price} đ
        </Text>
      ))}

      <Text style={styles.total}>Total: {transaction.total} đ</Text>
      <Text style={styles.discount}>Discount: {transaction.discount} đ</Text>
      <Text style={styles.finalTotal}>Total Payment: {transaction.finalTotal} đ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  serviceItem: {
    fontSize: 14,
    color: '#666',
    marginVertical: 3,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
  },
  discount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff3b30',
    marginTop: 5,
  },
  finalTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007aff',
    marginTop: 10,
  },
});