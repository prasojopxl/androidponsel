import useSWR from 'swr';
import { apiUrl } from "../config/variable";



export default function Coba() {
    const produk1 = "samsung-galaxy-m32";
    const produk2 = "xiaomi-redmi-note-10-pro-china";
    const produk3 = "samsung-galaxy-tab-s7-fe";

    // const getCompare = () => {
    //     axios.get(`${apiUrl}/products?slug=${produk1}&slug=${produk2}&slug=${produk3}`).then((res) => {
    //         console.log(res.data)
    //     })
    // }

    const url = `${apiUrl}/products?slug=${produk1}&slug=${produk2}&slug=${produk3}`
    const { data, error } = useSWR(`${url}`)
    if (!data) return <div>Loading</div>
    if (error) return <div>Failed</div>

    console.log(data)

    setTimeout(() => {
        console.log("hello")
    })
    return (
        <div>
            Hay
        </div>
    )
}
