import goodsApi from '../service/goods'

export default {
  state: {
    slider:[],
    keys:[],
    goodsInfo: null
  },
  mutations: {
    setGoodsInfo(state,{slider,keys,goodsInfo}){
      state.slider = slider
      state.keys = keys
      state.goodsInfo = goodsInfo
    },
    
  },
  getters: {
    // 添加goods属性，将对象类型goodsInfo中的数组拍平成一个数组
    goods: state => {
      return state.keys.map(key => {
        return state.goodsInfo[key]
      }).reduce((prev,next) => prev.concat(next), [])
    }
  },
  actions: {
    getGoodsInfo({state,commit}){
      // if(!state.goodsInfo){
        goodsApi.getGoodsList().then(res => {
          commit('setGoodsInfo',res)
        })
      // }
    }
  },
  modules: {
  }
}
