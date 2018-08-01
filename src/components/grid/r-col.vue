<template>
  <div class="r-col">

  </div>
</template>

<script>
  export default {
    name: 'r-col',
    props: ['span'],
    data () {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .r-col {
    grid-column-start: 0;
    grid-column-end: 24;
  }
</style>
