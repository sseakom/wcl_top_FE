import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import modules from './modules'

Vue.use(Vuex)

const state = {
    userCache: {}, //用户数据缓存
}

export default new Vuex.Store({ state, mutations, actions, getters, modules })