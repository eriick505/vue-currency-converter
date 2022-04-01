<script setup lang="ts">
import IconMoneyHandVue from "@/components/icons/IconMoneyHand.vue";
</script>

<template>
  <header class="header">
    <IconMoneyHandVue />
    <h1>Currency Convert</h1>
  </header>
</template>

<style scoped lang="scss">
.header {
  max-width: 760px;
  margin: 0 auto;
  text-align: center;

  @media (min-width: 769px) {
    padding-top: 10rem;
  }

  svg {
    fill: white;
    max-width: 150px;
    height: auto;

    margin-bottom: 2rem;
  }
}
</style>
