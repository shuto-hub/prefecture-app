<template>
  <section class="chart-card">
    <div class="type">
      <label
        v-for="(label, index) in labelList"
        :key="index"
        class="chart-radio"
        :for="label"
      >
        {{ label }}
        <input
          :id="label"
          v-model="selectedLabel"
          type="radio"
          :value="label"
        />
      </label>
    </div>
    <apexchart
      width="100%"
      type="line"
      height="400"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </section>
</template>
<script lang="ts" setup>
import {
  PopulationForChart,
  Population,
  PopulationYearAndValue,
  Prefecture,
} from '~/composables/state';
const prefectureState = usePrefecture();
const populationState = useChart();
const api = useResasApi();
const selectedLabel = ref('総人口');
const labelList = ['総人口', '年少人口', '生産年齢人口', '老年人口'];
const findPopulation = (populationForChart: PopulationForChart) => {
  if (
    !populationForChart ||
    !populationForChart.data ||
    populationForChart.data.length === 0
  )
    return;
  const population = populationForChart.data.find(
    (population: Population) => population.label === selectedLabel.value
  );
  return population;
};
const series = ref([
  {
    name: '',
    data: [],
  },
]);
const chartOptions = ref({
  chart: {
    type: 'line',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      borderRadiusApplication: 'around',
    },
  },
  yaxis: {
    title: {
      text: '万人',
    },
  },
  xaxis: {
    categories: [],
    title: {
      text: '年',
    },
  },
});
/**
 * チェックした都道府県の人口構成を1データずつ整形し、チャートにセットする
 */
const setPopulationToSeries = () => {
  series.value = populationState.list.value.map(
    (population: PopulationForChart) => ({
      name: prefectureState.list.value.find(
        (prefecture: Prefecture) => prefecture.prefCode === population.id
      ).prefName,
      id: population.id,
      data: findPopulation(population)
        ? findPopulation(population).data.map(
            (populationYearAndValue: PopulationYearAndValue) =>
              populationYearAndValue.value
          )
        : [],
    })
  );
};
const updatePopulation = async (
  newCheck: Array<number>,
  oldCheck: Array<number>
) => {
  if (oldCheck && newCheck.length < oldCheck.length) {
    populationState.list.value.forEach(
      (populationForChart: PopulationForChart, index: number) => {
        if (!newCheck.includes(populationForChart.id)) {
          populationState.splicePopulation(index);
        }
      }
    );
  } else {
    populationState.pushPopulation({
      id: newCheck[newCheck.length - 1],
      ...(await api.getPopulationList({
        prefCode: newCheck[newCheck.length - 1],
      })),
    });
  }
  setPopulationToSeries();
  chartOptions.value = {
    ...chartOptions.value,
    xaxis: {
      categories: findPopulation(populationState.list.value[0])
        ? findPopulation(populationState.list.value[0]).data.map(
            (populationYearAndValue: PopulationYearAndValue) =>
              populationYearAndValue.year
          )
        : [],
      title: {
        text: '年',
      },
    },
  };
};
watch(
  prefectureState.checkedPrefecture,
  // 秒間リクエストに制限があるため、debounceをかける
  useDebounce(async (newCheck: Array<number>, oldCheck: Array<number>) => {
    await updatePopulation(newCheck, oldCheck);
  }, 200)
);

watch(selectedLabel, () => {
  setPopulationToSeries();
});
</script>

<style lang="scss" scoped>
.chart-card {
  margin-bottom: 44px;
  > .type {
    display: flex;
    gap: 6px;
    padding: 10px;
  }
}
.chart-radio {
  user-select: none;
  padding: 2px;
  border: 1px solid #aaa;
  border-radius: 4px;
  cursor: pointer;
}
</style>
