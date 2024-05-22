import { AuthUser } from '@/libs/types/auth'
import { createModel } from '@rematch/core'
import { Dispatch } from '..'
import { RootModel } from './root'

interface AuthProps {
  user: AuthUser | null
  isFirstTime: boolean
  guestMode: boolean
}

const state: AuthProps = {
  user: null,
  isFirstTime: false,
  guestMode: true,
}

const reducers = {
  setUser: (state: AuthProps, payload: AuthUser) => ({
    ...state,
    user: payload,
  }),
  setFirstTime: (state: AuthProps, payload: boolean) => ({
    ...state,
    isFirstTime: payload,
  }),
  setGuestMode: (state: AuthProps, payload: boolean) => ({
    ...state,
    guestMode: payload,
  }),
}

const effects = (dispatch: Dispatch) => ({})

export const auth = createModel<RootModel>()({
  state,
  reducers,
  effects,
})
