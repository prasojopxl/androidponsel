import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next-images"
import { useRouter } from "next/router"
import { apiUrl } from "../../config/variable";
import LayoutHandphone from "../../layout/layouthandphone/LayoutBerita";
import {OverviewProduct} from "../../components"

export default function DetailPage() {
    const router = useRouter();
    const {slug} = router.query;
    if(!slug) return null;
    const [dataPonsel, setDataPonsel] = useState([]);

    const getDataPonsel = () => {
        axios.get(`${apiUrl}/products/${slug}`)
        .then(res=> {
            setDataPonsel(res.data);
        })        
    }

    useEffect(()=> {
        getDataPonsel();
    },[])

    return (
        <LayoutHandphone>
            <OverviewProduct dataSlug={slug}/>
        </LayoutHandphone>
    )
}
