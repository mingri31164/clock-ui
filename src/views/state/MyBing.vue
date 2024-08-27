<template>
  <div>
    <div id="bing" style="padding-top: 40px;  width: 600px;height: 600px;"></div>
  </div>
</template>

<script setup>

import * as echarts from 'echarts';
import { onMounted,defineProps } from 'vue';
let myChart = null; 

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
onMounted(() => {   
var chartDom = document.getElementById('bing');  
  if (chartDom) {  
    myChart = echarts.init(chartDom);  
    var option = {  

          title: {
            text: '今日活动分布',
            subtext: 'Fake Data',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data:props.data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
    }
      
    option &&myChart.setOption(option); 
  })
</script>