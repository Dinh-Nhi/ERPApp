import React, { useEffect, useState } from 'react'

import { Avatar, Card, Divider } from 'react-native-paper'
import { theme } from '../../core/theme'
import CardMainItem from '../Main/CardMainItem'
import { config } from '../../helpers/Config'
import { UserInfor } from '../../helpers/UserInfor'
import axios from 'axios'
import { jsonRoot } from '../../helpers/JsonRoot'
import { DataTable } from 'react-native-paper'
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native'
import { TouchableOpacity } from 'react-native'
import RoundIconBtn from '../../components/RoundIconBtn'
import { Keyboard } from 'react-native'
import TaskItem from './TaskItem'

export default function Task({ navigation }) {
  // let items = [
  //   {
  //     CreateDate: '17/07/2023 01:55:29',
  //     CreateUserFullName: 'Super Administrator',
  //     Status: 'ACTIVE',
  //     TaskCreateDate: '17/07/2023',
  //     TaskDeliveryDate: '17/07/2023',
  //     TaskDeploymentDate: '17/07/2023',
  //     TaskForUsers: [[null]],
  //     TaskFromUser: 'Super Administrator',
  //     TaskName: 'React Native Card',
  //     TaskPriority: 1,
  //     TaskPriorityDesc: 'Gấp, quan trọng',
  //     TaskProgress: '0%',
  //     TaskStatus: 'CREATED',
  //     TaskStatusDesc: 'Tạo mới',
  //     _id: '64b50201dcdc772f3658d6bb',
  //   },
  //   {
  //     CreateDate: '17/07/2023 01:55:29',
  //     CreateUserFullName: 'Super Administrator',
  //     Status: 'ACTIVE',
  //     TaskCreateDate: '17/07/2023',
  //     TaskDeliveryDate: '17/07/2023',
  //     TaskDeploymentDate: '17/07/2023',
  //     TaskForUsers: [[null]],
  //     TaskFromUser: 'Super Administrator',
  //     TaskName: 'React Card Styling',
  //     TaskPriority: 1,
  //     TaskPriorityDesc: 'Gấp, quan trọng',
  //     TaskProgress: '0%',
  //     TaskStatus: 'CREATED',
  //     TaskStatusDesc: 'Tạo mới',
  //     _id: '64b50201dcdc772f3658d6cb',
  //   },

  //   {
  //     Status: 'ACTIVE',
  //     TaskPriority: 1,
  //     TaskPriorityDesc: 'Gấp, quan trọng',
  //     TaskCombinationUsers: 'Super Administrator, KETOAN, ',
  //     TaskDeliveryDate: '17/07/2023',
  //     TaskStatusDesc: 'Tạo mới',
  //     TaskProgress: '0%',
  //     TaskStatus: 'CREATED',
  //     CreateDate: '18/07/2023 11:56:06',
  //     CreateUserFullName: 'Super Administrator',
  //     TaskHandleCombinationUsers: [
  //       {
  //         UserName: 'AAA_SUPERADMIN',
  //         FullName: 'Super Administrator',
  //         _id: '5e7a1dc2a08a49ff4d029bbe',
  //       },
  //       {
  //         UserName: 'AAA_KETOAN',
  //         FullName: 'KETOAN',
  //         _id: '642bad8afddfb744452b3372',
  //       },
  //     ],
  //     TaskUsers: '123, ADMIN, ',
  //     TaskFromUser: 'Super Administrator',
  //     TaskName: 'React Native Card Styling 1',
  //     TaskForUsers: [
  //       {
  //         UserName: 'AAA_DEMO124',
  //         FullName: '123',
  //         _id: '646c37f5aaa6b86f99269c0d',
  //       },
  //       {
  //         UserName: 'AAA_ADMIN',
  //         FullName: 'ADMIN',
  //         _id: '64a3cffb19b6436b732c1301',
  //       },
  //     ],
  //     TaskCreateDate: '17/07/2023',
  //     _id: '64b6226ea8eb6a31be93620c',
  //     TaskDeploymentDate: '17/07/2023',
  //   },
  // ]
  const [page, setPage] = useState(1)
  const [tasks, setTasks] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const from = page * itemsPerPage
  // const to = Math.min((page + 1) * itemsPerPage, items.length)
  const handlePageChange = (page) => setPage(page)
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value)
    setPage(0)
  }
  const openTaskDetail = (item) => {
    navigation.navigate('TaskDetail', { item })
  }
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'api-license-key': config.param.apilicensekey,
    Authorization: UserInfor.token,
  }
  jsonRoot.msg.page.size = itemsPerPage
  jsonRoot.msg.page.page_no = page
  jsonRoot.msg.page.total_rows = 0
  jsonRoot.msg.page.type_sort = -1
  const getTasks = async () => {
    await axios({
      method: config.param.methodPOST,
      url: config.param.url + '/admin/Task/getTasks',
      headers: headers,
      data: jsonRoot,
    })
      .then((response) => {
        // items = items.concat(response.data.data.rows)
        // console.log('Hello', response.data.data.rows)
        setTasks(response.data.data.rows)
      })
      .catch((error) => {
        // Handle any errors here
        console.log('Error', error.message)
      })
  }
  useEffect(() => {
    getTasks()
  }, [])
  useEffect(() => {
    setPage(0)
  }, [itemsPerPage])

  return (
    // <View>
    //   <DataTable style={{ width: '100%' }}>
    //     <ScrollView
    //       horizontal
    //       contentContainerStyle={{ flexDirection: 'column' }}
    //     >
    //       <DataTable.Header>
    //         <DataTable.Title style={{ width: 100 }}>
    //           Tên công việc
    //         </DataTable.Title>
    //         <DataTable.Title style={{ width: 100 }}>Độ ưu tiên</DataTable.Title>
    //         <DataTable.Title style={{ width: 100 }}>
    //           Trạng thái công việc
    //         </DataTable.Title>
    //         <DataTable.Title style={{ width: 100 }}>
    //           Tiến độ công việc
    //         </DataTable.Title>
    //         <DataTable.Title style={{ width: 100 }}>Ngày tạo</DataTable.Title>
    //         <DataTable.Title style={{ width: 100 }}>Deadline</DataTable.Title>

    //         {/* <DataTable.Title numeric>Price</DataTable.Title> */}
    //       </DataTable.Header>

    //       {items.slice(from, to).map((item) => (
    //         <DataTable.Row key={item._id}>
    //           <DataTable.Cell style={{ width: 100 }}>
    //             {item.TaskName}
    //           </DataTable.Cell>
    //           <DataTable.Cell style={{ width: 100 }}>
    //             {item.TaskPriorityDesc}
    //           </DataTable.Cell>
    //           <DataTable.Cell style={{ width: 100 }}>
    //             {item.TaskStatusDesc}
    //           </DataTable.Cell>
    //           <DataTable.Cell style={{ width: 100 }}>
    //             {item.TaskProgress}
    //           </DataTable.Cell>
    //           <DataTable.Cell style={{ width: 100 }}>
    //             {item.TaskCreateDate}
    //           </DataTable.Cell>
    //           <DataTable.Cell style={{ width: 100 }}>
    //             {item.TaskDeliveryDate}
    //           </DataTable.Cell>
    //           {/* <DataTable.Cell numeric>${item.price.toFixed(5)}</DataTable.Cell> */}
    //         </DataTable.Row>
    //       ))}

    //       <DataTable.Pagination
    //         page={page}
    //         numberOfPages={Math.ceil(items.length / itemsPerPage)}
    //         onPageChange={handlePageChange}
    //         numberOfItemsPerPageList={[5, 10, 20, 50, 100]}
    //         numberOfItemsPerPage={itemsPerPage}
    //         onItemsPerPageChange={handleItemsPerPageChange}
    //         label={`${from + 1}-${to} of ${items.length}`}
    //         showFastPaginationControls
    //         //  selectPageDropdownLabel="Rows per page"
    //       />
    //     </ScrollView>
    //   </DataTable>
    // </View>
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text> */}
          {/* {notes.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              containerStyle={{ marginVertical: 15 }}
              onClear={handleOnClear}
            />
          ) : null} */}

          {/* {resultNotFound ? (
            <NotFound />
          ) : ( */}
          <FlatList
            data={tasks}
            scrollEnabled={true}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TaskItem onPress={() => openTaskDetail(item)} item={item} />
            )}
          />

          {/* )} */}

          {!tasks.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add Notes</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <RoundIconBtn
        onPress={() => {}}
        iconName="plus-circle-outline"
        style={styles.addBtn}
        size={38}
      />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    zIndex: 1,
    backgroundColor: theme.colors.white,
  },

  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  addBtn: {
    position: 'absolute',
    right: 15,
    bottom: 50,
    zIndex: 1,
  },
})
