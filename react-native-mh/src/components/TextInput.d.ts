import { TextInputProps, TextStyle, ViewStyle } from "react-native"

interface CustomTextInputProps extends TextInputProps {
  heading?: string
  error?: string
  setError?: (val: string) => void
  headingStyle: TextStyle
  leftError?: boolean
  renderTextInput?: (props: TextInputProps) => React.ReactNode
  containerStyle?: ViewStyle
  leftXml?: string
  rightXml?: string
  left?: React.ReactNode
  right?: React.ReactNode
  readOnly?: boolean
  parentContainerStyle?: ViewStyle
  shadowVisible?: Boolean
  disabled?: Boolean
}

export default function TextInput(props: CustomTextInputProps): React.ReactNode
