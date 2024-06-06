import { z } from 'zod'
// zod là một thư viện TypeScript được sử dụng để kiểm tra và xác thực dữ liệu.
export const SignUpSchema = z
  .object({
    username: z.string().min(1, { message: 'Tên người dùng phải ít nhất 1 ký tự' }),
    email: z
      .string()
      .min(1, { message: 'Email phải ít nhất 1 ký tự' })
      .email({ message: 'Email không hợp lệ' }),
    password: z.string().min(8, { message: 'Mật khẩu phải ít nhất 8 ký tự' }),
    confirm_password: z.string().min(8, { message: 'Mật khẩu phải ít nhất 8 ký tự' }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Mật khẩu không khớp',
    path: ['confirm_password'],
  })

export type SignUpType = z.infer<typeof SignUpSchema>

export type SignUpRequest = {
  username: string
  email: string
  password: string
}
