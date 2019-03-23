import axios from 'axios';

const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/';
const endpoint = 'rovers/curiosity/photos';
const apiKey = 'h7J2ZGwupdhbIPmMtxf7tZAFfpOq09Qf13NbkW8g';
const now = new Date();
const requestUrl = `${baseUrl}${endpoint}?earth_date=${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-1}&api_key=${apiKey}`;

export function getImages() {
    return axios
        .get(requestUrl)
        .then(response => response.data.photos);
}