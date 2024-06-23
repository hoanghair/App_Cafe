export const AUTH_SCREEN = {
  SIGN_IN: {
    INDEX: 'SIGN_IN' as const,
  },
  SIGN_UP: {
    INDEX: 'SIGN_UP' as const,
  },
  WELCOME: {
    INDEX: 'WELCOME' as const,
  },
  FORGOT_PASSWORD: {
    INDEX: 'FORGOT_PASSWORD' as const,
  },
  VERIFICATION: {
    INDEX: 'VERIFICATION' as const,
  },
  RESET_PASSWORD: {
    INDEX: 'RESET_PASSWORD' as const,
  },
  VERIFICATION_ACCOUNT: {
    INDEX: 'VERIFICATION_ACCOUNT' as const,
  },
}

export const TUTORIAL = {
  TUTORIAL: {
    INDEX: 'TUTORIAL' as const,
  },
}

export const SEARCH = {
  SEARCH: {
    INDEX: 'SEARCH_INDEX' as const,
  },
}

export const INFORMATION_STACK = {
  INFORMATION: {
    INDEX: 'INFORMATION' as const,
  },
  CHANGE_PASSWORD: {
    INDEX: 'CHANGE_PASSWORD' as const,
  },
  ABOUT_APP: {
    INDEX: 'ABOUT_APP' as const,
  },
}

export const PRODUCT_SCREEN = {
  PRODUCT_DETAIL: {
    INDEX: 'PRODUCT_DETAIL' as const,
  },
}

export const CHECKOUT_SCREEN = {
  CHECKOUT: {
    INDEX: 'CHECKOUT' as const,
  },
}

export const SCREENS_KEY = {
  HOME: {
    INDEX: 'HOME_INDEX' as const,
    DETAIL_PRODUCT: 'HOME_DETAIL_PRODUCT' as const,
  },
  SETTING: {
    INDEX: 'SETTING_INDEX' as const,
    PROFILE: 'SETTING_PROFILE' as const,
    HISTORY_ORDER: 'SETTING_HISTORY_ORDER' as const,
  },
  CART: {
    INDEX: 'CART_INDEX' as const,
    CHECKOUT: 'CHECKOUT_INDEX' as const,
  },
  HISTORY_ORDER: {
    INDEX: 'HISTORY_ORDER_INDEX' as const,
  },
  ...SEARCH,
  ...TUTORIAL,
  ...AUTH_SCREEN,
  ...INFORMATION_STACK,
  ...PRODUCT_SCREEN,
  ...CHECKOUT_SCREEN,
}

export const BOTTOM_TABS_KEY = {
  TAB_HOME: 'TAB_HOME' as const,
  TAB_PROFILE: 'TAB_PROFILE' as const,
  TAB_FOOD: 'TAB_FOOD' as const,
  TAB_CART: 'TAB_CART' as const,
  TAB_HISTORY: 'TAB_HISTORY' as const,
}
