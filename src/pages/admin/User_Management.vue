<template>
  <div class="um_body">
    <div class="main">
      <!-- 顶部按钮 -->
      <div class="up_button">
        <el-button type="primary" size="large">批量私信</el-button>
        <el-button type="danger" size="large" disabled>删除</el-button>
      </div>
      <!-- 消息列表 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column label="ID" width="180">
          <template #default="scope">{{ scope.row.ID }}</template>
        </el-table-column>
        <el-table-column property="name" label="用户昵称" width="200" />
        <el-table-column property="phone" label="手机号" width="200" />
        <el-table-column property="state" label="登录状态" width="200" show-overflow-tooltip />
        <el-table-column property="time" label="注册时间" />
        <el-table-column property="operation" label="操作">
          <template #default="scope">
            <el-button type="primary" @click="privateMessage(scope.$index, scope.row)"
              >私信</el-button
            >
            <el-button type="warning" @click="handleChange(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 底部页数调节 -->
    <div class="footer">
      <div class="before"></div>
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="currentPage3"
          v-model:page-size="pageSize3"
          :size="size"
          :disabled="disabled"
          background="true"
          layout="prev, pager, next, jumper"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" name="Console" setup>
import { useNameStore } from '@/store/nameStore'
import { ref } from 'vue'
import type { ComponentSize } from 'element-plus'
import { customAlphabet } from 'nanoid'
const { user_management, Breadcrumbs, sys_management } = useNameStore()
Breadcrumbs[0] = sys_management
Breadcrumbs[1] = user_management

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 10)
const currentPage3 = ref(5)
const pageSize3 = ref(100)
const size = ref<ComponentSize>('default')
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

//消息列表
//  添加接口约束
interface User {
  ID: string | boolean
  name: string
  state: string
  phone: number
  time: string
}
// interface TableData<T> {
//   list: T[][]
//   total: number
// }
// const currentPage = 0
//消息列表数据
const tableData: User[] = [
  {
    ID: nanoid(),
    name: '哈基米',
    state: '离线',
    phone: 17532026666,
    time: '2025-11-1'
  },
  {
    ID: nanoid(),
    name: '小侯同学',
    state: '在线',
    phone: 18732006666,
    time: '2025-11-1'
  },
  {
    ID: nanoid(),
    name: '圆子',
    state: '在线',
    phone: 13730546666,
    time: '2025-11-2'
  },
  {
    ID: nanoid(),
    name: '小小',
    state: '离线',
    phone: 18833006666,
    time: '2025-11-3'
  }
]
const privateMessage = (index: number, row: User) => {
  console.log('私信', index, row)
}
const handleChange = (index: number, row: User) => {
  console.log('编辑', index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log('删除', index, row)
}
</script>
<style scoped>
.up_button {
  margin: 20px;
}
.um_body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.main {
  flex: 1;
  background-color: #fff;
}
.footer {
  display: flex;
  justify-content: space-between;
  height: 100px;
  border-top: 1px solid #e2e1e1;
  align-items: center;
  background-color: #fff;
  padding: 0 15px;
}
.before {
  flex: 1;
}
</style>
