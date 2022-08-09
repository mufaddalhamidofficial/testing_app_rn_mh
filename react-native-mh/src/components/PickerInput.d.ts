import React from "react"
import { CustomPickerSelectProps } from "./PickerSelect"
import { CustomTextInputProps } from "./TextInput"

interface CustomPickerInputProps extends CustomPickerSelectProps, CustomTextInputProps {}

export default function PickerInput(props: CustomPickerInputProps): React.ReactNode
