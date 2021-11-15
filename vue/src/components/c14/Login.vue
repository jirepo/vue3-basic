<template>
  <div>
    <h1>Login</h1>
  </div>
  
</template>
<script>
import { watch  } from 'vue'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    console.log(route.params)
    console.log(route.params.id)

    watch( () => route.params, (newVal, oldVal) => {
     console.log("old=>" + oldVal.id)
     console.log("new=>" + newVal.id)
    })
  }
}
</script>
