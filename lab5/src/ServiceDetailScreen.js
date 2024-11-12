import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const ServiceDetailScreen = ({ route }) => {
    const { service } = route.params;
    const [serviceGet, setServiceGet] = useState({});
    const [creatorName, setCreatorName] = useState('');

    // Fetch service details
    const getService = async () => {
        try {
            const response = await axios.get(`https://kami-backend-5rs0.onrender.com/services/${service._id}`);
            setServiceGet(response.data);

            // Fetch creator's name
            if (response.data.createdBy) {
                const creatorResponse = await axios.get(`https://kami-backend-5rs0.onrender.com/users/${response.data.createdBy}`);
                setCreatorName(creatorResponse.data.name);  // Assuming creator response includes a 'name' field
            }
        } catch (error) {
            console.error("Error fetching service or creator data:", error);
        }
    };

    useEffect(() => {
        getService();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getService();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Service name: {serviceGet.name}</Text>
            <Text style={styles.label}>Price: {serviceGet.price}</Text>
            <Text style={styles.label}>Creator Name: {creatorName}</Text>
            <Text style={styles.label}>Created At: {serviceGet.createdAt}</Text>
            <Text style={styles.label}>Last Updated At: {serviceGet.updatedAt}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
    },
});

export default ServiceDetailScreen;
