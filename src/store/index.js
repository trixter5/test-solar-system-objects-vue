import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    planets: [],
    currentObj: {},
    deleted: [],
    modalObjects: []
  },
  getters: {
    getDefaultObjects (state) {
      return state.planets
    },
    getCurrentObj (state) {
      return state.currentObj
    },
    getDeleted (state) {
      return state.deleted
    },
    getModalObjects (state) {
      return state.modalObjects
    }
  },
  mutations: {
    setPlanet (state, payload) {
      state.planets = payload
    },
    setModalObjects (state, payload) {
      state.modalObjects = payload
    },
    updatePlanets (state, id) {
      const ind = state.planets.findIndex(el => el.id === id)
      state.planets.splice(ind, 1)
    },
    setDeleted (state, payload) {
      state.deleted.push(payload)
    },
    updateObj (state, payload) {
      const ind = state.planets.findIndex(el => el.id === payload.id)
      const item = state.planets[ind]
      const obj = payload.obj

      const newObj = {
        name: obj.name || item.name,
        discoveredBy: obj.discoveredBy || item.discoveredBy,
        discoveryDate: obj.discoveryDate || item.discoveryDate,
        isPlanet: obj.isPlanet || item.isPlanet
      }
      Object.assign(item, newObj)
    },
    setCurrentObj (state, payload) {
      state.currentObj = payload
    },
    setObject (state, payload) {
      state.planets.unshift(payload)
    }
  },
  actions: {
    async fetchDefaultObjects (context) {
      await axios.get('https://api.le-systeme-solaire.net/rest/bodies?page=1&order=id').then((res) => {
        context.commit('setPlanet', res.data.bodies)
      }).catch(err => console.error(err))
    },
    async fetchModalObjects (context) {
      await axios.get('https://api.le-systeme-solaire.net/rest/bodies').then((res) => {
        context.commit('setModalObjects', res.data.bodies)
      }).catch(err => console.error(err))
    },
    async fetchCurrentObject (context, payload) {
      const url = `https://api.le-systeme-solaire.net/rest/bodies/${payload.id}`
      await axios.get(url).then((res) => {
        context.commit('setCurrentObj', res.data)
      })
    },
    deleteById (context, payload) {
      const ind = context.state.planets.findIndex(el => el.id === payload)
      const obj = context.state.planets[ind]
      context.commit('updatePlanets', payload)
      context.commit('setDeleted', obj)
    },
    addItem (context, obj) {
      context.commit('setObject', obj)
    }
  },
  modules: {
  }
})
