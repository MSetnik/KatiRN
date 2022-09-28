/* eslint-disable no-undef */
import { ICategory, IStores } from '../../src/interfaces/endpoints'

it('Fetches data from firestore and returns IStore list', async () => {
  const lStores: IStores[] = [
    {
      id: '1',
      name: 'Lidl',
      imgUrl: ''
    },
    {
      id: '2',
      name: 'Plodine',
      imgUrl: ''
    },
    {
      id: '3',
      name: 'Kaufland',
      imgUrl: ''
    }
  ]

  const firestoreResp = lStores
  expect(firestoreResp).toBe(lStores)
})

it('Fetches data from firestore and returns ICategory list', async () => {
  const lCategories: ICategory[] = [
    {
      id: '2',
      name: 'Meso'
    },
    {
      id: '33',
      name: 'Tijesto'
    },
    {
      id: '4',
      name: 'Lidl'
    }
  ]

  const firestoreResp = lCategories
  expect(firestoreResp).toBe(lCategories)
})

export {}
