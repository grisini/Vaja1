const mockEmployees = [];

const mockDatabase = {
  getFirstAsync: jest.fn(async (query) => {
    if (query.includes('PRAGMA user_version')) {
      return { user_version: 1 };
    }
    if (query.includes('COUNT(*)')) {
      return { count: mockEmployees.length };
    }
    return null;
  }),
  execAsync: jest.fn(async () => {}),
  runAsync: jest.fn(async (query, ...params) => {
    if (query.includes('INSERT')) {
      mockEmployees.push({
        id: params[0],
        firstName: params[1],
        lastName: params[2],
        position: params[3],
        email: params[4],
      });
    } else if (query.includes('DELETE FROM employees WHERE id')) {
      const index = mockEmployees.findIndex(e => e.id === params[0]);
      if (index > -1) {
        mockEmployees.splice(index, 1);
      }
    } else if (query.includes('DELETE FROM employees') && params.length === 0) {
      mockEmployees.length = 0;
    }
    return { lastInsertRowId: Date.now() };
  }),
  getAllAsync: jest.fn(async () => {
    return [...mockEmployees];
  }),
};

export const openDatabaseAsync = jest.fn(async () => mockDatabase);

export default {
  openDatabaseAsync,
};
