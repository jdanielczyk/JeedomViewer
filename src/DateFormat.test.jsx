import { getFormatedDateTime } from './DateFormat'
import MockDate from 'mockdate'

test('getFormatedDateTime must be 24/03/2020 22:15:00', () => {
  MockDate.set('2021-03-24T22:15:00')
  expect(getFormatedDateTime()).toBe('24/03/2021 22:15:00')
  MockDate.reset()
})
