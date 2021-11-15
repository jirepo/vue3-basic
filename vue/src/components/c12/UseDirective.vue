<template>
  <h1>
    <p v-highlight="style"> {{desc}}  </p>
    <input @click="onClick" type="button" value="Click Me">
  </h1>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  setup() {
    const style = reactive( {
      color: 'red', 
      text: '빨간색'
    })

    const desc = ref("배경색이 빨간 색으로 표시된다.")
    const onClick = () => { 
      desc.value = "파란색으로"
      style.color = 'blue';
    }
    
    return { 
      desc ,
      onClick, 
      style
    }
  },
})
</script>

