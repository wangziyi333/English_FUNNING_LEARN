<template>
  <div class="nt_body">
    <div class="main">
      <!-- 顶部按钮 -->
      <div class="up_button">
        <el-button type="primary" size="large">发布通知</el-button>
        <el-button type="danger" size="large" disabled>删除</el-button>
      </div>
      <!-- 消息列表 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="60" />
        <el-table-column label="ID" width="150">
          <template #default="scope">{{ scope.row.ID }}</template>
        </el-table-column>
        <el-table-column property="title" label="通知标题" width="300" />
        <el-table-column label="封面" width="150">
          <template #default="scope">
            <div class="img-container">
              <el-image :src="scope.row.imgUrl" fit="cover"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="clickNumber" label="点击量" width="200" show-overflow-tooltip />
        <el-table-column property="creater" label="创建人" />
        <el-table-column property="time" label="发布时间" width="250" />
        <el-table-column property="operation" label="操作" width="200">
          <template #default="scope">
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
<script lang="ts" name="myNotice" setup>
import { useNameStore } from '@/store/nameStore'
import { ref } from 'vue'
import type { ComponentSize } from 'element-plus'

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
  ID: string
  title: string
  imgUrl: string
  clickNumber: number
  creater: string
  time: string
}
//消息列表数据
const tableData: User[] = [
  {
    ID: '4',
    title: '哈基米',
    imgUrl:
      'https://ts2.cn.mm.bing.net/th?id=OIP-C.SQmqQt18WUcWYyuX8fGGGAHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2',
    clickNumber: 17532026666,
    creater: '小王',
    time: '2025-11-1 21:28:10'
  },
  {
    ID: '3',
    title: '哈基米',
    imgUrl:
      'https://ts2.cn.mm.bing.net/th?id=OIP-C.SQmqQt18WUcWYyuX8fGGGAHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2',
    clickNumber: 17532026666,
    creater: '小王',
    time: '2025-11-1 21:28:10'
  },
  {
    ID: '3',
    title: '哈基米',
    imgUrl:
      'https://ts2.cn.mm.bing.net/th?id=OIP-C.SQmqQt18WUcWYyuX8fGGGAHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2',
    clickNumber: 17532026666,
    creater: '小王',
    time: '2025-11-1 21:28:10'
  },
  {
    ID: '4',
    title: '哈基米',
    imgUrl:
      'https://ts2.cn.mm.bing.net/th?id=OIP-C.SQmqQt18WUcWYyuX8fGGGAHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2',
    clickNumber: 17532026666,
    creater: '小王',
    time: '2025-11-1 21:28:10'
  }
]
const handleChange = (index: number, row: User) => {
  console.log('编辑', index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log('删除', index, row)
}

const { notice, Breadcrumbs, data_management } = useNameStore()
Breadcrumbs[0] = notice
Breadcrumbs[1] = data_management
</script>
<style scoped>
.nt_body {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  justify-content: space-between;
}

.up_button {
  margin: 20px;
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
.img-container {
  width: 50px;
  height: 50px;
}
.el-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
