import { z } from 'zod'

export const SignInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email không được để trống!' })
    .email({ message: 'Email không đúng định dạng!' }),
  password: z.string().trim().min(1, { message: 'Password không được để trống!' }),
})

export type SignInType = z.infer<typeof SignInSchema>

export type UserType = {
  username: string
  email: string
  token: string
  role: string
}

export type PayloadType = {
  refresh_token: string
  access_token: string
  type: string
}

export type SignInResult = {
  id: string
  user: UserType
}
