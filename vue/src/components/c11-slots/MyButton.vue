<template>
  <div>
    <div>
    <slot>
      제공된 컨텐츠가 없는 경우에 볼 수 있다. 
    </slot>
    </div>
    <div>
      <input type="button" value="Input">
    </div>
    
  </div>
</template>

<script>
export default {
  setup() {
  },
}
</script>

<style scoped>
div { 
  background-color: yellow; 
}
</style>