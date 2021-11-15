<template>
  <div>
    Main
    <br>
    <sub-comp></sub-comp>
    <child-comp></child-comp>
  </div>
</template>


<script>
import { defineComponent, ref,  provide } from 'vue';
import SubComp from '@/components/c13-inject/SubComp.vue';
import ChildComp  from '@/components/c13-inject/ChildComp.vue';

export default defineComponent({
  components: {
    SubComp , 
    ChildComp
  },
  setup() {
    const mainVal = ref("hello")
    provide("mainVal",  mainVal);
  },
})
</script>
