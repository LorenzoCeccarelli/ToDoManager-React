import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from '../App'

it("renders without crashing", () => {
    const { getByTestId } = render(<App />); 
    expect(getByTestId('prova')).toHaveTextContent('Prova')
  });