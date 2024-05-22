import AuthProvider from '@/libs/context/AuthProvider'
import { NotistackProvider } from '@/libs/provider/notistack'
import { QueryClientProvider } from '@/libs/provider/react-query'
import { ThemeProvider } from '@/libs/provider/theme'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={false}>
      <body>
        <AuthProvider>
          <QueryClientProvider>
            <ThemeProvider options={{ key: 'mui' }}>
              <NotistackProvider>{children}</NotistackProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
