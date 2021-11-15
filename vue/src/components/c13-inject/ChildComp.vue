<template>
  <div>
    <h1>Child Component</h1>
    {{mainVal}}
  </div>
  
</template>
<script>
import { defineComponent, inject } from 'vue'

export default defineComponent({
  setup() {
    const mainVal = inject("mainVal")    
    return { 
      mainVal 
    }
  },
})
</script>
