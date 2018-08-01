<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: 100%;" id="char_view">

    </div>
    <button type="button" @click="addOptions">增加</button>
    <button type="button" @click="clearChart">清除</button>
  </div>

</template>

<script>
  import echarts from 'echarts'
  export default {
    name: '',
    data () {
      return {
        chart1: null,
        option: {
          legend: {
            data: ['bar', 'bar2', 'bar3', 'bar4'],
            align: 'left',
            left: 10
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: []
        }
      }
    },
    methods:{
      addOptions:function (options) {

      },
      clearChart:function () {
        this.chart1.clear();
      },
      getAllData:function () {
        this.$ajax.get("./../../static/data.json").then((data)=>{
          this.option.legend.data[0]= "折线图";
          this.option.series[0]= {
              name:"折线图",
              data: data.data.data,
              type: 'line'
            };
          this.chart1.setOption(this.option)
        })
        this.$ajax.get("./../../static/data2.json").then((data)=>{
          this.option.legend.data[1]= "柱状图";
          this.option.series[1]= {
            name:"柱状图",
            data: data.data.data,
            type: 'bar'
          };
          this.chart1.setOption(this.option)
        })
      }
    },
    mounted: function () {
       this.chart1 = echarts.init(document.getElementById("char_view"));
       this.getAllData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
