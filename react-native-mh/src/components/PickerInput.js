import React from "react"
import PickerSelect from "./PickerSelect"
import TextInput from "./TextInput"

export default function PickerInput({ ...props }) {
  return (
    <TextInput
      {...props}
      renderTextInput={() => <PickerSelect {...props} />}
      containerStyle={{ ...(props.containerStyle || {}), paddingVertical: 8 }}
    />
  )
}
