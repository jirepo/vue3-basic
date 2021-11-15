export const MyHighlightDirective = {
  beforeMount(el, binding, vnode, prevVnode) {
    // el.style.background = binding.value
    // console.log(el);   // bind된 요소 
    // console.log(binding.value);  // v-highlight로 전달된 값
    // console.log(binding.name); // v- 프리픽스 없음. highlight
    el.style.background = binding.value.color; 

  },
  updated(el, binding, vnode, prevVnode) { 
    // console.log('updated')
    el.style.background = binding.value.color; 
  }
}

