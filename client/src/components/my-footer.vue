<template>
  <a-layout-footer style="text-align: center">
    StackOverflow@copyright USC-EE547 {{user.username}}
  </a-layout-footer>
</template>

<script>
import { defineComponent, computed } from 'vue';
import store from '@/store';

export default defineComponent({
  name: 'my-footer',
  setup() {
    //TODO: initialize websocket here

    const user = computed(() => store.state.user)
    console.log(user);
    return {
      user
    }
  }
}) 

</script>