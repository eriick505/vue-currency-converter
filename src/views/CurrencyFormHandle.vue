<script setup lang="ts">
import { ref } from "vue";
import SelectInputVue from "@/components/SelectInput.vue";
import { getCurrencyByName } from "@/services/getCurrencyByName";

const error = ref("");
const listOptions = ref<string[]>([]);

const handleCurrencyList = async () => {
  try {
    const { data } = await getCurrencyByName();

    const getOptionsFirstSelect = Object.keys(data.conversion_rates).map(
      (currency) => currency
    );

    listOptions.value = getOptionsFirstSelect;
  } catch (e) {
    error.value = (e as Error).message;
  }
};

handleCurrencyList();
</script>

<template>
  <form class="formHandleCurrency">
    <div class="row">
      <p v-if="listOptions.length < 0">Loading</p>
      <SelectInputVue
        v-else
        :list-options="listOptions"
        currencySelected="USD"
      />
      <SelectInputVue :list-options="listOptions" currencySelected="BRL" />

      <p v-show="error.length">{{ error }}</p>
    </div>
  </form>
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
