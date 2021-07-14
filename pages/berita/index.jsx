import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import LayoutBerita from '../../layout/layoutberita/LayoutBerita'
import Image from "next-images"
import axios from "axios";
import { Title, Ads, AdsBanner } from "../../components";
import { apiUrl } from "../../config/variable";

export async function getStaticProps () {
    const res = await fetch(`http://localhost:1337/posts?menu=2&_limit=9&_start=0`)
    const dataListNews = await res.json();

    return {
        props: {
            dataListNews,
        }
    }
}


export default function Berita({dataListNews}) {
    const [verticalAds, setVerticalAds] = useState({
        iframe:[],
        bannerImage:[],
        link:[],
        urlImage:[],
        widthImage:[],
        heightImage:[]
    })    

    const getVerticalAds = () => {
        axios.get(`${apiUrl}/ads/3`)
        .then((res)=> {
            res.data.Image_Banner === null ? setVerticalAds({iframe:res.data.URL_Iframe}) : setVerticalAds({
                bannerImage:"withBanner",
                link:res.data.url,
                urlImage:res.data.Image_Banner.url,
                widthImage: res.data.Image_Banner.width,
                heightImage: res.data.Image_Banner.height,
            })
        })
    }
    useEffect (()=> {
        getVerticalAds();
    },[])

    return (
        <LayoutBerita>
            <div className={styles.berita}>
                <div className={styles.contents}>
                    <Title title="Berita"></Title>
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="row">
                                {
                                    dataListNews.map(item=> {
                                        return (
                                            <div className="col-lg-4" key={item.id}>                                
                                                <div className={styles.wrpitemnews}>
                                                        <div className={styles.imgwrp}><img src={`${apiUrl}${item.thumbnail.url}`} width={item.thumbnail.width} height={item.thumbnail.height} alt={item.title}/></div>
                                                        <div className={styles.content}>
                                                            <div className={styles.tags}>
                                                                {(item.tags).map(data=> {
                                                                    return (
                                                                        <a href="#" key={data.id}>{data.tag_name}</a>
                                                                    )
                                                                })}
                                                            </div>
                                                            <a href="#"><h5>{item.title}</h5></a>
                                                            <div className={styles.infodate}>
                                                                <span>By {item.author === null ? "admin" : item.author}</span> 
                                                                <span>{(item.updated_at).substr(8,2)}-{(item.updated_at).substr(5,2)}-{(item.updated_at).substr(0,4)} </span>
                                                            </div>                                                    
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
        </LayoutBerita>
    )
}


