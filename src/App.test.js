import { render, screen } from '@testing-library/react';
import App from './App';

test('REACT_APP_JEEDOM_URL exists', () => {
  expect(process.env.REACT_APP_JEEDOM_URL).not.toBe(undefined);
})

test('REACT_APP_JEEDOM_URL is not empty', ()=> {
  expect(process.env.REACT_APP_JEEDOM_URL).not.toBe("")
})