import React,{useEffect, useState} from 'react'
import styles from "./compareItem.module.scss"
import {Title} from "../../components"
import axios from "axios";
import Image from "next/image";

import { apiUrl } from '../../config/variable';

export function CompareItem() {
    const [dataCompare, setDataCompare] = useState([])

    const getDataCompare = () => {
        axios.get(`${apiUrl}/compares?_sort=updated_at:ASC`)
        .then((res)=> {
            setDataCompare(res.data)
        })
    }

    useEffect(()=> {
        getDataCompare();
    },[])
    return (
        <div className={styles.compareItem}>
            <div className={styles.contens}>
                <Title title="Top Perbandingan Minggu Ini"/>
                <div className="row">
                    {dataCompare.map((item,index)=> {
                        return (
                            <div className="col-lg-6" key={item.id}>
                                <div className={styles.itemcompare}> 
                                    <div className={styles.wrpCompare}>                                   
                                        {item.products.map((data)=> {
                                            return (
                                                <div className={styles.item}>
                                                    <div className={styles.imgwrp}><Image src={data.product_image[0].url} width={(data.product_image[0].width)/2} height={(data.product_image[0].height)/2}></Image></div>
                                                    <div className={styles.contentDec}>
                                                        <h5>{data.title}</h5>
                                                        <h6>{data.memory_internal}</h6>
                                                        Rate: {data.rate}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <a href="#" className={styles.fullLink}>LIHAT PERBANDINGAN</a>
                                </div>           
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
