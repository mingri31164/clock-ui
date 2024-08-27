<!--个人中心-->
<template>
  <div style="padding: 10px">
    <el-page-header icon="" title="柳德堡的衣柜">
    <template #content>
      <span class="text-large font-600 mr-3"> 个人中心 </span>
    </template>
  </el-page-header>   

  <el-row :gutter="20" class="el-row">
    <el-col :span="4">
       <el-card class="box-card">
            <el-avatar :size="100" :src="avatarUrl" />
            
      </el-card> 
     
    </el-col>
    <el-col :span="20">
          <el-card class="box-card" >
        <template #header>
          <div class="card-header">
            <span>个人信息</span>
            </div>
          </template>
            <div>
              <el-row :gutter="16">
                
                    <el-col :span="8">
                      <div class="statistic-card">
                        <el-statistic :value="store.state.userInfo.hotday">
                          <template #title>
                            <div style="display: inline-flex; align-items: center">
                              The number of days the user was active
                              <el-tooltip
                                effect="dark"
                                content="The number of days the user was active"
                                placement="top"
                              >
                                
                              </el-tooltip>
                              
                            </div>

                          </template>
                        </el-statistic>
                         天
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="statistic-card">
                        <el-statistic :value="store.state.userInfo.hotmin">
                          <template #title>
                            <div style="display: inline-flex; align-items: center">
                              How long the user punched the card
                              <el-tooltip
                                effect="dark"
                                content="How long the user punched the card"
                                placement="top"
                              >
                                
                              </el-tooltip>
                            </div>
                          </template>
                        </el-statistic>
                      分钟
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="statistic-card">
                        <el-statistic :value="store.state.userInfo.continue" title="Consecutive active days of a user">
                          <template #title>
                            <div style="display: inline-flex; align-items: center">
                              Consecutive active days of a user
                            </div>
                          </template>
                        </el-statistic>
                         天
                      </div>
                    </el-col>
                  </el-row>
         <el-divider />

                  <el-descriptions
              class="margin-top"
              title=""
              :column="3"
              :size="size"
              border
            >
             
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    <el-icon :style="iconStyle">
                      <user />
                    </el-icon>
                    昵称
                  </div>
                </template>
                {{  store.state.userInfo.userName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    <el-icon :style="iconStyle">
                      <iphone />
                    </el-icon>
                    手机
                  </div>
                </template>
                18100000000
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    <el-icon :style="iconStyle">
                      <Location />
                    </el-icon>
                    性别
                  </div>
                </template>
                {{ store.state.userInfo.gender }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    <el-icon :style="iconStyle">
                      <tickets />
                    </el-icon>
                    职务
                  </div>
                </template>
                <el-tag size="small">{{ store.state.userInfo.roles[0]}}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    <el-icon :style="iconStyle">
                      <office-building />
                    </el-icon>
                    地址
                  </div>
                </template>
                柳德堡的衣柜
              </el-descriptions-item>
            </el-descriptions>
              
            </div> 
          </el-card>
    </el-col>
  </el-row>
  
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed,ref } from 'vue'
import { Iphone,Location,OfficeBuilding,Tickets,User} from '@element-plus/icons-vue'



  const store = useStore()
  const avatarUrl = computed(()=>{
  return store.state.userInfo.avatar ? 
  store.state.userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`;
})

const size = ref('default'); 

const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})

//组别

</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
.el-row{
  margin-top: 20px;
  .box-card{
    text-align: center;
  }
}
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
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
</style>