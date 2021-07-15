import {useEffect, useState} from 'react'
import styles from "./compareItem.module.scss"
import {Title, Rate} from "../../components"
import axios from "axios";
import Image from "next/image";
import { apiUrl } from '../../config/variable';

export default function CompareItem() {
    const [dataCompare, setDataCompare] = useState([])
    const [dataProducts, setDataProducts] = useState([]);

    const getDataCompare = () => {
        axios.get(`${apiUrl}/compares?_sort=updated_at:ASC`)
        .then((res)=> {
            setDataCompare(res.data)
        })
    }

    const getProduct = () => {
        axios.get(`${apiUrl}/products?_limit=12`)
        .then((res)=> {
            setDataProducts(res.data)
        })
    }
    useEffect(()=> {
        getDataCompare();
        getProduct();
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
                                                <div className={styles.item} key={data.id}>
                                                    <div className={styles.imgwrp}><Image src={data.product_image[0].url} width={(data.product_image[0].width)/2} height={(data.product_image[0].height)/2}></Image></div>
                                                    <div className={styles.contentDec}>
                                                        <h5>{data.title}</h5>
                                                        <h6>{data.memory_internal}</h6>
                                                        <Rate TotalRate={data.rate}/>                                                        
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
                <div className="row">
                    {dataProducts.map((item,index)=> {
                        return (
                            <div className="col-lg-3" key={item.id}>
                                <div className={styles.productItem}>
                                    <div className={styles.shortproduct}>
                                        <div className={styles.imageprod}><Image src={item.product_image[0].url} width={item.product_image[0].width/3} height={item.product_image[0].height/3}/> </div>
                                        <div className={styles.productinfo}>
                                            <h5>{item.title}</h5>
                                            <h6>{item.memory_internal}</h6>
                                            <Rate TotalRate={item.rate.rating}/>
                                        </div>
                                    </div>
                                    <div className={styles.wrpbtn}>
                                        <a href="#" className={styles.btnfull}>BANDINGKAN PRODUK</a>
                                        <a href="#" className={styles.btnblank}>LIHAT SELENGKAPNYA</a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div style={{textAlign:"center", display:"block", marginTop:30}}>
                    <a href="#" className="btn medium">Lihat Selegkapnya</a>
                </div>
            </div>
        </div>
    )
}
