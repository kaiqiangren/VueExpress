<template>
  <div>
    <!--<canvas id="ctx"></canvas>-->
    canvas:{{msg}}
    <test @test="showMsg"></test>
  </div>
</template>

<script>
  import Test from "../components/test";
  export default {
    components: {Test},
    name: '',
    data () {
      return {
          msg:''
      }
    },
    methods:{
      showMsg:function (data) {
        this.msg=data;
      }
    },
    mounted: function () {
//       let ctx =  document.getElementById("ctx");
//       ctx.width = window.innerWidth/2;
//       ctx.height = window.innerHeight/2;

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #ctx {
    background-color: #ccc;
  }
</style>
