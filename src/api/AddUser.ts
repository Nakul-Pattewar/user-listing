import axios from 'axios';
import { Gender, Status } from '../eums/Enums';
import { ACCESS_TOKEN, API_URL } from '../Constants';

export const addUser = async (userData: { name: String, email: String, gender: Gender, status: Status }) => {
    try {
        const response = await axios.post(
            API_URL,
            userData,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        if (error.response.data) {
            throw Error(error.response.data[0].field + " " + error.response.data[0].message);
        } else {
            throw Error('An unexpected error occurred. Please try again later.');
        }
    }
};