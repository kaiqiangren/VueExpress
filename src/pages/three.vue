<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #threeBox{
      width: 100%;
      height: 100%;
    }
    #innerBox{
      width:200px;
      height: 200px;
      margin-left: 400px;
      margin-top: 200px;
      /*border: 1px solid red;*/
      perspective: 0;
      /*overflow: hidden;*/
      perspective-origin: 50% 50%;
      transform-style: preserve-3d;
      /*animation: move 5s infinite  linear;*/
    }
    #innerBox:hover{
      animation: move 8s infinite linear;
    }
   #innerBox>div{
     width:200px;
     height: 200px;
     text-align: center;
     line-height: 200px;
     opacity: .5;
     position: absolute;
     border-radius: 50%;
   }

    @keyframes move {
      0%   {
        transform:rotateX(0deg) rotateY(0deg) rotateZ(0deg);
      }
      100% {
        transform:rotateX(360deg) rotateY(360deg) rotateZ(360deg);
      }
    }
    .up{
      transform: rotateX(-90deg) translateZ(-100px);
      background:red;
    }
    .down{
      background:orange;
      transform:rotateX(-90deg) translateZ(100px);
    }
    .left{
      background:yellow;
      transform:rotateY(-90deg) translateZ(100px);
    }
    .right{
      background:blue;
      transform:rotateY(-90deg) translateZ(-100px);
    }
    .before{
      background:cyan;
      transform:translateZ(100px);
    }
    .after{
      background:purple;
      transform:translateZ(-100px);
    }
</style>
<template>
    <div id="threeBox">
      <div id="innerBox">
        <div class="up">1</div>
        <div class="down">2</div>
        <div class="left">3</div>
        <div class="right">4</div>
        <div class="before">5</div>
        <div class="after">6</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'three',
        data () {
            return {}
        },
        mounted:function () {

        }
    }
</script>

