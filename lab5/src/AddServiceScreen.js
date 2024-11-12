import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddServiceScreen = ({ route }) => {
    const { v4: uuidv4 } = require('uuid');
    const [serviceName, setServiceName] = useState('');
    const [price, setPrice] = useState('');
    const { user } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Service name *</Text>
            <TextInput
                style={styles.input}
                placeholder="Input a service name"
                value={serviceName}
                onChangeText={setServiceName}
            />
            <Text style={styles.label}>Price *</Text>
            <TextInput
                style={styles.input}
                placeholder="0"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
            />
            <Button title="Add" color="#ff4081" onPress={() => {
                const generateUUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    const r = (Math.random() * 16) | 0;
                    const v = c === 'x' ? r : (r & 0x3) | 0x8;
                    return v.toString(16);
                  });
                  ;
                const response = axios.put(
                    "https://kami-backend-5rs0.onrender.com/services/id",
                    {
                        'id': generateUUID(),
                        'name': serviceName,
                        'price': price,
                        'login token': user.token,
                    }
                )
                response.then(res => {
                    console.log(res.data);
                    console.log('Thêm dịch vụ thành công!');
                    navigation.goBack();
                }).catch(error => {
                    console.log('Thêm dịch vụ thất bại!');
                    console.error("add service",error);
                });
            }} />
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
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
});

export default AddServiceScreen;
