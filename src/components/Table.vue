<template>
  <div class="table-outer">
    <table>
      <thead>
      <tr>
        <td @click="sortBy('name')" :class="{'active' : 'name' === sortKey}">name <span class="arrow" :class="sortOrders['name'] > 0 ? 'asc' : 'dsc'"></span></td>
        <td>Discovered by:</td>
        <td>Discovery date</td>
        <td @click="sortBy('isPlanet')" :class="{'active' : 'isPlanet' === sortKey}">Planet? <span class="arrow" :class="sortOrders['isPlanet'] > 0 ? 'asc' : 'dsc'"></span></td>
        <td>{{add ? 'add' : 'edit'}}</td>
        <td v-if="!add">delete</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="obj in getFilteredObjects" :key="obj.id">
        <td>
          <router-link v-if="!add" :to="'about/' + obj.id">{{ obj.name }}</router-link>
          <span v-else>{{ obj.name }}</span>
        </td>
        <td> {{ obj.discoveredBy }} </td>
        <td> {{ obj.discoveryDate }} </td>
        <td> {{ obj.isPlanet ? "yes" : "no" }} </td>
        <td>
          <button v-if="!deleted && !add" @click="editPlanet(obj.id)" class="btn btn--edit">
            &#9998;
          </button>
          <button @click="addItem(obj)" v-if="add && !getAdded(obj.id)" class="btn btn--edit">
            add
          </button>
          <span v-if="getAdded(obj.id) && add"> already </span>
        </td>
        <td>
          <button v-if="!deleted && !add" @click="deletePlanet(obj.id)" class="btn btn--delete">
            &#128465;
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Table',
  props: {
    arr: {
      type: Array
    },
    filter: {
      type: String
    },
    deleted: {
      type: Boolean
    },
    add: {
      type: Boolean
    }
  },
  data () {
    return {
      sortKey: '',
      sortOrders: {
        name: 1,
        isPlanet: 1
      }
    }
  },
  computed: {
    ...mapGetters({
      getDefaultObjects: 'getDefaultObjects'
    }),
    getFilteredObjects () {
      let objects = this.arr
      const filter = this.filter
      const sortKey = this.sortKey
      const order = this.sortOrders[sortKey] || 1
      if (filter) {
        objects = this.arr.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(filter) > -1
            )
          })
        })
      }
      if (sortKey) {
        objects = objects.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return objects
    }
  },
  methods: {
    ...mapActions({
      addItem: 'addItem'
    }),
    deletePlanet (id) {
      this.$emit('delete', id)
    },
    editPlanet (id) {
      this.$emit('edit', id)
    },
    sortBy (type) {
      this.sortKey = type
      this.sortOrders[type] = this.sortOrders[type] * -1
    },
    getAdded (id) {
      return this.getDefaultObjects.find(el => el.id === id)
    }
  }
}
</script>

<style lang="scss">
$tableHead: #000000;
$tableRowBorder: #c0c0c0;
.table-outer {
  width: 80%;
  min-width: 90rem;
  max-height: 50rem;
  margin: 0 auto;
  overflow: auto;
  @media screen and (max-width: 767px) {
    width: 95%;
    min-width: 30rem;
  }
}
table {
  width: 100%;
  thead {
    tr {
      &:first-child {
        td {
          position: sticky;
          top: 0;
        }
      }
    }
    td {
      background: $tableHead;
      color: #c9c9c9;
      cursor: pointer;
      &.active {
        color: white;
      }
    }
  }
  tr {}
  td {
    padding: 0.4rem;
    text-align: left;
  }
  tbody {
    td {
      border-bottom: 1px solid $tableRowBorder;
    }
  }
}
.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
  &.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #ffffff;
  }
  &.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #ffffff;
  }
}
</style>
