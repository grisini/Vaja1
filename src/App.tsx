import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddEmployeeScreen from './screens/AddEmployeeScreen';
import EmployeeDetailScreen from './screens/EmployeeDetailScreen';

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  email: string;
};

export type RootStackParamList = {
  Home: undefined;
  AddEmployee: undefined;
  EmployeeDetail: { employee: Employee };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString(),
    };
    setEmployees([...employees, newEmployee]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} employees={employees} />}
        </Stack.Screen>
        <Stack.Screen name="AddEmployee">
          {(props) => <AddEmployeeScreen {...props} onSave={addEmployee} />}
        </Stack.Screen>
        <Stack.Screen name="EmployeeDetail" component={EmployeeDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
