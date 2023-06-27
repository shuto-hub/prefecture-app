<template>
  <section class="chart-card">
    <div class="type">
      <label v-for="(label, index) in labelList" :key="index" class="chart-radio" :for="label">
        {{ label }}
        <input :id="label" v-model="selectedLabel" type="radio" :value="label" />
      </label>
    </div>
    <apexchart width="100%" type="line" height="400" :options="chartOptions" :series="series"></apexchart>
  </section>
</template>
<script lang="ts" setup>
const prefectureState = usePrefecture();
const populationState = useChart();
const api = useResasApi();
const selectedLabel = ref('総人口');
const labelList = ['総人口', '年少人口', '生産年齢人口', '老年人口'];
const findPopulation = (population: any) => {
  if (!population || !population.data || population.data.length === 0)
    return [];
  const prefecture = population.data.find(
    (obj: any) => obj.label === selectedLabel.value
  );
  return prefecture;
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
 * チェックした都道府県の人口構成を1データずつ整形し、グラフにセットする
 */
const setPopulationToSeries = () => {
  series.value = populationState.list.value.map((population: any) => ({
    name: prefectureState.list.value.find(
      (prefecture: any) => prefecture.prefCode === population.id
    ).prefName,
    id: population.id,
    data: findPopulation(population)
      ? findPopulation(population).data.map((obj: any) => obj.value)
      : [],
  }));
};
watch(
  prefectureState.checkedPrefecture,
  async (newCheck: Array<number>, oldCheck: Array<number>) => {
    if (oldCheck && newCheck.length < oldCheck.length) {
      populationState.list.value.forEach((population: any, index: number) => {
        if (!newCheck.includes(population.id)) {
          populationState.splicePopulation(index);
        }
      });
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
              (obj: any) => obj.year
            )
          : [],
        title: {
          text: '年',
        },
      },
    };
  }
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
