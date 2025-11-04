<template>
  <div class="msg_body">
    <div class="main">
      <!-- 顶部按钮 -->
      <div class="up_button">
        <el-button type="primary" size="large">批量确认</el-button>
        <el-button type="danger" size="large" disabled>删除</el-button>
      </div>
      <!-- 消息列表 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column label="ID" width="120">
          <template #default="scope">{{ scope.row.ID }}</template>
        </el-table-column>
        <el-table-column property="name" label="消息题目" width="120" />
        <el-table-column property="state" label="消息状态" width="240" show-overflow-tooltip />
        <el-table-column property="creater" label="创建人" />
        <el-table-column property="time" label="创建时间" />
        <el-table-column property="operation" label="操作" />
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
// import { reactive } from 'vue'

//分页参数
// const paginationData = reactive({
//   pageNum: 1,
//   pageSize: 10
// })

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
//同步面包屑
const { messages, Breadcrumbs, Control_Panel } = useNameStore()
Breadcrumbs[0] = Control_Panel
Breadcrumbs[1] = messages
//消息列表
//  添加接口约束
interface User {
  ID: string
  name: string
  state: string
  creater: string
  time: string
  operation: string
}
// interface TableData<T> {
//   list: T[][]
//   total: number
// }
// const currentPage = 0
//消息列表数据
const tableData: User[] = [
  {
    ID: '1',
    name: '通知',
    state: '未读',
    creater: 'WangZiyi',
    time: '2025-11-3',
    operation: ''
  },
  {
    ID: '2',
    name: '通知',
    state: '未读',
    creater: 'WangZiyi',
    time: '2025-11-3',
    operation: ''
  },
  {
    ID: '3',
    name: '通知',
    state: '未读',
    creater: 'WangZiyi',
    time: '2025-11-3',
    operation: ''
  },
  {
    ID: '4',
    name: '通知',
    state: '未读',
    creater: 'WangZiyi',
    time: '2025-11-3',
    operation: ''
  }
]
</script>
<style scoped>
.up_button {
  margin: 20px;
}
.msg_body {
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
