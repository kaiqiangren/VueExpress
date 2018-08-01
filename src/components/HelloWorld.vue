<template>
  <div id="hello">

  </div>
</template>

<script type="es6">
    import echarts from 'echarts';
    require('echarts/map/js/china');
    export default {
      name: 'HelloWorld',
      data () {
        return {
          options: {
            color: ["#67C23A", "#F56C6C"],
            grid: {
              left: '3%',
              right: '12%',
              bottom: '14%',
              top: '10%',
              containLabel: true
            },
            tooltip: {
              trigger: 'item',
              showDelay: 0,
//                    formatter:function (params) {
//                      let value = params.value;
//                      return params.seriesName+"响应时间:"+value[1]+"ms";
//                    },
              formatter: function (params) {
                let value = params.value;
                return params.seriesName + "响应时间:" + value[1] + "ms";
              },
              axisPointer: {
                show: true,
                type: 'cross',
                lineStyle: {
                  type: 'dashed',
                  width: 1
                },
                label: {
                  show: true
                }
              }
            },
            toolbox:{
              feature:{
                restore:{},
                saveAsImage:{},
              }
            },
            legend: {
              data: [
                {
                  name: "成功",
                  icon: "rect"
                },
                {
                  name: "异常",
                  icon: "rect"
                },
              ],
              left: '30%',
              top: "2%",
              itemGap: 50,
              selectedMode:false
            },
            dataZoom: [
              {
                type: 'slider',
                height: 15
              },
              {
                type: 'inside'
              }
            ],
            brush: {
              id: 'ren',
              toolbox: ['lineX','lineY','rect', 'polygon', 'keep', 'clear'],
              brushStyle: {
                borderWidth: 1,
                color: 'rgba(120,140,180,0.3)',
                borderColor: '#409EFF'
              },
              inBrush: {
                symbolSize: 10
              },
              throttleType: 'debounce',//只有停止动作才会触发事件
              throttleDelay: 1000,
              brushType: 'rect'
            },
            xAxis: [
              {
                type: 'time',
                scale: true,
                data: [],
                axisLabel: {
                  formatter: '{value}'
                },
                splitLine: {
                  lineStyle: {
                    type: 'dashed'
                  }
                },
//              min: 0,
//              max: 100,
              }
            ],
            yAxis: [
              {
                name: "单位:ms",
                type: 'value',
                scale: true,
                axisLabel: {
                  formatter: '{value}'
                },
                splitLine: {
                  lineStyle: {
                    type: 'dashed'
                  }
                },
//              max: 15000,
//              min: 0
              },
            ],
            series: [
              {
                name: '成功',
                type: 'scatter',
                data: [[276508, 1, 1, 18072, 1, 1],[286508, 1, 1, 18072, 1, 1]],
                symbolSize: 30,
                progressive:0,
                large: true
              },
              {
                name: '异常',
                type: 'scatter',
                data: [[276333, 1, 1, 18072, 0, 1]],
                symbolSize: 30,
                large: true,
                progressive:0
              }
            ],
            animation: true,
            animationDuration: 1000,
            animationEasing: 'cubicInOut',
            animationDurationUpdate: 300,
            animationEasingUpdate: 'cubicInOut',
            animationThreshold: 10000,
            silent:true
          },
          chart:null
        }
      },
      methods:{
        drawChart(){
          this.options.series[0].name = '成功:' + this.options.series[0].data.length;
          this.options.legend.data[0].name = '成功:' + this.options.series[0].data.length;
          this.options.series[1].name = '异常:' + this.options.series[1].data.length;
          this.options.legend.data[1].name = '异常:' + this.options.series[1].data.length;
          this.chart.setOption(this.options);

        }
      },
      beforeMount:function () {

      },
      mounted:function() {
        let _this = this;
        this.chart = echarts.init(document.getElementById("hello"));
        this.drawChart()
        window.addEventListener("resize", () => {
          _this.chart.resize()
        })

        let obj = {
            name:'123'
        }
        Object.defineProperty(obj,'name',{
            configurable:true,
            enumberable:true,
            writable:true,
            set:function (newValue) {
            },
            get:function () {
              return this.name
            }
        })
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #hello{
    width: 100%;
    height: 100%;
  }
</style>
