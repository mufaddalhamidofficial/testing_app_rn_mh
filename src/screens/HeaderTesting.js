import { View, Text } from "react-native"
import React from "react"
import { Button, Checkbox, Header, randomColor, useUiHook } from "../../react-native-mh"
import { Icon } from "react-native-elements"

export default function HeaderTesting() {
  const { theme, updateTheme, sbh, sbw, width } = useUiHook()
  return (
    <View style={{ flex: 1, width, left: -20 }}>
      {sbh(20)}
      <Header title="Hello" showBackButton={false} />
      {sbh(20)}
      <Header title="Hello with leading" />
      {sbh(20)}
      <Header title="Hello with actions" showBackButton={false} trailing={[<Icon name="more-vert" />, sbw(20)]} />
      {sbh(20)}
      <Header title="Hello with both" trailing={[<Icon name="more-vert" />, sbw(20)]} />
      {sbh(20)}
      <Header centerTitle={false} title="Left Hello" showBackButton={false} />
      {sbh(20)}
      <Header centerTitle={false} title="Left Hello with leading" />
      {sbh(20)}
      <Header
        centerTitle={false}
        title="Left Hello with actions"
        showBackButton={false}
        trailing={[<Icon name="more-vert" />, sbw(20)]}
      />
      {sbh(20)}
      <Header centerTitle={false} title="Left Hello with both" trailing={[<Icon name="more-vert" />, sbw(20)]} />
      {sbh(20)}
      <View style={{ paddingHorizontal: 20 }}>
        <Button
          text="Change Colors"
          onPress={() =>
            updateTheme({ headerStyles: { backgroundColor: randomColor(), foregroundColor: randomColor() } })
          }
        />
        {sbh(20)}
        <Button
          text="Change Sizes"
          onPress={() =>
            updateTheme({
              headerStyles: {
                height: Math.random() * 60 + 40,
                paddingHorizontal: Math.random() * 20,
                backIcon: { size: Math.random() * 30 },
                title: {
                  style: { fontSize: Math.random() * 30, fontWeight: Math.round(Math.random() * 8 + 1) + "00" },
                },
              },
            })
          }
        />
        {sbh(20)}
        <Button
          text="Change Default Center"
          onPress={() =>
            updateTheme({ headerStyles: { title: { defaultCenter: !theme.headerStyles.title.defaultCenter } } })
          }
        />
        {sbh(20)}
        <Button
          onPress={() =>
            updateTheme({
              headerStyles: {
                shadow: true,
                shadowProps: {
                  startColor: randomColor(),
                  finalColor: randomColor(),
                  distance: Math.random() * 10,
                  paintInside: Math.random() > 0.5,
                  offset: [Math.random(), Math.random()],
                  radius: Math.random() * 10,
                },
              },
            })
          }
          text="Change Shadow"
        />
      </View>
    </View>
  )
}
