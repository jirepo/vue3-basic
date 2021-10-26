<template>
  <div>
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>
<script>
import { defineComponent , ref  } from 'vue'

export default defineComponent({
  setup() {

    const childMessage = ref("자식 메시지이다")
    return  {
      childMessage 
    }
  },
})
</script>
