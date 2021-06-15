<template>
  <div class="about">
    <h1>Current object: {{ id }}</h1>
    <ul class="about__list">
      <li v-for="( value, name ) in getCurrentObj" :key="name">
        <strong>{{ name }}:</strong> <span v-if="!getChildObj(value)">{{ value }}</span>
        <ul v-if="getChildObj(value)" class="about__list">
          <li v-for="( value1, name1 ) in value" :key="name1">
            <strong>{{ name1 }}:</strong> {{ value1 }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {

  props: {
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      getCurrentObj: 'getCurrentObj'
    })
  },
  methods: {
    ...mapActions({
      fetchCurrentObj: 'fetchCurrentObject'
    }),
    getChildObj (val) {
      return typeof val === 'object'
    }
  },
  mounted () {
    this.fetchCurrentObj({ id: this.id })
  }
}
</script>
<style lang="scss">
.about {
  padding: 1rem;
  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: left;
    li {
      padding: 0.4rem 0;
    }
  }
  &__list &__list {
    padding-left: 2rem;
  }
}
</style>
