/* eslint-disable no-undef */
import React from 'react'
import { act, render, screen } from '@testing-library/react'
import { DataReader, getTemperatureClass } from './DataReader'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('/api/jeedomdata/:id', (req, res, ctx) => {
    return res(ctx.json('Confort'))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('getTemperatureClass must be good when > 18 and  < 23', () => {
  expect(getTemperatureClass(20)).toBe('good')
})

test('getTemperatureClass must be cold when < 18', () => {
  expect(getTemperatureClass(10)).toBe('cold')
})

test('geTemperature must be hot when > 23', () => {
  expect(getTemperatureClass(24)).toBe('hot')
})

test('Mode must be confort', async () => {
  render(<DataReader commandId='266' />)

  expect(await screen.findByText(/Mode|Confort/gi)).toBeInTheDocument()
})

test('title must be set', async () => {
  render(<DataReader title='Mode' commandId='266' />)
  expect(screen.getByText('Mode')).toBeInTheDocument()
})

test('display error on api abort', async () => {
  // fetch.mockAbortOnce()
  server.use(
    rest.get('/api/jeedomdata/:id', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(<DataReader commandId='266' />)

  expect(await screen.findByText(/Erreur/gi)).toBeInTheDocument()
})
