/* eslint-disable no-undef */
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import {DataReader,getTemperatureClass, getFormatedDateTime } from './DataReader';
import MockDate from 'mockdate';


beforeEach(() => fetch.resetMocks());


test('getTemperatureClass must be good when > 18 and  < 23', () =>
{
    expect(getTemperatureClass(20)).toBe('good');
});


test('getTemperatureClass must be cold when < 18', () =>
{
    expect(getTemperatureClass(10)).toBe('cold');
});


test('geTemperature must be hot when > 23',()=>
{
    expect(getTemperatureClass(24)).toBe('hot');
});


test('getFormatedDateTime must be 24/03/2020 22:15:00',()=>
{
    MockDate.set('2021-03-24T22:15:00');
    expect(getFormatedDateTime()).toBe('24/03/2021 22:15:00');
    MockDate.reset();
});


test('Mode must be confort', async () => 
{
    fetch.mockResponseOnce('Confort');

    await act(async () => render(<DataReader commandId='266' />));

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Mode|Confort/gi)).toBeInTheDocument();
});


test('title must be set', async () => 
{
    fetch.mockResponseOnce('Confort');

    await act(async () => render(<DataReader title='Mode' commandId='266' />));

    expect(screen.getByText('Mode')).toBeInTheDocument();
});


test('mode variable must be refresh evry 30 seconds', async () => 
{
    jest.useFakeTimers();
    fetch.mockResponseOnce('Confort');

    await act(async () => render(<DataReader commandId='266' />));

    expect(fetch).toHaveBeenCalledTimes(1);
    await act(async () => jest.advanceTimersByTime(30000));

    // +1 for first call before setTimeout ?
    expect(fetch).toHaveBeenCalledTimes(2+1);

    await act(async () => jest.advanceTimersByTime(30000));
    expect(fetch).toHaveBeenCalledTimes(4);
});


// test('display error on api abort', async () => 
// {
//     fetch.mockAbortOnce();

//     await act(async () => render(<DataReader commandId='266' />));

//     expect(screen.getByText(/Erreur/gi)).toBeInTheDocument();

// });