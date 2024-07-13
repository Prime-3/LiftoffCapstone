// https://reactrouter.com/en/main/start/tutorial
// https://www.npmjs.com/package/axios
import axios from 'axios';

export async function getShops(query) {
    // TODO: React router _seems_ to handle errors (magic!), e.g. trying to
    //   access /vendors (routes/vendors.jsx) without backend server running,
    //   causes pages/error.jsx to render with 500 error code. Are there any
    //   errors we need to handle with a try-catch block?
    let url = "/api/shops";
    if (query !== undefined) {
        url += `?q=${query}`
    }
    const resp = await axios.get(url);
    if (!resp.data)
        return [];
    return resp.data;
    // const data = fetch(url)
    //     .then(resp => {
    //         if (resp.ok)
    //             return resp.json();
    //     })
    //     .then(data => {
    //         return data;
    //     });
    // if (!data)
    //     return [];
    // return data;
}

export async function getShop(id) {
    const resp = await axios.get(`/api/shops/${id}`);
    if (resp.data)
        return {};
    return resp.data;
}