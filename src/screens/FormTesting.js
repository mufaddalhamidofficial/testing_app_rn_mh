import { View, Text } from "react-native"
import React from "react"
import {
  Button,
  Checkbox,
  DefaultTheme,
  randomColor,
  TextFormatted,
  TextInput,
  useForm,
  useTheme,
  useUiHook,
  ValidationTypes,
} from "../../react-native-mh"

export default function FormTesting() {
  const { theme, updateTheme, sbh, sbw, width } = useUiHook()
  const { fields, replaceData, reset, validate } = useForm({
    firstName: {
      intialValue: "",
      validations: [{ type: ValidationTypes.Required }, { type: ValidationTypes.LettersOnly }],
      displayName: "First Name",
    },
    lastName: {
      intialValue: "",
      validations: [{ type: ValidationTypes.Required }, { type: ValidationTypes.LettersOnly }],
      displayName: "Last Name",
    },
    mobile: {
      intialValue: "",
      validations: [
        { type: ValidationTypes.Required },
        { type: ValidationTypes.NumbersOnly },
        { type: ValidationTypes.MinLength, length: 8 },
        { type: ValidationTypes.MaxLength, length: 12 },
      ],
      displayName: "Mobile",
    },
    email: {
      intialValue: "",
      validations: [{ type: ValidationTypes.Required }, { type: ValidationTypes.Email }],
      displayName: "Email",
    },
    password: {
      intialValue: "",
      validations: [
        { type: ValidationTypes.Required },
        {
          type: ValidationTypes.Regex,
          value: /.{8,}/,
          customMessage: "$displayName must be greater than 8 characters",
        },
        {
          type: ValidationTypes.Regex,
          value: /[a-z]/,
          customMessage: "$displayName must contain at least one letter",
        },
        {
          type: ValidationTypes.Regex,
          value: /[0-9]/,
          customMessage: "$displayName must contain at least one number",
        },
      ],
      displayName: "Password",
    },
    check: {
      intialValue: false,
      validations: [
        { type: ValidationTypes.EqualTo, value: true, customMessage: "Please check Terms of Condition checkbox" },
      ],
    },
  })
  return (
    <View style={{ flex: 1 }}>
      <TextInput {...fields.firstName} />
      {sbh(20)}
      <TextInput {...fields.lastName} />
      {sbh(20)}
      <TextInput {...fields.mobile} />
      {sbh(20)}
      <TextInput {...fields.email} />
      {sbh(20)}
      <TextInput {...fields.password} />
      {sbh(20)}
      <Checkbox selected={fields.check.value} onPress={() => fields.check.onChangeText(!fields.check.value)} />
      {!!fields.check.error && (
        <TextFormatted style={{ color: theme.colors.error }}>{fields.check.error}</TextFormatted>
      )}
      {sbh(20)}
      <Button text="Validate" onPress={() => validate().then(console.log)} />
      {sbh(20)}
      <Button text="Log" onPress={() => console.log(fields)} />
    </View>
  )
}
