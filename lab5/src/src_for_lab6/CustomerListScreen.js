import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useEffect, useState, } from 'react';
import { useFocusEffect } from '@react-navigation/native';


const CustomerListScreen = ({ navigation }) => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://kami-backend-5rs0.onrender.com/customers");
            setCustomers(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data once when the component mounts
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Refetch data every time the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            fetchCustomers();
        }, [])
    );

    const renderItem = ({ item }) => (
        <View style={styles.customerCard}>
            <View style={styles.customerInfo}>
                <Text style={styles.customerName}>Customer: {item.name}</Text>
                <Text style={styles.customerDetail}>Phone: {item.phone}</Text>
                <Text style={styles.customerDetail}>Total money: {item.totalSpent}</Text>
            </View>
            <View style={styles.customerStatus}>
                <Text style={styles.statusText}>{item.status}</Text>
                <Icon name="crown" size={24} color="#ff4d4d" />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={customers}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddCustomer')}
            >
                <Icon name="add" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    listContent: { padding: 10 },
    customerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    customerInfo: { flex: 1 },
    customerName: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    customerDetail: { fontSize: 14, color: '#555' },
    customerStatus: { alignItems: 'center', justifyContent: 'center' },
    statusText: { fontSize: 14, color: '#ff6b6b', marginBottom: 5 },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#ff6b6b',
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CustomerListScreen;
