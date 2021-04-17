import { act, render, screen } from '@testing-library/react';
import {ProvideAuth} from './use-auth'
import App from './App';


beforeEach(() => fetch.resetMocks());


test('user is not authent return to login', async () => 
{
    // mockUser = null;
    //return to login
    fetch.mockResponseOnce({success:false});

    await act(async () => render(
        <ProvideAuth>
            <App />
        </ProvideAuth>));
    expect(screen.getAllByText(/Login/g)).toHaveLength(2);
});


// test('user is authent', () => 
// {
//     //display data
//     throw new Error();
// });


