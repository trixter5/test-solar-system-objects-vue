<template>
  <ul class="pager">
    <li @click="changePage('prev')" class="pager__nav pager__prev">&laquo;</li>
    <ul v-if="pages" class="pager__list">
      <li @click="changePage(page)" v-for="(page, index) in pages" :key="index" :class="['pager__item', {'pager__item--active' : page === active}]"> {{ page }} </li>
    </ul>
    <li @click="changePage('next')" class="pager__nav pager__next">&raquo;</li>
  </ul>
</template>

<script>
export default {
  props: {
    pages: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      active: 1
    }
  },
  methods: {
    changePage (dir) {
      if (dir === 'prev' && this.active > 1) {
        this.active -= 1
      } else if (dir === 'next' && this.active < this.pages) {
        this.active += 1
      } else {
        if (this.active !== dir && Number.isInteger(dir)) {
          this.active = dir
        }
      }
      this.$emit('changePage', this.active)
    }
  }
}
</script>

<style lang="scss">
.pager, .pager > ul {
  list-style: none;
  display: inline-flex;
  align-items: center;
  padding: 0;
}
.pager {
  margin: 2rem auto;
  &__list {
    justify-content: center;
    margin: 0 1rem;
  }
  &__item {
    padding: 0 0.5rem;
    &--active {
      color: red;
    }
  }
  &__nav,
  &__item {
    cursor: pointer;
  }
}
</style>
