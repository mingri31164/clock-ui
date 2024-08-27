
<template>  
  <div>  
    <div id="map-container"></div>  
    
	

  </div> 
  
</template>  
<script setup>
 /* eslint-disable */
import { onMounted, onUnmounted} from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus'


const store = useStore()
let map = null;
const points = ['柳德堡的衣柜','大学生活动中心','观音山']
onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "7621ac9b9ace5a42f96cd9120127b151",
  };
  AMapLoader.reset()
  
  AMapLoader.load({
    key: "6c690d272e71116212b196e00c953f0b", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Geolocation","AMap.CircleEditor"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then( (AMap) => {
      
      map = new AMap.Map("map-container", {
        // 设置地图容器id
        viewMode: "2D", // 是否为3D地图模式
        zoom: 18, // 初始化地图级别
        center: [110.417017,25.312023], // 初始化地图中心点位置
      });
     
			var geolocation = new AMap.Geolocation({
				enableHighAccuracy: true,//是否使用高精度定位，默认:true
				timeout: 10000,          //超过10秒后停止定位，默认：5s
				position:'RB',    //定位按钮的停靠位置
				offset: [10, 20],//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
		    showCircle:false,
        panToLocation: true,
        // zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
      });
			map.addControl(geolocation);
     
      geolocation.getCurrentPosition(function(status,result){
				if(status=='complete'){
					onComplete(result)
				}else{
					onError(result)
				}
			});
    
    })
  
    .catch((e) => {
      console.log('加载高德地图失败:',e);
    });
});

onUnmounted(() => {
  map?.destroy();
});

   

//解析定位结果
function onComplete(data) {
		
			const getposition = [data.position.lng,data.position.lat];//获取当前位置的经纬度
			console.log(getposition);
      var shanghaizone = {
        points:[
        [108.559336,22.943446],
        [110.415292,25.315906],
        [110.407916,25.304395],
        
        ]
      };//设置的签到点
			let setDistance = 100;//设定的打卡距离
			
			//计算当前位置与考勤点距离
			let distance1 =AMap.GeometryUtil.distance(getposition,shanghaizone.points[0]).toFixed(0);
      let distance2 = AMap.GeometryUtil.distance(getposition,shanghaizone.points[1]).toFixed(0);
        //绘制签到范围
      
			// 缩放地图到合适的视野级别
			// map.setFitView([ circle ])
      const i = distance1 < distance2 ? 0 : 1;
      const p = distance1 < distance2 ? distance1 : distance2;
       
     const Data ={
      point:points[0],
      isPoint: p < setDistance ? true : false, 
     }
     store.commit("changeUserInfo",Data)
       console.log(store.state.userInfo); 
 
    		
	    console.log(distance1);
      console.log(distance2);
			// var distancestr = '仍距'+distance+'米';
		
     

       var circle = new AMap.Circle({
				center:distance1 < distance2 ? shanghaizone.points[0] :  shanghaizone.points[1],
				radius: 100, //半径
				borderWeight: 1,
				strokeOpacity: 1,
				fillOpacity: 0.4,
			})
      map.add(circle);
		}
		//解析定位错误信息
		function onError(data) {
		console.log(data)
		}


</script>

  
<style scoped>  
#map-container{  
  width: 100%;  
  height: 700px; /* 或其他高度 */  
}  

.info hr {
  margin-right: 0;
  margin-left: 0;
  border-top-color: grey;
}

.info {
  padding: .75rem 1.25rem;
  margin-bottom: 1rem;
  border-radius: .25rem;
  position: absolute;
  top: 1rem;
  background-color: white;
  width: auto;
  min-width: 22rem;
  border-width: 0;
  right: 1rem;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
}
</style>