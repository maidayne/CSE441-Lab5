import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ServiceDetailScreen = ({ route, navigation }) => {
    const { service } = route.params;
    const [serviceGet, setServiceGet] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch service details
    const getService = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://kami-backend-5rs0.onrender.com/services/${service._id}`);
            setServiceGet(response.data);
        } catch (error) {
            setError("Error fetching service details. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch on mount
    useEffect(() => {
        if (service && service._id) {
            getService();
        } else {
            setError("Invalid service ID.");
            setLoading(false);
        }
    }, [service]);

    // Refetch data when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            if (service && service._id) {
                getService();
            }
        }, [service])
    );

    // Handle delete action
    const handleDeleteService = () => {
        Alert.alert(
            'Delete Service',
            'Are you sure you want to delete this service?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const response = await axios.delete(
                                `https://kami-backend-5rs0.onrender.com/services/${service._id}`,
                                { headers: { Authorization: `Bearer ${service.token}` } }
                            );
                            if (response.status === 200) {
                                Alert.alert('Success', 'Service deleted successfully!');
                                navigation.goBack(); // Navigate back to the previous screen
                            } else {
                                Alert.alert('Error', 'Failed to delete service.');
                            }
                        } catch (error) {
                            console.error("Error deleting service:", error);
                            Alert.alert('Error', 'Could not delete service. Please try again.');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    // Loading state
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#ff6b6b" />
            </View>
        );
    }

    // Error state
    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.label}>Service Name: {serviceGet.name}</Text>
                <TouchableOpacity onPress={handleDeleteService} style={styles.menuButton}>
                    <Ionicons name="ios-more" size={24} color="gray" />
                </TouchableOpacity>
            </View>
            
            <Text style={styles.label}>Price: {serviceGet.price}</Text>
            <Text style={styles.label}>Creator Name: {serviceGet.user?.name}</Text>
            <Text style={styles.label}>Created At: {new Date(serviceGet.createdAt).toLocaleString()}</Text>
            <Text style={styles.label}>Last Updated At: {new Date(serviceGet.updatedAt).toLocaleString()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        color: '#333',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    menuButton: {
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});

export default ServiceDetailScreen;
