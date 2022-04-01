<script setup lang="ts">
interface ISelectInput {
  listOptions: string[];
  currencySelected: string;
}

defineProps<ISelectInput>();
</script>

<template>
  <select class="selectInput">
    <option
      v-for="option in listOptions"
      :key="option"
      :value="option"
      :selected="option === currencySelected"
    >
      {{ option }}
    </option>
  </select>
</template>

<style scoped lang="scss">
.selectInput {
  display: block;
  width: 100%;
  padding: 1rem;
  border-radius: 4px;

  font-size: 1.6rem;
}
</style>
