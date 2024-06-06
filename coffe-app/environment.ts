import * as Updates from 'expo-updates'

const ENV = {
  dev: {
    REACT_APP_ENV_ENDPOINT: 'https://cafe-api-gwhs-njft.onrender.com',
  }
}

export const getEnvVars = (env: string | null = null) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.

  return ENV.dev
}
