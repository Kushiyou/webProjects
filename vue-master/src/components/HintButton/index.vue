<template>
  <a :title="title" style="margin: 10px">
      <!-- $attrs是父组件给子组件传递的属性 $listeners-->
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>
 <script>
export default {
  name: "HintButton",
  props: ["title"],
};
</script>
 <style lang="scss" scope>
</style>