import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider } from 'react-native-paper'
import styled from 'styled-components/native'
import { useAppTheme } from '../config/theme'
import { flexBoxStyles } from '../styles'

type Props = {
  title: string
}

type TextProps = {
  font?: string
  color?: string
}
type DividerProps = {
  bgColor?: string
}

const TextHeader = styled.Text<TextProps>`
  color: ${(props) => props?.color || '#000'};
  font-size: 20px;
`

const DividerView = styled(Divider)<DividerProps>`
  height: 4px;
  background-color: ${(props) => props?.bgColor || '#000'};
  border-radius: 6px;
  width: 67px;
  align-self: center;
`

const HeadingTitle: React.FC<Props> = ({ title }) => {
  const theme = useAppTheme()
  return (
    <View style={flexBoxStyles.flexCenter}>
      <TextHeader style={styles.text}>{title}</TextHeader>

      <DividerView bgColor={theme.colors.primary} />
    </View>
  )
}

export { HeadingTitle }

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
  },
})
