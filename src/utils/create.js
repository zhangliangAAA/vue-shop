// 全局创建组件实例函数
import Vue from 'vue';

export default (Component,props) => {
  //创建vue实例,并渲染 但是不挂载
  const instance = new Vue({
    render: h => {
      console.log('创建组件----',h(Component,{props}));
      return h(Component,{props})
    }
  }).$mount() 
  console.log('$mount----',instance);
  // 生成的dom追加到body中
  document.body.appendChild(instance.$el)
  // 添加销毁
  const comp = instance.$children[0]
  comp.remove = function(){
    // 移除
    document.body.removeChild(instance.$el)
    // 自毁
    instance.$destroy();
  }
  return comp

};
