<template>
  <div>
    <h1>User</h1>
    <input type="button" value="Go Home"  @click="onGoHome">
    <router-view></router-view>
  </div>
  
</template>
<script>
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    // router 
    const router = useRouter(); 
    
    const onGoHome = () => { 
       router.push({ name: 'Home', query: {  uname: 'Hong'}})
    }

    return {
      onGoHome 
    }
  },
})
</script>

