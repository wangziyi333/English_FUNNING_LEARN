<template>
  <div class="mc_body">
    <div class="upper">
      <el-card shadow="hover" style="width: 350px; height: 200px">
        <el-col :xs="24" :sm="12" :md="8" class="mb-4">
          <div class="statistic-card">
            <el-statistic :value="`${userNumber}`">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  日活跃用户量
                  <el-tooltip effect="dark" content="一天内登入系统的用户数量" placement="top">
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <span>比昨天</span>
                <span class="green">
                  {{ Percentage }}
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
              </div>
            </div>
            <div class="footer">
              <span>总访问量：</span><span>{{ allUser }}</span>
            </div>
          </div>
        </el-col>
      </el-card>
      <el-card shadow="hover" style="width: 350px; height: 200px"></el-card>
      <el-card shadow="hover" style="width: 350px; height: 200px"></el-card>
      <el-card shadow="hover" style="width: 300px; height: 200px"></el-card>
    </div>
    <div class="another">
      <useChart ref="chart" />
      <div class="another-right">
        <el-card shadow="never" style="width: 300px; height: 210px">
          <div class="icon_right">
            <span class="iconfont icon-shu2"></span>
            <span>FUNNING LEARN</span>
            <span>后台管理系统</span>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts" name="Console" setup>
import { useNameStore } from '@/store/nameStore'
import { CaretTop, Warning } from '@element-plus/icons-vue'
import useChart from '@/components/useChart.vue'
const { mainConsole, Breadcrumbs, Control_Panel } = useNameStore()
Breadcrumbs[0] = Control_Panel
Breadcrumbs[1] = mainConsole
const userNumber = 100
const Percentage = '24%'
const allUser = 1000
</script>
<style scoped>
.mc_body {
  display: block;
  height: 100%;
  background-color: #f5f5f5;
  /* flex-direction: column;
  justify-content: space-between; */
}
.upper {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  width: 83vw;
  box-sizing: border-box;
}
.another {
  padding: 10px 15px;
  display: flex;
  flex: 1;
  background-color: #fff;
  width: 81vw;
  height: 460px;
  margin: 0px 15px;
}
.another-right {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
  /* text-align: center; */
}
.el-col-md-8 {
  max-width: 100%;
}
.statistic-card {
  height: 100%;
  width: 100%;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: right;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
.footer {
  margin-top: 30px;
  border-top: 1px solid #dedddd;
  display: flex;
  justify-content: space-between;
  line-height: 45px;
}
.icon_right {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
.icon-shu2 {
  margin-right: 24px;
  font-size: 100px;
  color: rgb(83, 82, 36);
}
.icon_right > span:not(:first-child) {
  font-size: 25px;
}
</style>
