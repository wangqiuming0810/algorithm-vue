<!--
 * @Date: 2022-02-19 16:36:26
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 21:24:45
 * @FilePath: \graduation-project\vue-czhalgo-web\src\views\sort\MergeSort\index.vue
-->
<template>
  <div class="merge-sort">
    <platform
      :animation="animation"
      :config="config"
      :data="data"
    />
  </div>
</template>

<script>
import Platform from '@/components/Platform'
import animation from './animation'
import config from './config'

export default {
  components: {
    Platform
  },
  data() {
    return {
      config,
      animation,
      data: {}
    }
  }

}
</script>

<style>

</style>
