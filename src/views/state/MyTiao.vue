<template>
  <div>
    <div id="tiao" > 
      
    </div>
  </div>
</template>

<script setup>
import { onMounted,defineProps } from 'vue'
import * as echarts from 'echarts';

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

let myChart = null

onMounted(() => {
  const now = new Date();  
  const year = now.getFullYear();  
      // 获取月份（注意月份是从0开始的，所以要+1）  
      const month = now.getMonth() + 1;  
       // 创建一个表示下个月第一天的Date对象  
       const nextMonthFirstDay = new Date(year, month, 1);  
         // 最稳妥且符合标准的做法  
       const days = (new Date(nextMonthFirstDay - 86400000)).getDate();  
      
  var chartDom = document.getElementById('tiao');
  if (chartDom) { 
 myChart = echarts.init(chartDom);
var option;

var categoryData = [];
var barData = [];

for (var i = 0; i < days; i++) {  
      var val = i < props.data.length ? props.data[i] : 0; // 确保不会超出props.data的长度  
      categoryData.push(`${month}.${i + 1}`);  
      barData.push(echarts.number.round(val, 2));  
    }  
option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  title: {
    text: '月度打卡时长'
  },

  dataZoom: [
    {
      type: 'slider',
      start: 50,
      end: 70
    },
    {
      type: 'inside',
      start: 50,
      end: 70
    }
  ],
  xAxis: {
    data: categoryData
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      name: '打卡时长',
      data: barData,
      itemStyle: {
        color: '#77bef7'
      }
    },
  ]
};
  }

 myChart.setOption(option);

})

</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
}
#tiao {
  position: relative;
  width: 85vw;
  height: 700px;
  overflow: auto;
}
:deep(canvas){
  width: 100vw;
}
</style>