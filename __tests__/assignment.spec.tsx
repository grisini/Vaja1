import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../src/App';

const type = (node: any, text: string) => fireEvent.changeText(node, text);

test('Home: prikaže employeesList', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('employeesList')).toBeTruthy();
});

test('Add: invalid email pokaže emailError, valid pa doda zaposlenega', () => {
  const { getByTestId, queryByTestId } = render(<App />);

  const fab = getByTestId('fabAdd');
  expect(fab).toBeTruthy();
  fireEvent.press(fab);

  const first = getByTestId('firstNameField');
  const last  = getByTestId('lastNameField');
  const pos   = getByTestId('positionField');
  const email = getByTestId('emailField');
  const save  = getByTestId('saveEmployee');

  type(first, 'Ana');
  type(last,  'Novak');
  type(pos,   'Dev');
  type(email, 'ana@'); // invalid
  fireEvent.press(save);

  expect(getByTestId('emailError')).toBeTruthy();

  type(email, 'ana.novak@example.com');
  fireEvent.press(save);

  // Po shranjevanju pričakujemo vsaj en element v seznamu (employee-0)
  expect(getByTestId('employeesList')).toBeTruthy();
  expect(queryByTestId('employee-0')).toBeTruthy();
});

test('Detail: tap employee-0 odpre pageDetail z detailName/Position/Email', () => {
  const { getByTestId, queryByTestId } = render(<App />);

  // Če še ni elementov, naj jih ustvari prejšnji test; vseeno poskusi simulirati hitro dodajanje
  if (!queryByTestId('employee-0')) {
    const fab = getByTestId('fabAdd');
    fireEvent.press(fab);
    type(getByTestId('firstNameField'), 'Bojan');
    type(getByTestId('lastNameField'),  'Kralj');
    type(getByTestId('positionField'),  'QA');
    type(getByTestId('emailField'),     'bojan.kralj@example.com');
    fireEvent.press(getByTestId('saveEmployee'));
  }

  const item0 = getByTestId('employee-0');
  fireEvent.press(item0);

  expect(getByTestId('pageDetail')).toBeTruthy();
  expect(getByTestId('detailName')).toBeTruthy();
  expect(getByTestId('detailPosition')).toBeTruthy();
  expect(getByTestId('detailEmail')).toBeTruthy();
});
