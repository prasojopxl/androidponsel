import { apiUrl } from "./variable";

const fetchData = async (itemData) => {
    const res = await fetch(`${apiUrl}  ${itemData}`);
    return await res.json();
};

export { fetchData };
