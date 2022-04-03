<script setup lang="ts">
import { computed, reactive, ref } from "vue";

import { getCurrencyByName } from "@/services/getCurrencyByName";
import SelectInputVue from "@/components/SelectInput.vue";
import type { ICurrencyResponseData, IConversionRates } from "@/types/currency";

interface IStateCurrency {
  loading: boolean;
  data?: ICurrencyResponseData;
  currencyList: string[];
  error: string;
}

const defaultCurrecyOne = "USD";
const defaultCurrecyTwo = "BRL";

const stateCurrency: IStateCurrency = reactive({
  loading: false,
  data: undefined,
  currencyList: [],
  error: "",
});

const stateOptionsSelected = reactive({
  optionOne: defaultCurrecyOne,
  optionTwo: defaultCurrecyTwo,
});

const howManyCurrency = ref(1);

const handleCurrencyList = async () => {
  try {
    stateCurrency.loading = true;
    const { data } = await getCurrencyByName(stateOptionsSelected.optionOne);

    const getOptionsFirstSelect = Object.keys(data.conversion_rates).map(
      (currency) => currency
    );

    stateCurrency.currencyList = getOptionsFirstSelect;
    stateCurrency.data = data;
  } catch (e) {
    stateCurrency.error = (e as Error).message;
  } finally {
    stateCurrency.loading = false;
  }
};

const getUpdatedOptionOne = (newOption: string) => {
  stateOptionsSelected.optionOne = newOption;
  handleCurrencyList();
};

const getUpdatedOptionTwo = (newOption: string) =>
  (stateOptionsSelected.optionTwo = newOption);

const changeCurrencyValues = computed(() => {
  const valueFromOptionTwoSelected =
    stateOptionsSelected.optionTwo as keyof IConversionRates;

  if (!stateCurrency.data) return 0;

  const currencyTwoValue =
    stateCurrency.data?.conversion_rates[valueFromOptionTwoSelected];

  return Number((howManyCurrency.value * currencyTwoValue).toFixed(2));
});

const getCurrencyInfo = computed(() => {
  const currencyTwoValue =
    stateCurrency.data?.conversion_rates[
      stateOptionsSelected.optionTwo as keyof IConversionRates
    ];

  return `1 ${stateOptionsSelected.optionOne} = ${currencyTwoValue} ${stateOptionsSelected.optionTwo}`;
});

const showElements = computed(
  () => !stateCurrency.loading && !stateCurrency.error
);

handleCurrencyList();
</script>

<template>
  <div class="container">
    <h1 v-show="stateCurrency.loading">CARREGANDO...</h1>
    <p v-show="stateCurrency.error">{{ stateCurrency.error }}</p>

    <div v-show="showElements">
      <form class="formHandleCurrency">
        <div class="row">
          <SelectInputVue
            :list-options="stateCurrency.currencyList"
            :currencySelected="stateOptionsSelected.optionOne"
            @update:option="getUpdatedOptionOne"
          />
          <SelectInputVue
            :list-options="stateCurrency.currencyList"
            :currencySelected="stateOptionsSelected.optionTwo"
            @update:option="getUpdatedOptionTwo"
          />
        </div>
      </form>

      <div class="WrappercurrencyOneTimes row">
        <div>
          <input type="number" min="1" v-model.number="howManyCurrency" />
        </div>

        <p class="currencyValueOneTimes">{{ changeCurrencyValues }}</p>
      </div>

      <div class="currencyInfo">
        <p>{{ getCurrencyInfo }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 500px;
  margin: 3rem auto 0;
  padding: 0 1rem;

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

.WrappercurrencyOneTimes {
  margin-top: 3rem;

  input {
    padding: 1rem 0.7rem;
    border-radius: 4px;
  }

  .currencyValueOneTimes {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 0;

    font-size: 2rem;
    text-align: center;
  }
}

.currencyInfo {
  margin-top: 2rem;
  text-align: center;
}
</style>
