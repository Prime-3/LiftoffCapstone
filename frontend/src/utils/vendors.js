// https://reactrouter.com/en/main/start/tutorial
// https://www.npmjs.com/package/axios
import axios from 'axios';

export async function getVendors(query) {
    // TODO: React router _seems_ to handle errors (magic!), e.g. trying to
    //   access /vendors (routes/vendors.jsx) without backend server running,
    //   causes pages/error.jsx to render with 500 error code. Are there any
    //   errors we need to handle with a try-catch block?
    const resp = await axios.get("/api/shops");
    return resp.data;
}

export async function getVendor(id) {
    const resp = await axios.get(`/api/shops/${id}`);
    return resp.data;
}