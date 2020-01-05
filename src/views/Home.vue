<template>
  <div class="home">
    <h1>This is Home</h1>
    <cube-button @click="test">测试失效token</cube-button>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import axios from 'axios'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  mounted(){
    
  },
  methods: {
    test(){
      axios.get('/api/userinfo')
    }
  }
}
</script>
