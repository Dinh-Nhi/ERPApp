import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Card } from 'react-native-paper'
import { config } from '../../helpers/Config'
import { UserInfor } from '../../helpers/UserInfor'
import { jsonRoot } from '../../helpers/JsonRoot';
import axios from 'axios';
export default function CardMainItem() {

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'api-license-key': config.param.apilicensekey,
    'Authorization':  UserInfor.token
  };
  useEffect(() => {
    axios({
      method: config.param.methodPOST,
      url: config.param.url +'/admin/Common/getPackageUseInfo',
      headers: headers,
      data: jsonRoot
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        // Handle any errors here
      });
  }, []);





  return (
    <>
      <Card style={styles.cardItem}>
        <Card.Content>
          <Card.Title
            title="Hóa đơn đầu vào"
            titleVariant="titleLarge"
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="ballot-recount"
                style={styles.bgIcon}
                color="#3fb658"
              />
            )}
          />
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Tổng gói
            </Text>
            <Text variant="bodyMedium" style={styles.desc}>
              Unlimited
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Đã sử dụng
            </Text>
            <Text variant="bodyMedium" style={styles.descSpe}>
              200
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Còn lại
            </Text>
            <Text variant="bodyMedium" style={styles.desc}>
              Unlimited
            </Text>
          </View>
        </Card.Content>
      </Card>
      <Card style={styles.cardItem}>
        <Card.Content>
          <Card.Title
            title="Ký file điện tử"
            titleVariant="titleLarge"
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="file-edit"
                style={styles.bgIcon}
                color="#3fb658"
              />
            )}
          />
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Tổng gói
            </Text>
            <Text variant="bodyMedium" style={styles.desc}>
              Unlimited
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Đã sử dụng
            </Text>
            <Text variant="bodyMedium" style={styles.descSpe}>
              200
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Còn lại
            </Text>
            <Text variant="bodyMedium" style={styles.desc}>
              Unlimited
            </Text>
          </View>
        </Card.Content>
      </Card>
      <Card style={styles.cardItem}>
        <Card.Content>
          <Card.Title
            title="Hợp đồng điện tử"
            titleVariant="titleLarge"
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="file-document"
                style={styles.bgIcon}
                color="#3fb658"
              />
            )}
          />
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Tổng gói
            </Text>
            <Text variant="bodyMedium" style={styles.desc}>
              Unlimited
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Đã sử dụng
            </Text>
            <Text variant="bodyMedium" style={styles.descSpe}>
              200
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="titleLarge" style={styles.label}>
              Còn lại
            </Text>
            <Text variant="bodyMedium" style={styles.desc}>
              Unlimited
            </Text>
          </View>
        </Card.Content>
      </Card>
    </>
  )
}
const styles = StyleSheet.create({
  cardItem: {
    marginBottom: 16,
    backgroundColor: 'white',
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
  descSpe: {
    fontSize: 18,
    fontWeight: 500,
    color: '#3fb658',
  },
  desc: {
    fontSize: 18,
    fontWeight: 500,
    color: 'red',
  },
  bgIcon: {
    backgroundColor: '#d1fae5',
  },
})
