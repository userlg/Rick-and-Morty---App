import axios from "axios";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export const getCharacters = async (page = 1, filters = {}) => {
  try {
    const params = { page, ...filters };
    const response = await api.get("/character", { params });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      };
    }
    throw error;
  }
};

export const getCharacterById = async (id) => {
  const response = await api.get(`/character/${id}`);
  return response.data;
};

export const getEpisodes = async (page = 1, filters = {}) => {
  try {
    const params = { page, ...filters };
    const response = await api.get("/episode", { params });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      };
    }
    throw error;
  }
};

export const getLocations = async (page = 1, filters = {}) => {
  try {
    const params = { page, ...filters };
    const response = await api.get("/location", { params });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      };
    }
    throw error;
  }
};

export default api;
