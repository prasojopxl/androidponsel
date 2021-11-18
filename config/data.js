import { apiUrl, apiUrlApp, apiUrlBlog, apiUrlAndroid } from "./variable";

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

const fetchDataAndroid = async (url) => {
    const res = await fetch(`${apiUrlAndroid + url}`);
    return await res.json();
};

export { fetchData, fetchDataBlog, fetchDataApp, fetchDataAndroid };
