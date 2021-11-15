<template>
  <div>
    <h1>Home</h1>
  </div>
  
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    console.log(route.query.uname)
  }
  
}
</script>
