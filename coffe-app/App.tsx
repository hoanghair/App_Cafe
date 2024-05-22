import { AxiosInterceptor, queryClient } from '@/libs/config/react-query'
import { defaultTheme } from '@/libs/config/theme'
import { Navigation, navigationRef } from '@/navigation'
import Gate from '@/store/Gate'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'
import { useRef } from 'react'
import { Provider as ThemeProvider } from 'react-native-paper'

export default function App() {
  const routeNameRef = useRef<string>()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <NavigationContainer
          onReady={() => {
            routeNameRef.current = navigationRef.getCurrentRoute()?.name
          }}
          ref={navigationRef}
        >
          <Gate>
            <AxiosInterceptor>
              <Navigation />
            </AxiosInterceptor>
          </Gate>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
