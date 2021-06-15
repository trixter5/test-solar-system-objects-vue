<template>
  <div class="home">
    <h1>Solar System</h1>
    <div class="home__filter filter">
      <button @click="toggleModal('', 'add')" v-if="!showDeleted" class="btn btn--add filter__el">Add new object</button>
      <button @click="showDeleted = !showDeleted" :class="['btn filter__el', showDeleted ? 'btn--edit' : 'btn--cancel']">{{!showDeleted ? 'show deleted objects' : 'show all objects'}}</button>
      <form v-if="!showDeleted" action="" class="filter__form filter__el">
        <label for="search">Search by fields</label>
        <input id="search" v-model="search" type="text" placeholder="type something">
      </form>

      <Select v-if="!showDeleted" class="filter__el" @change="setShowBy($event)" :arr="showByArr" label="Show by"></Select>
    </div>
    <Table v-if="!showDeleted" @delete="toggleModal($event, 'sure')" @edit="toggleModal($event, 'edit')" :arr="getPagesObjects" :filter="search"></Table>
    <Table v-if="showDeleted" deleted :arr="getDeletedObjects"></Table>
    <Pager v-if="!showDeleted && showPager" @changePage="setPage($event)" :pages="pages"></Pager>
    <Modal @close="toggleModal($event, 'edit')" v-if="modalOpen['edit']">
      <template #header>
        Edit Solar Object <strong>{{ activeObj }}</strong>
      </template>
      <template #body>
        <form calss="form" action="">
          <div class="form__group">
            <label for="name" class="form__label">name:</label>
            <input class="form__control" :value="getActiveObj.name" @input="e => setObj(e,'name')" type="text">
          </div>
          <div class="form__group">
            <label for="discoveredBy" class="form__label">discovered by</label>
            <input class="form__control" :value="getActiveObj.discoveredBy" @input="e => setObj(e, 'discoveredBy')" type="text">
          </div>
          <div class="form__group">
            <label for="discoveryDate" class="form__label">discovery date</label>
            <input class="form__control" :value="getActiveObj.discoveryDate" @input="e => setObj(e, 'discoveryDate')" type="text">
          </div>
          <div class="form__group">
            <label for="isPlanet" class="form__label">is planet?</label>
            <input class="form__control" :value="getActiveObj.isPlanet" @change="($event) => setObj($event, 'isPlanet')" type="checkbox">
          </div>
        </form>
      </template>
      <template #footer>
        <div class="btns">
          <button @click="updateObj" class="btn btn--add">OK</button>
        </div>
      </template>
    </Modal>
    <Modal @close="toggleModal($event, 'sure')" v-if="modalOpen['sure']">
      <template #header>
        Are you sure you want to delete Solar Object <strong>{{ activeObj }}</strong>?
      </template>
      <template #footer>
        <div class="btns">
          <button @click="toggleModal($event, 'sure')" class="btn btn--cancel">Cancel</button>
          <button @click="deleteObj" class="btn btn--delete">Delete</button>
        </div>
      </template>
    </Modal>
    <Modal @close="toggleModal($event, 'add')" v-show="modalOpen['add']">
      <template #header>
        Add new object
      </template>
      <template #body>
        <div class="home__filter filter">
          <form action="" class="filter__form filter__el">
            <label for="search1">Search by fields</label>
            <input id="search1" v-model="search1" type="text" placeholder="type something">
          </form>

          <Select class="filter__el" @change="setShowByModal($event)" :arr="showByArr" label="Show by"></Select>
        </div>
        <Table add :arr="getPagesObjectsModal" :filter="search1"></Table>
        <Pager @changePage="setPageModal($event)" :pages="modalPages"></Pager>
      </template>
      <template #footer>
        <button @click="toggleModal($event, 'add')" class="btn btn--add">OK</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Table from './../components/Table'
import Modal from './../components/Modal'
import Pager from './../components/Pager'
import Select from './../components/Select'

