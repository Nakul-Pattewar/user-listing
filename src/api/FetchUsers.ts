import axios from 'axios';
import { ACCESS_TOKEN, API_URL } from '../Constants';

export const fetchUsers = async (page: number, perPage: number = 10) => {
  try {
    const response = await axios.get(
      API_URL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params: {
        page,
        per_page: perPage,
      },
    });

    const data = response.data;
    const totalPages = parseInt(response.headers['x-pagination-pages'] || '1', 10);

    return { data, totalPages };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};