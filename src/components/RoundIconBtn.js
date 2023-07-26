import React from 'react'
import { StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'
import { theme } from '../core/theme'

const RoundIconBtn = ({ iconName, size, color, style, onPress }) => {
  return (
    <IconButton
      icon={iconName}
      iconColor={color || theme.colors.white}
      size={size || 24}
      style={[styles.icon, { ...style }]}
      onPress={onPress}
    />
  )
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: theme.colors.primary,
    elevation: 3,
  },
})

export default RoundIconBtn
