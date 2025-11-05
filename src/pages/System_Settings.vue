<template>
  <div class="ss_body">
    <div class="upper">
      <span>网站配置</span>
    </div>
    <!-- 表单 -->
    <div class="form">
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
      >
        <el-form-item label="网站名称：" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="网站简称：" prop="region">
          <el-input v-model="ruleForm.mini_name" />
        </el-form-item>
        <el-form-item label="网站Logo：" prop="logo">
          <el-upload
            class="logo-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleLogoSuccess"
            :before-upload="beforeLogoUpload"
            :headers="uploadHeaders"
          >
            <img v-if="ruleForm.logo" :src="ruleForm.logo" class="logo-image" />
            <el-icon v-else class="logo-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <div class="upload-tip">建议尺寸：200x200px，支持 jpg/png 格式</div>
        </el-form-item>
        <el-form-item label="网站电话：" required>
          <el-input v-model="ruleForm.phone" />
        </el-form-item>
        <el-form-item label="网站邮箱：" prop="delivery">
          <el-input v-model="ruleForm.e_mail" />
        </el-form-item>
        <el-form-item label="网站邮编：" prop="location">
          <el-input v-model="ruleForm.post" />
        </el-form-item>
        <!-- 图集上传：支持多张图片 -->
        <el-form-item label="网站图集：" prop="all_img">
          <el-upload
            class="gallery-uploader"
            :action="uploadUrl"
            list-type="picture-card"
            :on-success="handleGallerySuccess"
            :on-remove="handleGalleryRemove"
            :before-upload="beforeGalleryUpload"
            :file-list="galleryFileList"
            :headers="uploadHeaders"
            multiple
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <div class="upload-tip">支持批量上传，建议尺寸：800x600px</div>
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" @click="submitForm">保存配置</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" name="Console" setup>
import { useNameStore } from '@/store/nameStore'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules, UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
interface RuleForm {
  name: string
  mini_name: string
  logo: string
  phone: string
  e_mail: string
  post: string
  all_img: string[]
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: 'FUNNING LEARN英语学习网站',
  mini_name: 'FUNNING LEARN',
  logo: '',
  phone: '15633737861',
  e_mail: '2998662679@qq.com',
  post: '000000',
  all_img: []
})

// 图集文件列表（用于 el-upload 展示）
const galleryFileList = ref<UploadUserFile[]>([])

// 上传接口地址（需要替换为你的实际后端接口）
const uploadUrl = ref('https://your-api.com/upload')

// 上传请求头（如需要 token 认证）
const uploadHeaders = ref({
  Authorization: `Bearer ${localStorage.getItem('token') || ''}`
})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入网站名称', trigger: 'blur' },
    { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
  ],
  logo: [{ required: true, message: '请上传网站Logo', trigger: 'change' }]
})
// ========== Logo 上传相关 ==========

// Logo 上传前的校验
const beforeLogoUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 限制文件类型
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (!allowedTypes.includes(rawFile.type)) {
    ElMessage.error('Logo 只支持 JPG/PNG 格式!')
    return false
  }
  // 限制文件大小（2MB）
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Logo 大小不能超过 2MB!')
    return false
  }
  return true
}

// Logo 上传成功的回调
const handleLogoSuccess: UploadProps['onSuccess'] = (response) => {
  // 假设后端返回格式: { code: 200, data: { url: '图片地址' } }
  if (response.code === 200) {
    ruleForm.logo = response.data.url
    ElMessage.success('Logo 上传成功!')
  } else {
    ElMessage.error('Logo 上传失败!')
  }
}

// ========== 图集上传相关 ==========

// 图集上传前的校验
const beforeGalleryUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (!allowedTypes.includes(rawFile.type)) {
    ElMessage.error('图片只支持 JPG/PNG 格式!')
    return false
  }
  if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('图片大小不能超过 5MB!')
    return false
  }
  return true
}

// 图集上传成功的回调
const handleGallerySuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  if (response.code === 200) {
    // 将图片 URL 添加到数组
    ruleForm.all_img.push(response.data.url)

    // 更新文件列表用于展示
    galleryFileList.value.push({
      name: uploadFile.name,
      url: response.data.url
    })

    ElMessage.success('图片上传成功!')
  } else {
    ElMessage.error('图片上传失败!')
  }
}

// 图集删除的回调
const handleGalleryRemove: UploadProps['onRemove'] = (uploadFile) => {
  // 从数组中移除对应的图片 URL
  const index = ruleForm.all_img.indexOf(uploadFile.url as string)
  if (index > -1) {
    ruleForm.all_img.splice(index, 1)
  }

  // 更新文件列表
  const fileIndex = galleryFileList.value.findIndex((file) => file.url === uploadFile.url)
  if (fileIndex > -1) {
    galleryFileList.value.splice(fileIndex, 1)
  }
}

// ========== 表单提交 ==========

const submitForm = async () => {
  if (!ruleFormRef.value) return

  await ruleFormRef.value.validate((valid) => {
    if (valid) {
      // 这里调用你的保存接口
      console.log('提交的表单数据:', ruleForm)
      // 示例：调用后端保存接口
      // saveWebsiteConfig(ruleForm).then(() => {
      //   ElMessage.success('保存成功!')
      // })

      ElMessage.success('配置保存成功!')
    } else {
      ElMessage.error('请完善表单信息!')
      return false
    }
  })
}

const resetForm = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
  galleryFileList.value = []
}

// ========== 初始化数据（从后端获取已有配置） ==========

// 如果后端已有数据，需要回显
// const loadWebsiteConfig = async () => {
//   // 示例：从后端获取配置
//   // const config = await getWebsiteConfig()
//   // Object.assign(ruleForm, config)

//   // 如果有图集数据，需要转换为文件列表格式
//   // galleryFileList.value = ruleForm.all_img.map((url, index) => ({
//   //   name: `image-${index}.jpg`,
//   //   url: url
//   // }))
// }

// 页面加载时获取配置
// loadWebsiteConfig()

const { Breadcrumbs, sys_settings } = useNameStore()
Breadcrumbs[0] = sys_settings
Breadcrumbs[1] = sys_settings
</script>
<style scoped>
.ss_body {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
}
.upper {
  margin: 0px 10px;
  height: 40px;
  width: 100%;
  line-height: 40px;
  border-bottom: 2px solid #e6e6e6;
}
.upper span {
  color: #3e81df;
  border-bottom: 2px solid #3e81df;
  display: inline-block;
}
.form {
  flex: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
}
/* Logo 上传样式 */
.logo-uploader :deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.logo-uploader :deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}

.logo-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}

.logo-image {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover;
}

/* 图集上传样式 */
.gallery-uploader :deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 148px;
  height: 148px;
}

.gallery-uploader :deep(.el-upload--picture-card) {
  width: 148px;
  height: 148px;
}

.upload-tip {
  color: #999;
  font-size: 12px;
  margin-top: 8px;
}
.button {
  display: flex;
  justify-content: flex-end;
}
/* 覆盖 Element Plus 默认样式 */
.button :deep(.el-form-item__content) {
  justify-content: flex-end;
}
</style>
