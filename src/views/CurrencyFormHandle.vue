<script setup lang="ts">
import { ref } from "vue";
import SelectInputVue from "@/components/SelectInput.vue";
import { getCurrencyByName } from "@/services/getCurrencyByName";

const loading = ref(false);
const error = ref("");
const listOptions = ref<string[]>([]);

const timesCurrency = ref(1);

const currecyOne = "USD";
const currecyTwo = "BRL";

const selectedOptionOne = ref(currecyOne);
const selectedOptionTwo = ref(currecyTwo);

console.log(selectedOptionOne.value, "selectedOption.value xxxxxxxxxxx");

const handleCurrencyList = async () => {
  try {
    loading.value = true;
    const { data } = await getCurrencyByName();

    const getOptionsFirstSelect = Object.keys(data.conversion_rates).map(
      (currency) => currency
    );

    listOptions.value = getOptionsFirstSelect;
  } catch (e) {
    error.value = (e as Error).message;
  } finally {
    loading.value = false;
  }
};

const getUpdatedOptionOne = (newOption: string) =>
  (selectedOptionOne.value = newOption);

const getUpdatedOptionTwo = (newOption: string) =>
  (selectedOptionTwo.value = newOption);

handleCurrencyList();
</script>

<template>
  <form class="formHandleCurrency">
    <p>{{ selectedOptionOne }} : selectedOptionOne</p>
    <p>{{ selectedOptionTwo }} : selectedOptionTwo</p>
    <h1 v-if="loading">CARREGANDO...</h1>
    <div v-else class="row">
      <SelectInputVue
        :list-options="listOptions"
        :currencySelected="currecyOne"
        @update:option="getUpdatedOptionOne"
      />
      <SelectInputVue
        :list-options="listOptions"
        :currencySelected="currecyTwo"
        @update:option="getUpdatedOptionTwo"
      />
      <p v-show="error.length">{{ error }}</p>
    </div>
  </form>

  <div>
    <label
      >Converter: <input type="number" min="1" v-model="timesCurrency" />{{
        timesCurrency
      }}</label
    >
  </div>
</template>

<style scoped lang="scss">
.formHandleCurrency {
  max-width: 500px;
  margin: 3rem auto 0;

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}
</style>
