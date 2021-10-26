<script setup>

import { ref } from 'vue'
//import MyButton from '@/components/c11-slots/MyButton.vue'
//import NamedSlot from '@/components/c11-slots/NamedSlot.vue'
import SlotScope from '@/components/c11-slots/SlotScope.vue'


</script>

<template>
  <div>
    <slot-scope v-slot:default="slotProps">{{slotProps.user.firstName}}</slot-scope>
  </div>
</template>

<style>
</style>