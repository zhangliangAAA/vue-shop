import userApi from '../service/user'

export default {
  state: {
    isLogin: !!localStorage.getItem('token')
  },
  mutations: {
    setLoginState(state,b){
      state.isLogin = b
    },
    
  },
  actions: {
    login({commit},user){
      //登录
      console.log('actions');
      
      return userApi.login(user).then(res => {
        const {code,token} = res.data
        if(code){ //登录成功
          commit('setLoginState',true)
          localStorage.setItem('token',token)
        }
        return code
      })
    },
    logout({commit}){
      localStorage.clear()
      commit('setLoginState',false)
    }
  },
  modules: {
  }
}
