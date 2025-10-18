import * as SQLite from 'expo-sqlite';
import { Employee } from '../App';

let db: SQLite.SQLiteDatabase | null = null;

async function getDatabase() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('employees.db');
  }
  return db;
}

export async function migrateDbIfNeeded(): Promise<void> {
  const DATABASE_VERSION = 1;
  const database = await getDatabase();

  const result = await database.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  let currentDbVersion = result?.user_version ?? 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await database.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS employees (
        id TEXT PRIMARY KEY NOT NULL,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        position TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at INTEGER DEFAULT (strftime('%s', 'now'))
      );
    `);
    currentDbVersion = 1;
  }

  await database.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export async function getAllEmployees(): Promise<Employee[]> {
  const database = await getDatabase();
  const employees = await database.getAllAsync<Employee>(
    'SELECT id, firstName, lastName, position, email FROM employees ORDER BY created_at DESC'
  );
  return employees;
}

export async function addEmployee(employee: Employee): Promise<void> {
  const database = await getDatabase();
  await database.runAsync(
    'INSERT INTO employees (id, firstName, lastName, position, email) VALUES (?, ?, ?, ?, ?)',
    employee.id,
    employee.firstName,
    employee.lastName,
    employee.position,
    employee.email
  );
}

export async function deleteEmployee(id: string): Promise<void> {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM employees WHERE id = ?', id);
}

export async function clearAllEmployees(): Promise<void> {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM employees');
}

export async function getEmployeeCount(): Promise<number> {
  const database = await getDatabase();
  const result = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM employees'
  );
  return result?.count ?? 0;
}
