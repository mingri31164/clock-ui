<template>
  <div>
    <div id="xian"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted,defineProps } from 'vue';


const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
console.log(props.data)
let myChart = null;
onMounted(() => {


var chartDom = document.getElementById('xian');
if (chartDom) { 
 myChart = echarts.init(chartDom);
var option;

option = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: props.data,
      type: 'line',
      areaStyle: {}
    }
  ]
};
}
option && myChart.setOption(option);
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#xian {
  position: relative;
  width: 85vw;
  height: 700px;
  overflow: auto;
}

</style>