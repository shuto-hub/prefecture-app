<template>
  <section class="chart-card">
    <div class="type">
      <label
        v-for="(label, index) in chartUtils.labelList"
        :key="index"
        class="chart-radio"
        :for="label"
      >
        {{ label }}
        <input
          :id="label"
          v-model="chartUtils.selectedLabel.value"
          type="radio"
          :value="label"
        />
      </label>
    </div>
    <apexchart
      width="100%"
      type="line"
      height="400"
      :options="chartUtils.chartOptions.value"
      :series="chartUtils.series.value"
    ></apexchart>
  </section>
</template>
<script lang="ts" setup>
const chartUtils = useChartUtils();
const prefectureState = usePrefecture();

watch(
  prefectureState.checkedPrefecture,
  // 秒間リクエストに制限があるため、debounceをかける
  useDebounce(async (newCheck: Array<number>, oldCheck: Array<number>) => {
    await chartUtils.updatePopulation(newCheck, oldCheck);
  }, 200)
);

watch(chartUtils.selectedLabel, () => {
  chartUtils.setPopulationToSeries();
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
