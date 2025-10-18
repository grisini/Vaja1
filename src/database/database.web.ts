import AsyncStorage from '@react-native-async-storage/async-storage';
import { Employee } from '../App';

const STORAGE_KEY = '@employees_storage';

export async function migrateDbIfNeeded(): Promise<void> {
  return Promise.resolve();
}

export async function getAllEmployees(): Promise<Employee[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading employees:', e);
    return [];
  }
}

export async function addEmployee(employee: Employee): Promise<void> {
  try {
    const employees = await getAllEmployees();
    employees.push(employee);
    const jsonValue = JSON.stringify(employees);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error adding employee:', e);
  }
}

export async function deleteEmployee(id: string): Promise<void> {
  try {
    const employees = await getAllEmployees();
    const filtered = employees.filter(emp => emp.id !== id);
    const jsonValue = JSON.stringify(filtered);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error deleting employee:', e);
  }
}

export async function clearAllEmployees(): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (e) {
    console.error('Error clearing employees:', e);
  }
}

export async function getEmployeeCount(): Promise<number> {
  const employees = await getAllEmployees();
  return employees.length;
}
