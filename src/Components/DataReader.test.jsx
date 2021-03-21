import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Mode from './DataReader';

beforeEach(() => fetch.resetMocks());


test('Mode must be confort', async () => {
    fetch.mockResponseOnce('Confort');

    await act(async () => render(<Mode id='266' />));

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Mode|Confort/gi)).toBeInTheDocument();
});


test('title must be set', async () => {
    fetch.mockResponseOnce('Confort');

    await act(async () => render(<Mode title='Mode' id='266' />));

    expect(screen.getByText('Mode')).toBeInTheDocument();
});


test('mode variable must be refresh evry 15 seconds', async () => {
    jest.useFakeTimers();
    fetch.mockResponseOnce('Confort');

    await act(async () => render(<Mode id='266' />));

    expect(fetch).toHaveBeenCalledTimes(1);
    await act(async () => jest.advanceTimersByTime(15000));

    expect(fetch).toHaveBeenCalledTimes(2);
});


test('display error on api abort', async () => {
    fetch.mockAbortOnce();

    await act(async () => render(<Mode id='266' />));

    expect(screen.getByText(/Erreur/gi)).toBeInTheDocument();
});