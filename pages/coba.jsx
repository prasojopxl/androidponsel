import { useState } from 'react';
import useSWR from 'swr';
import { apiUrl } from "../config/variable";

export default function Coba() {
    const produk1 = "samsung-galaxy-m32";
    const produk2 = "xiaomi-redmi-note-10-pro-china";
    const produk3 = "samsung-galaxy-tab-s7-fe";

    const [baner, setBaner] = useState([])

    const { data: prod } = useSWR(`${apiUrl}/products?slug=${produk1}&slug=${produk2}&slug=${produk3}`)
    const { data: BanerTop } = useSWR(`http://localhost:1337/ads/10?_publicationState=preview`)
    if (!prod) return <div>Loading</div>
    console.log(prod)
    console.log(BanerTop)



    return (
        <div>
            Hay
        </div>
    )
}
