import { apiUrl, apiUrlApp, apiUrlBlog } from "./variable";

const fetchData = async (url) => {
    const res = await fetch(`${apiUrl + url}`);
    return await res.json();
};

const fetchDataBlog = async (url) => {
    const res = await fetch(`${apiUrlBlog + url}`);
    return await res.json();
};

const fetchDataApp = async (url) => {
    const res = await fetch(`${apiUrlApp + url}`);
    return await res.json();
};

export { fetchData, fetchDataBlog, fetchDataApp };
