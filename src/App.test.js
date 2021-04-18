import React from 'react'
import { act, render, screen, fireEvent } from '@testing-library/react'
import { ProvideAuth } from './use-auth'
import App from './App'

beforeEach(() => fetch.resetMocks())

test('user is not authent return to login', async () => {
  fetch.mockResponse({ success: false })

  await act(async () => render(
        <ProvideAuth>
            <App />
        </ProvideAuth>))

  expect(screen.getByText(/Log me in/g)).toBeInTheDocument()
})

test('user is authent', async () => {
  fetch.mockResponse({ success: true })

  await act(async () => render(
    <ProvideAuth>
      <App />
    </ProvideAuth>))

  fireEvent.click(screen.getByText('Log me in'))

  expect(fetch).toHaveBeenCalledTimes(1)
  expect(screen.getAllByAltText(/Logout/g)).toHaveLength(1)
})
