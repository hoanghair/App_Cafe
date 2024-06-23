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

// Reducers là các hàm xử lý actions để cập nhật trạng thái.
const reducers = {
  // Thiết lập người dùng đã được xác thực.
  setUser: (state: AuthProps, payload: AuthUser) => ({
    ...state,
    user: payload,
  }),
  // lần đầu
  setFirstTime: (state: AuthProps, payload: boolean) => ({
    ...state,
    isFirstTime: payload,
  }),
  // khách
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
