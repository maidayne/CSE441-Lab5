import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


import Login from './src/src_for_lab5/Login';

import ServiceListScreen from './src/src_for_lab5/ServiceListScreen';
import AddServiceScreen from './src/src_for_lab5/AddServiceScreen';
import ServiceDetailScreen from './src/src_for_lab5/ServiceDetailScreen';

import TransactionListScreen from './src/src_for_lab6/TransactionListScreen';
import TransactionDetailScreen from './src/src_for_lab6/TransactionDetailScreen';

import Setting from './src/src_for_lab6/Setting';

import CustomerListScreen from './src/src_for_lab6/CustomerListScreen';
import AddCustomerScreen from './src/src_for_lab6/AddCustomerScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Define User interface
interface User {
  token?: string;
}

// Define Props for TabNavigator
interface TabNavigatorProps {
  setUser: (user: User) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({ setUser, setIsLoggedIn }) => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={ServiceListScreen}
      options={{ title: 'Danh sách dịch vụ' }}
    />
    <Tab.Screen name="Transaction" component={TransactionListScreen} />
    {/* <Tab.Screen name="Customer" component={CustomerListScreen} /> */}

    <Stack.Screen
      name="Customer"
      component={CustomerListScreen}
      options={{
        title: 'Customer',
        headerRight: () => (
          <TouchableOpacity
            onPress={() => Alert.alert('Menu', '3-dot menu clicked')}
            style={{ marginRight: 15 }}
          >
            <Icon name="bar" size={24} color="black" />
          </TouchableOpacity>
        ),
      }}
    />

    <Tab.Screen
      name="Setting"
      component={Setting}
      initialParams={{ setUser, setIsLoggedIn }}
    />
  </Tab.Navigator>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>({});

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* If not logged in, show the Login screen; otherwise, show the main app */}
        {!isLoggedIn ? (
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {(props) => <Login {...props} onLoginSuccess={handleLoginSuccess} setUser={setUser} />}
          </Stack.Screen>
        ) : (
          <>
            {/* Main Tab Navigator */}
            <Stack.Screen
              name="Main"
              options={{ headerShown: false }}
            >
              {(props) => (
                <TabNavigator
                  {...props}
                  setUser={setUser}
                  setIsLoggedIn={setIsLoggedIn}
                />
              )}
            </Stack.Screen>

            {/* Other screens */}
            <Stack.Screen
              name="AddService"
              component={AddServiceScreen}
              initialParams={{ loginToken: user?.token }}
              options={{ title: 'Add Service' }}
            />
            <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={{ title: 'Service Detail' }} />

            <Stack.Screen
              name="AddCustomer"
              component={AddCustomerScreen}
              initialParams={{ loginToken: user?.token }}
              options={{ title: 'Add Customer' }}
            />

            <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} options={{ title: 'Transaction Detail' }} />

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
