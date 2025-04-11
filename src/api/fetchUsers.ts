import axios from 'axios';

export const fetchUsers = async (page: number, perPage: number = 10) => {
  try {
    const response = await axios.get('https://gorest.co.in/public/v2/users', {
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