<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~normalize.css";

$editBtn: blue;
$deleteBtn: red;
$btnBg: green;
$btnAdd: $btnBg;
$btnCancel: grey;

html {
  font-size: 10px;
}
body {
  font-size: 1.6rem;
}
.btn {
  border: none;
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  background: $btnBg;
  color: white;
  cursor: pointer;
  &--edit {
    background: $editBtn;
  }
  &--delete {
    background: $deleteBtn;
  }
  &--add {
    background: $btnAdd;
  }
  &--cancel {
    background: $btnCancel;
  }
}
.btns {
  display: flex;
  align-items: center;
  justify-content: center;
  .btn {
    margin: 0.5rem;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.form {
  &__group {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
  }
  &__label {
    margin-right: 1rem;
    flex: 1;
    text-align: left;
  }
  &__control {
    flex: 2;
    width: 100%;
  }
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
