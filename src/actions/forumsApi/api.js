
import Cookies from 'js-cookie';

const host = PRODUCTION ?  WEATHER_API_HOST_PROD : WEATHER_API_HOST_DEV;

const apis = {
    sites: 'forums/v1/sites/',
}

const get = async (url) => {
    return await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
        
        "X-CSRFToken": Cookies.get("csrftoken")
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

const getSites = async (date) =>{
    const apiURL = new URL(apis.sites, host);
    apiURL.searchParams.append('date', date)
    return await get(apiURL)
} 

const getSitesCount = async (url) => {
    return await get(url);
}

const getForums = async (url, date) => {
    const apiURL = new URL(url);
    apiURL.searchParams.append('date', date);
    return await get(apiURL);
}

const getTopics = async (url) => {
    return await get(url);
}

export {getSites, getSitesCount, getForums, getTopics};