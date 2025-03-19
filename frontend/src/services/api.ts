import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Spring Boot 서버 주소

export const getHelloMessage = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/hello`);
    return response.data;
};
