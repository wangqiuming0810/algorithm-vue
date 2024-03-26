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
