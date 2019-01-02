import axios from 'axios';
import { SEARCH_MINERALS } from './types';

export const mineralSearchComplex = (parameters) => async dispatch => {
    const res = await axios.post(`/api/search/`, parameters);
    dispatch({ type: SEARCH_MINERALS, payload: res.data });
}