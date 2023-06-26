<template>
  <div>
    <div class="prefecture-card">
      <label
        v-for="(prefecture, index) in prefectureList"
        :key="index"
        class="prefecture-check"
        :class="{
          'prefecture-checked': checkedPrefecture.includes(prefecture.prefName),
        }"
        :for="prefecture.prefName"
      >
        {{ prefecture.prefName }}
        <input
          type="checkbox"
          :id="prefecture.prefName"
          :value="prefecture.prefName"
          v-model="checkedPrefecture"
        />
      </label>
    </div>
    <div class="sp-clear">
      <div class="scroll">
        <p
          v-for="(prefecture, index) in checkedPrefecture"
          :key="`checked-${index}`"
          @click="removePrefecture(prefecture)"
        >
          ✖️{{ prefecture }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const checkedPrefecture = ref([]);
const prefectureList = ref([]);
const api = useResasApi();
/**
 * SP用削除ボタン
 * タップした都道府県を削除する
 */
const removePrefecture = (value: string) => {
  const index = checkedPrefecture.value.findIndex(
    (prefecture: string) => prefecture === value
  );
  checkedPrefecture.value.splice(index, 1);
};

onMounted(async () => {
  prefectureList.value = await api.getPrefecture;
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
  height: 37px;
  > .scroll {
    padding: 6px 0;
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
