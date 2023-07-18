import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import { UserInfor } from '../../helpers/UserInfor'
import { theme } from '../../core/theme'

export default function UserProfile({ navigation }) {
  return (
    <View style={styles.userProfileWrap}>
      <ScrollView>
        <View>
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Tên đăng nhập
            </Text>
            <Text variant="bodyMedium" style={styles.desc}>
              {UserInfor?.userName}
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Tên đầy đủ
            </Text>
            <Text variant="bodyMedium" style={styles.desc}>
              {UserInfor?.fullName}
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Điện thoại
            </Text>
            <Text variant="bodyMedium" style={styles.desc}>
              {UserInfor?.phone}
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Email
            </Text>
            <Text variant="bodyMedium" style={styles.desc}>
              {UserInfor?.email}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  userProfileWrap: {
    flex: 1,
    padding: 20,
    width: '100%',
    backgroundColor: 'white',
  },
  title: {
    marginBottom: 20,
    color: theme.colors.primary,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 500,
  },

  desc: {
    fontSize: 18,
    fontWeight: 500,
  },
  divide: {
    marginBottom: 20,
  },
})
