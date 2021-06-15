<template>
  <div @click="close" class="modal-backdrop">
    <div @click.stop class="modal">
      <div class="modal__header">
        <div @click="close" class="modal__close">╳</div>
        <slot name="header"></slot>
      </div>
      <div class="modal__body">
        <slot name="body"></slot>
      </div>
      <div class="modal__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 90rem;
  min-width: 60rem;
  max-height: 70vh;
  overflow: hidden;
  z-index: 1001;
  background: white;
  &-backdrop {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: rgba(0,0,0,0.2);
  }
  &__header {
    position: relative;
    padding: 1rem;
    font-size: 2rem;
  }
  &__close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
  }
  &__body {
    padding: 1rem;
  }
  @media screen and (max-width: 767px) {
    max-width: 60rem;
    min-width: 30rem;
  }
}
</style>
