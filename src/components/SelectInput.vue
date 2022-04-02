<script setup lang="ts">
interface ISelectInputProps {
  listOptions: string[];
  currencySelected: string;
}

interface ISelectInputEmits {
  (e: "update:option", option: string): void;
}

defineProps<ISelectInputProps>();
const emits = defineEmits<ISelectInputEmits>();

const onSelectChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emits("update:option", value);
};
</script>

<template>
  <select class="selectInput" @change="onSelectChange">
    <option value="" disabled>Select currency</option>
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
