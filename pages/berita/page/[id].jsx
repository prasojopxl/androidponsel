import { Fragment, useEffect, useState } from 'react';
import Image from "next/image"
import Link from "next/link"
import { Title, Ads, AdsBanner } from '../../../components';
import { apiUrl, baseUrl, totalItem } from '../../../config/variable';
import LayoutBerita from '../../../layout/layoutberita/LayoutBerita';
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
        <LayoutBerita>
            <div className={styles.berita}>
                <div className={styles.contents}>
                    <Title title="Berita"></Title>
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="row">
                                {
                                    post.map((item,i)=> {
                                        return (
                                            <div className="col-lg-4" key={item.id}>                                
                                                <div className={styles.wrpitemnews}>
                                                        <div className={styles.imgwrp}>
                                                            <Image src={`${apiUrl}${item.thumbnail.url}`} width={item.thumbnail.width} height={item.thumbnail.height} alt={item.title}/>
                                                        </div>
                                                        <div className={styles.content}>
                                                            <div className={styles.tags}>
                                                                {(item.tags).map(data=> {
                                                                    return (
                                                                        <Fragment key={data.id}>
                                                                        <a href="#">{data.tag_name}</a>
                                                                        </Fragment>
                                                                    )
                                                                })}
                                                            </div>
                                                            <Link href={baseUrl+item.menu.title+"/"+item.slug}><a><h5>{item.title}</h5></a></Link>
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
                    <Paging/>
                    
                </div>
            </div> 
        </LayoutBerita>
    )
}

export async function getStaticPaths() {    
    const res = await fetch(`${apiUrl}/posts?menu=2`);
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
    const res = await fetch(`${apiUrl}/posts?menu=2&_limit=${totalItem}&_start=${params.id*totalItem-totalItem}`)
    const post = await res.json();

    const res2 = await fetch (`${apiUrl}/ads/3`)
    const dataBanner = await res2.json();

    const resPostsBerita = await fetch(`${apiUrl}/posts?menu=2`);
    const posts = await resPostsBerita.json();    
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
