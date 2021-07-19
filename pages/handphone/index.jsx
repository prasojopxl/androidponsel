import { Rate, Title, Ads, AdsBanner } from "../../components";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { apiUrl, baseUrl, totalItem } from "../../config/variable";
import LayoutHandphone from "../../layout/layouthandphone/LayoutHandphone";
import Image from "next/image"
import Link from "next/link"

export async function getServerSideProps() {
    const resListHanphone = await fetch(`${apiUrl}/products?category=1&_limit=${totalItem}`)
    const dataListHandphone = await resListHanphone.json();

    const res2 = await fetch (`${apiUrl}/ads/3`)
    const dataBanner = await res2.json();

    const resProductsHP = await fetch(`${apiUrl}/products?category=1`);
    const productsHP = await resProductsHP.json();    
    let limitpages = Math.ceil(productsHP.length/totalItem)
    var pages = [];
    for (let i=1; i<=limitpages; i++ ) {
        pages.push(i)
    }        


    return {
        props: {
            dataListHandphone,
            dataBanner,
            pages,
            limitpages                        
        }
    }
}

export default function Handphone({dataListHandphone, dataBanner, pages, limitpages}) {
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

    const Paging = () => {
        return (
            <div className={styles.paging}>
                <Link href={`${baseUrl}handphone/`}><a>Awal</a></Link>
                <ul>
                    {
                        pages.map((item,i)=> {
                            return (
                                <li key={item}><Link href={baseUrl+"handphone/page/"+item}><a>{item}</a></Link></li>
                            )
                        })
                    }
                </ul>
                <Link href={`${baseUrl}handphone/page/${pages.length}`}><a>Akhir</a></Link>
            </div>

        )
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
                                                        <Link href={"handphone/"+item.slug}><a className={styles.btnblank}>LIHAT SELENGKAPNYA</a></Link>
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
                    <Paging/>                    
                </div>
            </div>
        </LayoutHandphone>
    )
}
