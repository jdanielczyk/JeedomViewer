import { act, render, screen, fireEvent } from '@testing-library/react';
import { ProvideAuth } from './use-auth'
import App from './App';
import { flushSync } from 'react-dom';

beforeEach(() => fetch.resetMocks());

test('user is not authent return to login', async () => 
{
    fetch.mockResponse({success:false});

    await act(async () => render(
        <ProvideAuth>
            <App />
        </ProvideAuth>));

    expect(screen.getAllByText(/Login/g)).toHaveLength(2);
});


test('user is authent', async () => 
{
    fetch.mockResponse(JSON.stringify({success:true}));

    await act(async () => render(
        <ProvideAuth>
            <App />
        </ProvideAuth>));


    fireEvent.click(screen.getByRole('button',/Login/i));

    await flushSync();

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(screen.getAllByAltText(/Logout/g)).toHaveLength(1);
});


