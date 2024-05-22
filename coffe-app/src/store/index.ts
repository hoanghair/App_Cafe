import AsyncStorage from '@react-native-async-storage/async-storage'
import { RematchDispatch, RematchRootState, init } from '@rematch/core'
import loadingPlugin from '@rematch/loading'
import createRematchPersist from '@rematch/persist'
import { RootModel, models } from './models/root'

const configPersist = createRematchPersist({
  key: 'root',
  storage: AsyncStorage,
  blacklist: [''],
  whitelist: ['auth'],
  version: 1,
})

const store = init<RootModel>({
  models,
  plugins: [configPersist, loadingPlugin()] as any,
})

export default store

export type Store = typeof store
export type RootStore = RematchRootState<RootModel>
export type Dispatch = RematchDispatch<RootModel>
