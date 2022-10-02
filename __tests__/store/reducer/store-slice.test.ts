/* eslint-disable no-undef */
import storeReducer from '../../../src/store/store-slice'

test('should return the initial state', () => {
  expect(storeReducer(undefined, { type: undefined })).toEqual({
    loading: false,
    stores: []
  })
})
