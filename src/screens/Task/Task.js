import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Avatar, Card } from 'react-native-paper'
import { theme } from '../../core/theme'
import CardMainItem from '../Main/CardMainItem'
import { config } from '../../helpers/Config'
import { UserInfor } from '../../helpers/UserInfor'
import axios from 'axios'
import { jsonRoot } from '../../helpers/JsonRoot'
import { DataTable } from 'react-native-paper';

export default function Task() {
  
  let  items = [
    {"CreateDate": "17/07/2023 01:55:29", "CreateUserFullName": "Super Administrator", "Status": "ACTIVE", "TaskCreateDate": "17/07/2023", "TaskDeliveryDate": "17/07/2023", "TaskDeploymentDate": "17/07/2023", "TaskForUsers": [[Object]], "TaskFromUser": "Super Administrator", "TaskName": "2", "TaskPriority": 1, "TaskPriorityDesc": "Gấp, quan trọng", "TaskProgress": "0%", "TaskStatus": "CREATED", "TaskStatusDesc": "Tạo mới", "_id": "64b50201dcdc772f3658d6bb"}
  ];

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'api-license-key': config.param.apilicensekey,
      Authorization: UserInfor.token,
    }
    jsonRoot.msg.page.size=itemsPerPage;
    jsonRoot.msg.page.page_no=page;
    jsonRoot.msg.page.total_rows=0;
    jsonRoot.msg.page.type_sort=-1;
    const getTasks = async () => {
      await axios({
        method: config.param.methodPOST,
        url: config.param.url + '/admin/Task/getTasks',
        headers: headers,
        data: jsonRoot,
      })
        .then((response) => {
         items = items.concat(response.data.data.rows);
         console.log(items)
        })
        .catch((error) => {
          // Handle any errors here
          console.log('Error', error.message)
        })
    }
   useEffect(() => {
        getTasks()
      }, [])
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);
  const handlePageChange = (page) => setPage(page);
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setPage(0);
  };
  return (
  <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Tên công việc</DataTable.Title>
          <DataTable.Title>Nhân viên xử lý</DataTable.Title>
          <DataTable.Title>Nhân viên phối hợp</DataTable.Title>
          <DataTable.Title>Ngày tạo</DataTable.Title>
          <DataTable.Title>Deadline</DataTable.Title>
      
        
          {/* <DataTable.Title numeric>Price</DataTable.Title> */}
        </DataTable.Header>

        {items.slice(from, to).map((item) => (
          <DataTable.Row key={item._id}>
            <DataTable.Cell>{item.TaskName}</DataTable.Cell>
            <DataTable.Cell>{item.TaskPriorityDesc}</DataTable.Cell>
            <DataTable.Cell>{item.TaskDeliveryDate}</DataTable.Cell>
            {/* <DataTable.Cell numeric>${item.price.toFixed(5)}</DataTable.Cell> */}
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={handlePageChange}
          numberOfItemsPerPageList={[5, 10, 20, 50, 100]}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          label={`${from + 1}-${to} of ${items.length}`}
          showFastPaginationControls
        //  selectPageDropdownLabel="Rows per page"
        />
      </DataTable>
    </View>
  )
}
