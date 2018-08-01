<template>
  <div style="width: 100%">
    <ul class="navMenu">
      <li class="navMenuItem">1111</li>
      <li class="navMenuItem">2222</li>
      <li class="navMenuItem">3333</li>
      <li class="navMenuItem">4444</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'navMenu',
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  ul, li {
    list-style: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  @itemWith:200px;
  @navHeight:40px;
  .navMenu{
    width:@itemWith*4;
    margin: 0 auto;
    height: @navHeight;
    background: #ccc;
    .navMenuItem{
      float: left;
      width:@itemWith;
      height: @navHeight;
      line-height: @navHeight;
      text-align: center;
      border: 1px solid black;
      border-right: none;
      cursor: pointer;
    }
    .navMenuItem:last-child{
      border-right: 1px solid black;
    }
   .navMenuItem:after{
      content: '';
      width: 0;
      transform: translateX(-60%);
      position: absolute;
      transition: width 1s;
    }
    .navMenuItem:hover:after{
      content: '';
      width: @itemWith;
      transform: translateX(-59%);
      position: absolute;
      border-bottom: 2px solid red;
      top: @navHeight;
    }
  }
  .border(@border_width){
    border:@border_width solid blue;
  }
  /*@media only screen and (min-width: 1200px) and (max-width: 1366px) {*/
    /*.navMenu {*/
      /*background: yellow;*/
    /*}*/
  /*}*/
</style>
