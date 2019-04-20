<template>
  <div class="appmain">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"/>
    </transition>
  </div>
</template>
<script>
export default {
  computed: {
    key() {
      return this.$route.fullPath;
    }
  }
};
</script>
<style lang="scss" scoped>
.appmain {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f2f3f5;
  padding: 10px;
}
</style>