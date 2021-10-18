<script>
import { defineComponent, ref, reactive } from "vue";

export default defineComponent({

  setup(props, context) {

    const styleObject = reactive( {
      color: 'red',
      fontSize: '30px'
    })

    return {
      styleObject,
    };

  },
});
</script>
<template>
  <div :style="styleObject" >
    hello
  </div>
</template>
<style scoped>
</style>