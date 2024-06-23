import { useAppTheme } from '@/libs/config/theme'
import { textStyles } from '@/libs/styles'
import React from 'react'
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from 'react-native'
import { TextInput as TextInputPaper, TextInputProps } from 'react-native-paper'

type Props = {
  helperText?: string
  styleInput?: StyleProp<TextStyle>
  label?: string
  styleOutlineInput?: StyleProp<TextStyle>
} & TextInputProps

const Input: React.FC<Props> = ({
  helperText,
  style,
  styleOutlineInput,
  styleInput,
  label,
  ...props
}) => {
  const { colors } = useAppTheme()

  return (
    <View style={style}>
      {label && <Text style={textStyles.text14}>{label}</Text>}

      <TextInputPaper
        mode="outlined"
        placeholderTextColor={colors.placeholder}
        style={styleOutlineInput}
        {...props}
        render={(innerProps) => (
          <TextInput
            {...innerProps}
            style={
              props.multiline
                ? [innerProps.style, styles.textMultiline, styleInput]
                : [innerProps.style, styles.text, styleInput]
            }
          />
        )}
      />

      {helperText && props.error && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    ...textStyles.text14,
    padding: 0,
  },
  text: {
    includeFontPadding: false,
    fontSize: 15,
    color: '#000',
  },
  textMultiline: {
    includeFontPadding: false,
    paddingBottom: 15,
    height: 150,
    fontSize: 15,
  },
  helperText: {
    color: 'red',
    fontSize: 12,
    includeFontPadding: false,
  },
})

export { Input }
