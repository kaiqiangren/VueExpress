<template>
    <div>
      <button type="button" @click="sendMsg">send</button>
    </div>
</template>

<script>
    export default {
        name: 'test',
        data () {
            return {
                newTitle:'hhh'
            }
        },
        methods:{
          sendMsg:function () {
            this.$emit('test', this.newTitle)
          }
        },
        mounted:function () {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
