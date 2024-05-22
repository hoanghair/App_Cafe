import { StyleSheet } from 'react-native'

export const flexBoxStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexCenterAlign: {
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexRowCenterAlign: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexRowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flexRowSpace: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