export default {
  components: {
    Table,
    Modal,
    Pager,
    Select
  },
  data () {
    return {
      modalOpen: {
        edit: false,
        sure: false,
        add: false
      },
      activeObj: null,
      showByArr: [10, 20],
      pageLength: 10,
      pageLengthModal: 10,
      activePage: 1,
      activeModalPage: 1,
      pages: 1,
      modalPages: 1,
      showPager: true,
      showPagerModal: true,
      search: '',
      search1: '',
      newObj: {
        name: '',
        discoveredBy: '',
        discoveryDate: '',
        isPlanet: false
      },
      showDeleted: false
    }
  },
  watch: {
    getDefaultObjects (val) {
      this.pages = Math.ceil(val.length / this.pageLength) || 1
    },
    getModalObjects (val) {
      this.modalPages = Math.ceil(val.length / this.pageLengthModal) || 1
    },
    pageLength (val) {
      this.showPager = (this.getDefaultObjects.length / val) !== 1 || false
    },
    pageLengthModal (val) {
      this.showPagerModal = (this.getModalObjects.length / val) !== 1 || false
    },
    activeModalPage (val) {
      this.fetchModalObjects(val)
    }
  },
  computed: {
    ...mapGetters({
      getDefaultObjects: 'getDefaultObjects',
      getModalObjects: 'getModalObjects',
      getDeletedObjects: 'getDeleted'
    }),
    getShowByObjects () {
      return this.getDefaultObjects.slice(0, this.pageLength)
    },
    getShowByObjectsModal () {
      return this.getModalObjects.slice(0, this.pageLengthModal)
    },
    getPages () {
      return this.getDefaultObjects.length / this.pageLength
    },
    getPagesModal () {
      return this.getModalObjects.length / this.pageLengthModal
    },
    getPagesObjects () {
      const start = this.activePage === 1 ? this.activePage - 1 : this.activePage * this.pageLength - this.pageLength
      const end = start + this.pageLength
      return this.getDefaultObjects.slice(start, end)
    },
    getPagesObjectsModal () {
      const start = this.activeModalPage === 1 ? this.activeModalPage - 1 : this.activeModalPage * this.pageLengthModal - this.pageLengthModal
      const end = start + this.pageLengthModal
      return this.getModalObjects.slice(start, end)
    },
    getActiveObj: {
      get () {
        return this.$store.state.planets.find(el => el.id === this.activeObj)
      },
      set (value) {
        this.$store.commit('updateObj', value)
      }

    }
  },
  methods: {
    ...mapActions({
      fetchDefaultObjects: 'fetchDefaultObjects',
      fetchModalObjects: 'fetchModalObjects',
      deletePlanet: 'deleteById'
    }),
    deleteObj () {
      this.deletePlanet(this.activeObj)
      this.toggleModal('', 'sure')
    },
    toggleModal (id, type) {
      !this.activeObj ? this.activeObj = id : this.activeObj = null
      this.modalOpen[type] = !this.modalOpen[type]
    },
    setShowBy (e) {
      this.pageLength = +e
    },
    setShowByModal (e) {
      this.pageLengthModal = +e
    },
    setPage (e) {
      this.activePage = e
    },
    setPageModal (e) {
      this.activeModalPage = e
    },
    updateObj () {
      this.$store.commit('updateObj', { obj: this.newObj, id: this.activeObj })
      this.toggleModal('', 'edit')
    },
    setObj (e, key) {
      if (key === 'isPlanet') {
        this.newObj[key] = e.target.checked
      } else {
        this.newObj[key] = e.target.value
      }
    }
  },
  mounted () {
    this.fetchDefaultObjects()
    this.fetchModalObjects(this.activeModalPage)
  }
}
</script>
<style lang="scss">
.home {
  &__filter {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    margin: 1rem auto;
    width: 80%;
    @media screen and (max-width: 767px) {
      width: 95%;
    }
  }
  .filter {
    label {
      margin-right: 1rem;
    }
    &__el {
      @media screen and (max-width: 767px) {
        margin-bottom: 1rem;
        justify-content: flex-start;
      }
    }
  }

  .modal .table-outer {
    max-height: 30rem;
  }
}
</style>
