import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import AddEmployeeScreen from './screens/AddEmployeeScreen';
import EmployeeDetailScreen from './screens/EmployeeDetailScreen';
import * as Database from './database/database';

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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initDatabase();
  }, []);

  useEffect(() => {
    if (isReady) {
      loadEmployees();
    }
  }, [isReady]);

  const initDatabase = async () => {
    try {
      await Database.migrateDbIfNeeded();
      setIsReady(true);
    } catch (error) {
      console.error('Database initialization error:', error);
      setIsReady(true);
    }
  };

  const loadEmployees = async () => {
    try {
      const allEmployees = await Database.getAllEmployees();
      setEmployees(allEmployees);
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  };

  const addEmployee = async (employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString(),
    };
    setEmployees(prev => [...prev, newEmployee]);
    Database.addEmployee(newEmployee);
  };

  const deleteEmployee = async (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    Database.deleteEmployee(id);
  };

  const clearAll = async () => {
    setEmployees([]);
    Database.clearAllEmployees();
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: 'Employees' }}>
          {(props) => (
            <HomeScreen 
              {...props} 
              employees={employees} 
              onDelete={deleteEmployee}
              onClearAll={clearAll}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddEmployee" options={{ title: 'Add Employee' }}>
          {(props) => <AddEmployeeScreen {...props} onSave={addEmployee} />}
        </Stack.Screen>
        <Stack.Screen name="EmployeeDetail" options={{ title: 'Employee Details' }} component={EmployeeDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
