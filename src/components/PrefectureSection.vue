<template>
  <section>
    <div class="prefecture-card">
      <label
        v-for="(prefecture, index) in prefectureState.list.value"
        :key="index"
        class="prefecture-check"
        :class="{
          'prefecture-checked': checkedPrefecture.includes(prefecture.prefCode),
        }"
        :for="prefecture.prefName"
      >
        {{ prefecture.prefName }}
        <input
          :id="prefecture.prefName"
          v-model="checkedPrefecture"
          type="checkbox"
          :value="prefecture.prefCode"
        />
      </label>
    </div>
    <div class="sp-clear">
      <span>※都道府県をタップするとチェックが外れます</span>
      <div class="scroll">
        <label
          v-for="(prefecture, index) in prefectureOnlyChecked"
          :key="index"
          class="prefecture-check"
          :class="{
            'prefecture-checked': checkedPrefecture.includes(
              prefecture.prefCode
            ),
          }"
          :for="prefecture.prefName"
        >
          × {{ prefecture.prefName }}
          <input
            :id="prefecture.prefName"
            v-model="checkedPrefecture"
            type="checkbox"
            :value="prefecture.prefCode"
          />
        </label>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import {usePrefecture} from '~/composables/state';
const prefectureState = usePrefecture();
const checkedPrefecture = prefectureState.checkedPrefecture;
const api = useResasApi();

const prefectureOnlyChecked = computed(() => {
  if (!checkedPrefecture.value) return;
  return prefectureState.list.value.filter((prefecture) =>
    checkedPrefecture.value.includes(prefecture.prefCode)
  );
});

onMounted(async () => {
  prefectureState.setPrefecture(await api.getPrefecture);
});
</script>

<style lang="scss" scoped>
.prefecture-card {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.prefecture-check {
  user-select: none;
  padding: 2px;
  border: 1px solid #aaa;
  border-radius: 4px;
  cursor: pointer;
  > input {
    display: none;
  }
}
.prefecture-check:hover {
  background: #cfe4fc;
  transition: all 0.2s ease-out;
}
.prefecture-checked {
  background: #cfe4fc;
}
.sp-clear {
  display: none;
  position: fixed;
  bottom: 0;
  z-index: 1;
  border-top: 1px solid #aaa;
  width: max-content;
  background: #ffffff;
  width: 100%;
  overflow-x: scroll;
  height: 54px;
  > span {
    font-size: 8px;
    color: #aaa;
    position: fixed;
  }
  > .scroll {
    padding: 16px 4px;
    gap: 10px;
    display: flex;
    width: max-content;
    > p {
      border-radius: 6px;
      background: #cfe4fc;
    }
  }
}
@media (max-width: 751px) {
  .sp-clear {
    display: block;
  }
}
</style>
