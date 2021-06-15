<template>
  <div class="select">
    <label for="sel">{{ label }}</label>
    <select @change="onChange($event)" id="sel" name="sel1">
      <option v-for="(opt, index) in arr" :key="index" :value="opt"> {{ opt }} </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    arr: {
      type: Array
    },
    label: {
      type: String
    }
  },
  methods: {
    onChange (e) {
      this.$emit('change', e.target.value)
    }
  }
}
</script>

<style scoped>

</style>
