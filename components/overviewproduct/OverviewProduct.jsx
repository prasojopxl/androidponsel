import { Fragment, useEffect, useState } from "react"
import { Title } from "../title/Title"
import styles from "./overviewproduct.module.scss"
import axios from "axios"
import { apiUrl } from "../../config/variable";

export default function OverviewProduct(props) {
    const [dataProduct, setDataProduct] = useState([]);
    const getDataProduct = () => {
        axios.get(`${apiUrl}/products/${props.dataSlug || "xiaomi-redmi-note-10-pro-china" }`)
        .then (res => {
            setDataProduct(res.data)
            console.log(res.data.title)
        })
    }
    getDataProduct();


    useEffect(()=> {
    },[])
    return (
        <div className={styles.overviewproduct}>            
            <div className={styles.contents}>
                <Title title="Overview Product"></Title>
                <div className={styles.wrpOverview}>
                    <div className="row">
                    </div>
                </div>
            </div>
        </div>
    )
}
