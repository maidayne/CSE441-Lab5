import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

export default function TransactionDetailScreen({ route, navigation }) {
  const { transaction } = route.params;
  const [transactionGet, setTransactionGet] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTransaction = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://kami-backend-5rs0.onrender.com/transactions/${transaction._id}`);
      setTransactionGet(response.data);
    } catch (error) {
      setError("Error fetching transaction details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (transaction && transaction._id) {
      getTransaction();
    } else {
      setError("Invalid transaction ID.");
      setLoading(false);
    }
  }, [transaction]);

  useFocusEffect(
    useCallback(() => {
      if (transaction && transaction._id) {
        getTransaction();
      }
    }, [transaction])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff6b6b" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Calculate total amounts
  const totalAmount = transaction.services.reduce((sum, service) => {
    return sum + service.price * service.quantity;
  }, 0);
  const totalAmountWithDiscount = (totalAmount * 10) / 100;
  const finalTotalAmount = totalAmount - totalAmountWithDiscount;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.text}>Transaction Code: {transaction._id}</Text>
        <Text style={styles.text}>Customer: {transaction.customer.name}</Text>
        <Text style={styles.text}>Created At: {transaction.createdAt}</Text>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.sectionTitle}>Services List:</Text>

        {transaction.services.map((service, index) => (
          <View key={index} style={styles.serviceItem}>
            <Text style={styles.serviceText}>
              {service.name} x{service.quantity} - {service.price} VND
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.total}>Total: {totalAmount.toFixed(0)} VND</Text>
        <Text style={styles.discount}>Discount: {totalAmountWithDiscount.toFixed(0)} VND</Text>
        <Text style={styles.finalTotal}>Total Payment: {finalTotalAmount.toFixed(0)} VND</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    paddingBottom: 30,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF506C',
    marginTop: 5,
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  serviceItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceText: {
    fontSize: 14,
    color: '#555',
  },
  totalContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  total: {
    fontSize: 14,
    fontWeight: '300',
    color: '#000000',
    marginBottom: 8,
  },
  discount: {
    fontSize: 14,
    fontWeight: '250',
    color: '#1EA11D',
    marginBottom: 8,
  },
  finalTotal: {
    fontSize: 18,
    fontWeight: '400',
    color: '#007aff',
  },
  errorText: {
    fontSize: 18,
    color: '#ff3b30',
    textAlign: 'center',
    marginTop: 20,
  },
});
