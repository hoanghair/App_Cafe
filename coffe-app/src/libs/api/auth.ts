import { SignInResult, SignInType } from '@/screens/Auth/SignIn'
import { SignUpRequest } from '@/screens/Auth/SignUp'
import { ApiClient, ApiClientUnAuth } from '../config/react-query'

export const signIn = async ({ email, password }: SignInType): Promise<SignInResult> => {
 try {
  const response = await ApiClient.post('/login', {
    email: email,
    password: password,
  })


  return response.data
 } catch (error) {
  throw error
 }
}

export const signUp = async (data: SignUpRequest) => {
  try {
    const response = await ApiClientUnAuth.post<SignUpRequest>('/register', data)
    return response
  } catch (error) {
    throw error
  }
}
