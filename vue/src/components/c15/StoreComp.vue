<template>
  <div>
    <h1>StoreComp.vue</h1>
    <div>
      {{counter}}
      <br>
      {{userId}}
      <br>
      <input type="button" @click="onInc" value="Increase Counter">
      <br>
      {{postId}}
      <input type="button" @click="onSetPostId" value="Set selectedPostId">'
      <br>
      <h2>{{multiCounter}}</h2>
      <br>
      <h2>{{getPostId}}</h2>
      <br>
      <h2>{{getPostId2}}</h2>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue'
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const counter = computed(() => store.state.counter);  
    const userId  = computed(() => store.state.loginUser.userId); // 상태값 가져오기

    const postId = computed (() => store.state.blog.selectedPostId)
    const multiCounter = computed( () => store.getters.multiCount ) 
    console.log(postId.value)

    const getPostId = computed( () => store.getters['blog/getPostId'] ) 
    const getPostId2 = computed( () => store.getters['blog/getPostId2'] ) 





    const onInc = () => { 
       store.commit("setCounter", counter.value + 1); // 상태값 변경
    }
    const onSetPostId = () => {
      store.commit('blog/setSelectedPostId', "ABCDEF")
    }

    store.subscribe( (mutation, state) => {
        console.log("mutation type:" + mutation.type)
        if(mutation.type == "blog/selectedPostId") {
            console.log(mutation.payload)  // mutation에 전달된 값 
        }
    })

    return { 
      counter , userId , onInc, onSetPostId, postId, multiCounter, getPostId,getPostId2
    }
  },
})
</script>
