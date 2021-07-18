import { Rate, Title, Ads, AdsBanner } from "../../components";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { apiUrl, baseUrl, totalItem } from "../../config/variable";
import LayoutHandphone from "../../layout/layouthandphone/LayoutHandphone";
import Image from "next/image"

export async function getServerSideProps() {
    const resListHanphone = await fetch(`http://localhost:1337/products?category=1&_limit=${totalItem}`)
    const dataListHandphone = await resListHanphone.json();

    const res2 = await fetch (`${apiUrl}/ads/3`)
    const dataBanner = await res2.json();

    return {
        props: {
            dataListHandphone,
            dataBanner
        }
    }
}

export default function Handphone({dataListHandphone, dataBanner}) {
    const [verticalAds, setVerticalAds] = useState({
        iframe:[],
        bannerImage:[],
        link:[],
        urlImage:[],
        widthImage:[],
        heightImage:[]
    })    

    const getVerticalAds = () => {
        dataBanner.Image_Banner == null ? setVerticalAds({iframe: dataBanner.URL_Iframe}) : setVerticalAds({
            bannerImage: "withBanner",
            link: dataBanner.url,
            urlImage: apiUrl+dataBanner.Image_Banner.url,
            widthImage: dataBanner.Image_Banner.width,
            heightImage: dataBanner.Image_Banner.height
        })    
    }

    useEffect (()=> {
        getVerticalAds();
    },[])


    return (
        <LayoutHandphone>
            <div className={styles.pagelisthandphone}>
                <div className={styles.contents}>
                    <Title title="Handphone"></Title>
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="row">
                                {
                                    dataListHandphone.map((item,i)=> {
                                        return (
                                            <div className="col-lg-4" key={item.id}>
                                                <div className={styles.productItem}>
                                                    <div className={styles.shortproduct}>
                                                        <div className={styles.imageprod}><Image src={apiUrl+item.product_image[0].url} width={item.product_image[0].width/3} height={item.product_image[0].height/3}/> </div>
                                                        <div className={styles.productinfo}>
                                                            <h5>{item.title}</h5>
                                                            <h6>{item.memory_internal}</h6>
                                                            <Rate TotalRate={item.rate.rating}/>
                                                        </div>
                                                    </div>
                                                    <div className={styles.wrpbtn}>
                                                        <a href="#" className={styles.btnfull}>BANDINGKAN PRODUK</a>
                                                        <a href={"handphone/"+item.slug} className={styles.btnblank}>LIHAT SELENGKAPNYA</a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className={styles.verticalbaner}>
                                {
                                    verticalAds.bannerImage === "withBanner" ? <AdsBanner linkbanner={verticalAds.link} urlImage={verticalAds.urlImage} width={verticalAds.widthImage} height={verticalAds.heightImage}/>
                                    : <Ads banner={verticalAds.iframe}/>
                                }            
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </LayoutHandphone>
    )
}
