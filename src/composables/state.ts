// 都道府県一覧のレスポンス
export interface Prefecture {
  prefCode: number;
  prefName: string;
}
/**
 * 人口構成一覧のレスポンス
 * stateを操作できるように、都道府県コードをidとして利用できるよう追加しています。
 */
export interface PopulationYearAndValue {
  year: number;
  value: number;
}
export interface Population {
  label: string;
  data: PopulationYearAndValue[];
}
export interface PopulationForChart {
  id: number;
  boundaryYear: number;
  data: Population[];
}
export const useChart = () => {
  const list = useState('population', () => []);
  const pushPopulation = (population: PopulationForChart) => {
    list.value.push(population);
  };
  const splicePopulation = (index: number) => {
    list.value.splice(index, 1);
  };
  return {
    list,
    pushPopulation,
    splicePopulation,
  };
};

export const usePrefecture = () => {
  const list = useState<Prefecture[]>('prefecture', () => []);
  const checkedPrefecture = useState('checkedPrefecture', () => []);
  const setPrefecture = (prefecture: Prefecture[]) => {
    list.value = prefecture;
  };
  return { list, checkedPrefecture, setPrefecture };
};
