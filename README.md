# 项目简介

A
搭建ReactNative基础框架，其中主要实现路由导航和引入redux框架管理应用数据和状态
Redux＋Redux-thunk+React-redux+Redux-act

Redux:JavaScript状态器，提供可预测的状态管理，用以构建一致化的应用
Store：统一存储所有组件的状态
Action：定义操作，和传递操作数据（state）
Reducer：根据Action命令改变State
React-redux：Redux的react绑定库，统一管理界面刷新
Redux-thunk：实现异步ActionCreator。
使用流程：

创建ActionType
根据ActionType定义Action
完成Action定义之后，定义Reducer（管理state）。通过dispatch方法刷新State。Action => Dispatcher => Store => View
定义Store
通过combineReducers合并多个模块的reducer
通过Provider组件将Store注入进整个app

//用redux-thunk支持异步Action
//Middleware提供的是位于action发起之后，到达reducer之前的扩展点
import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer  from '../reducers/index';
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
export default function configureStore(initialState){
const store = createStoreWithMiddleware(rootReducer,initialState);
return store;
}
Redux-act：Redux创建Actions和Reducers的便利第三方库
项目结构说明

Containers目录

存放页面容器文件夹
Components目录

存放自定义组件文件夹
reducers目录

创建Actions
创建Reducers
更新state数据
selectors目录

查询state数据
部分函数及类库说明：

ActionCreator：创建Action方法
combineReducers：合并多个Reducer
bindActionCreators：简化state数据的更新流程。

//通过dispatch方法更新store数据
store.dispatch(actionCreator(...arg));
//简化封装
var actionCreators = bindActionCreators(actions,dispatch);
connect：React-Redux类库中的函数，主要为React组件提供store中的部分state数据及dispatch方法。从而使得React组件可以通过dispatch方法来更新全局state。

//在React组件中，如果希望让组件通过调用函数来更新state，可以通过适用const actions = bindActionCreators(actions,dispatch);将actions和dispatch揉在一起，成为具备操作store.state的action。最终将actions和state以props传入子组件中。
function mapStateToProps(state){
isActive:ViewSelector.isActive(state),
}
function mapDispatchToProps(dispatch){
isActive:bindActionCreators(ViewActions,dispatch),
}
//最终暴露经connect处理后的组件
module.export = connect(mapStateToProps,mapDispatchToProps)(MainScreen);
//从而使得子组件不必关心自己的state，只需要从Props读取对应的Reducer函数中的state即可，弱化了组件自身维护state的机制，将双数据流Props和State整合为了单一数据流Props
Props理解为父组件向子组件传递的参数，子组件不可修改Props

state理解为子组件自身用于展示或者自己可以修改的数据

ReactComponentWithPureRenderMixin：优化页面刷新机制，在底层实现shouldComponentUpdate方法。
Immutable类库：利用Immutable的不可变性，减少state的刷新频率。Reducer中的state为Immutable数据。
Redux-persist+Redux-persist-transform-immutable：持久存储数据，把数据存储到AsyncStorage存储系统中。