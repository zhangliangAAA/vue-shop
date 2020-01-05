<template>
  <div class="home">
    <Header title="淘宝">
      <i class="cubeic-tag"></i>
    </Header>
    <!-- 轮播 -->
    <cube-slide
      v-if="slider.length"
      ref="slide"
      :data="slider"
      @change="changePage"
    >
      <cube-slide-item
        v-for="(item, index) in slider"
        :key="index"
        @click.native="clickHandler(item, index)"
      >
        <router-link :to="`/detail/${item.id}`">
          <img  class="slider-img" :src="item.img">
        </router-link>
      </cube-slide-item>
    </cube-slide>
    <GoodsList :data="goods" @cartanim="($event) => startCartAnim($event)"></GoodsList>
    <!-- 动画 -->
    <!-- <cart-anim ref="ca"></cart-anim> -->
  </div>
</template>

<script>
import axios from 'axios'
import GoodsList from '@/components/GoodsList.vue'
import CartAnim from "@/components/CartAnim.vue";
import Header from '@/components/Header.vue';

import {mapState,mapActions,mapGetters} from 'vuex'

export default {
  name: 'home',
  components: {
    GoodsList,
    CartAnim,
    Header
  },
  data() {
    return {
      // slider: [
      //   {
      //     url: 'http://www.didichuxing.com/',
      //     image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
      //   },
      //   {
      //     url: 'http://www.didichuxing.com/',
      //     image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
      //   },
      //   {
      //     url: 'http://www.didichuxing.com/',
      //     image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
      //   }
      // ]
    }
  },
  created(){
    this.getGoodsInfo()
  },
  mounted() {

  },
  computed:{
    ...mapState({slider: state => state.goods.slider}),
    ...mapGetters(['goods'])
  },
  methods: {
    ...mapActions(['getGoodsInfo']),
     startCartAnim(el) {
      // 原始
      // this.$refs.ca.start(el)
      // 方式1
      // 创建小球动画实例，开始动画
      // const anim = this.$createCartAnim({
      //   onTransitionend(){
      //     anim.remove();
      //   }
      // });
      // anim.start(el)

      // 方式2
      const anim = this.$create(CartAnim);
      anim.start(el);
      anim.$on("transitionend", anim.remove);
    },
    test() {
      // this.$store.dispatch('getGoodsInfo')
      // axios.get('/api/userinfo')
    },
    changePage(current) {
      console.log('当前轮播图序号为:' + current)
    },
    clickHandler(item, index) {
      console.log(item, index)
    }
  }
}
</script>

<style>
.slider-img{
  width: 100%;
}
</style>