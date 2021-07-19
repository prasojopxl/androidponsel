import { Fragment, useEffect, useState } from 'react';
import Image from "next/image"
import Link from "next/link"
import { Title, Ads, AdsBanner,Rate } from '../../../components';
import { apiUrl, baseUrl, totalItem } from '../../../config/variable';
import LayoutHandphone from '../../../layout/layouthandphone/LayoutHandphone';
import styles from "../index.module.scss";

export default function Berita({post, dataBanner,pages}) {     
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
                <Link href={`${baseUrl}berita/`}><a>Awal</a></Link>
                <ul>
                {
                    pages.map((item,i)=> {
                        return (
                            <li key={i}><Link href={baseUrl+"berita/page/"+item}><a>{item}</a></Link></li>
                        )
                    })
                }
                </ul>
                <Link href={`${baseUrl}berita/page/${pages.length}`}><a>Akhir</a></Link>
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
                                    post.map((item,i)=> {
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

export async function getStaticPaths() {    
    const res = await fetch(`${apiUrl}/products?category=1`);
    const posts = await res.json();
    
    let limitpages = Math.ceil(posts.length/totalItem)
    var pages = [];
    for (let i=0; i<=limitpages; i++ ) {
        pages.push(i)
    }        
    // const paths = posts.map((post)=>({
    //     params: {id: `${post.id}`}
    // }))

    const paths = pages.map((item,i)=> ({
        params: {id: `${i}`}
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const res = await fetch(`${apiUrl}/products?category=1&_limit=${totalItem}&_start=${params.id*totalItem-totalItem}`)
    const post = await res.json();

    const res2 = await fetch (`${apiUrl}/ads/3`)
    const dataBanner = await res2.json();

    const resPostsProducts = await fetch(`${apiUrl}/products?category=1`);
    const posts = await resPostsProducts.json();    
    let limitpages = Math.ceil(posts.length/totalItem)
    var pages = [];
    for (let i=1; i<=limitpages; i++ ) {
        pages.push(i)
    }        

    return {
        props: {
            post,
            dataBanner,
            pages

        }
    }
}
