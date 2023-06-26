// RESAS APIのエンドポイントをまとめる
const runtimeConfig = useRuntimeConfig();
const BASE_URL = 'https://opendata.resas-portal.go.jp';
const API_KEY = runtimeConfig.public.key;

export const useResasApi = () => {
  return {
    getPrefecture: getPrefectureList(),
  };
};

const getApi = async (path: string) => {
  const {
    data: {
      value: { result },
    },
  } = await useFetch(`${BASE_URL}${path}`, {
    headers: { 'X-API-KEY': API_KEY },
  });
  return result;
};

// 都道府県一覧
const getPrefectureList = async () => {
  return await getApi('/api/v1/prefectures');
};
