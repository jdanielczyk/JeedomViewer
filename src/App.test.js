import { render, screen } from '@testing-library/react';

import {rest} from 'msw'
import {setupServer} from 'msw/node';

import App from './App';

const server = setupServer(
    rest.post('/login', (req, res, ctx) => 
    {
        return res(ctx.json({success:true}))
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());



test('user is not authent return to login', () => 
{
    //return to login
    expect(screen.getByText('Login')).toBeInTheDocument();
    throw new Error();
});


test('user is authent', () => 
{
    //display data
    throw new Error();
});


