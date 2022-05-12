<template>
  <v-app>
    <v-main>
      <ConverterComp />
    </v-main>
  </v-app>
</template>

<script>
import ConverterComp from './components/ConverterComp.vue'

export default {
  name: 'App',

  components: {
    ConverterComp,
  },


  data: () => ({
    //
  })
}
</script>
