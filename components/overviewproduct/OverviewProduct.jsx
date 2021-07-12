import { Fragment, useEffect, useState } from "react"
import { Title } from "../title/Title"
import styles from "./overviewproduct.module.scss"
import axios from "axios"
import { apiUrl } from "../../config/variable";

export function OverviewProduct(props) {
    const [dataProduct, setDataProduct] = useState([]);
    const getDataProduct = () => {
        axios.get(`${apiUrl}/products/${props.dataSlug}`)
        .then (res => {
            setDataProduct(res.data)
        })
    }

    useEffect(()=> {
        getDataProduct();
    },[])
    return (
        <div className={styles.overviewproduct}>            
            <div className={styles.contents}>
                <Title title="Overview Product"></Title>
                <div className={styles.wrpOverview}>
                    <div className="row">
                        {
                            dataProduct.map((item,i)=> {
                                return (
                                    <div key={item.id}>{item.title}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
