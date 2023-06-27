export const useChart = () => {
  const list = useState('population', () => []);
  const pushPopulation = (population: any) => {
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
  const list = useState('prefecture', () => []);
  const checkedPrefecture = useState('checkedPrefecture', () => []);
  const setPrefecture = (prefecture: any) => {
    list.value = prefecture;
  };
  return { list, checkedPrefecture, setPrefecture };
};
