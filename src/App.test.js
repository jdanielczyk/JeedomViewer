import React from 'react'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

import { ProvideAuth } from './use-auth'
import App from './App'

const server = setupServer(
  rest.post('*', (req, res, ctx) => {
    return res(ctx.json({ success: true }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const appElement = <ProvideAuth><App/></ProvideAuth>

test('user authent success', async () => {
  server.use(
    rest.post('/api/login', (req, res, ctx) => {
      return res(ctx.json({ success: true }))
    })
  )

  render(appElement)
  fireEvent.click(screen.getByText('Login'))
  await waitFor(() => screen.findByText('Logout'))
  expect(screen.getByText('Logout')).toBeInTheDocument()
})

test('usere authent failed', async () => {
  server.use(rest.post('/api/login', (req, res, ctx) => {
    return res(ctx.json({ success: false }))
  }))

  render(appElement)
  fireEvent.click(screen.getByText('Login'))
  await waitFor(() => screen.findByText('Login'))
  expect(screen.getByText(/Incorrect/gi)).toBeInTheDocument()
})
