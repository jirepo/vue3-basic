<template>
   <slot v-bind:user="user">이건 이름이 없는 슬롯</slot>
</template>
<script>
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    let user = reactive({
      lastName: "김",
      firstName: "장군",
    });
    return {
      user,
    };
  },
});
</script>
