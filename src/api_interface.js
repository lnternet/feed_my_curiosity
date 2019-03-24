import axios from 'axios';

const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/';
const endpoint = 'rovers/curiosity/photos';
const apiKey = 'h7J2ZGwupdhbIPmMtxf7tZAFfpOq09Qf13NbkW8g';

export function getImages(year, month, day) {
    let requestUrl = `${baseUrl}${endpoint}?earth_date=${year}-${month}-${day}&api_key=${apiKey}`;
    return axios
        .get(requestUrl)
        .then(response => response.data.photos);
}