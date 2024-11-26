import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';


const ServiceListScreen = ({ navigation }) => {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchService = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://kami-backend-5rs0.onrender.com/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data once when the component mounts
  useEffect(() => {
    fetchService();
  }, []);

  // Refetch data every time the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchService();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <TouchableOpacity style={styles.serviceItem} onPress={() => navigation.navigate('ServiceDetail', { service: item })}>
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.servicePrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
      <IconButton
        icon="plus-circle"
        size={30}
        style={styles.addButton}
        onPress={() => navigation.navigate('AddService')}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
  },
  servicePrice: {
    fontSize: 16,
    color: '#888',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ff4081',
    borderRadius: 50,
  },
});

export default ServiceListScreen;
