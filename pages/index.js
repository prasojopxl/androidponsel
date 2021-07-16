import React,{useEffect, useState} from 'react';
import LayoutHome from '../layout/layouthome/layoutHome';
import styles from "./index.module.scss";
import {Ads, AdsBanner, Title,Rate} from "../components/";
import Image from "next/image";
// import { apiUrl } from '../../config/variable';
import { apiUrl } from '../config/variable';

export async function getStaticProps() {
    const res = await fetch(`${apiUrl}/ads/1`)
    const dataTopAds = await res.json()
    const res2 = await fetch(`${apiUrl}/ads/2`)
    const dataContentAds = await res2.json()
    const res4 = await fetch(`${apiUrl}/ads/4`)
    const dataContentAds4 = await res4.json()
    const res5 = await fetch(`${apiUrl}/ads/5`)
    const dataContentAds5 = await res5.json()
    const resDataCompare = await fetch(`${apiUrl}/compares?_sort=updated_at:ASC`)
    const dataCompare = await resDataCompare.json();
    const resDataProducts =  await fetch(`${apiUrl}/products?_limit=12`)
    const dataProducts = await resDataProducts.json()
    const resMainNews = await fetch(`${apiUrl}/posts?menu=2&_sort=updated_at:DESC&_limit=1`)
    const mainNews = await resMainNews.json();
    const resTopNews = await fetch (`${apiUrl}/posts?menu=2&_sort=updated_at:DESC&_start=2&_limit=2`)
    const topNews = await resTopNews.json();
    const resContNews =  await fetch(`${apiUrl}/posts?menu=2&_sort=updated_at:DESC&_start=4&_limit=6`)
    const contNews = await resContNews.json();
    const resVerticalAds = await fetch (`${apiUrl}/ads/3`)
    const dataVerticalAds = await resVerticalAds.json();
    const resTopApp = await fetch (`${apiUrl}/posts?menu=2&_limit=2&_sort=updated_at:DESC`)
    const topApp = await resTopApp.json();
    const resListApp = await fetch(`${apiUrl}/posts?menu=10&_limit=15&_start=3&_sort=updated_at:DESC`)
    const listApp = await resListApp.json();
    const resTipsTrik = await fetch (`${apiUrl}/posts?menu=8&_limit=8&_sort=updated_at:DESC&_start=4`)
    const tipsTrik = await resTipsTrik.json();
    const resTipsTrikMain = await fetch (`${apiUrl}/posts?menu=8&_limit=1&_sort=updated_at:DESC&_start=1`)
    const tipsTrikMain = await resTipsTrikMain.json();
    const resTipsTrikSecond = await fetch (`${apiUrl}/posts?menu=8&_limit=2&_sort=updated_at:DESC&_start=2`)
    const tipsTrikSecond = await resTipsTrikSecond.json();

    return {
        props: {
            dataTopAds, dataContentAds, dataContentAds4,dataContentAds5, dataCompare,
            dataProducts, mainNews, topNews, contNews, dataVerticalAds,
            topApp, listApp, tipsTrik, tipsTrikMain, tipsTrikSecond
        },
        revalidate: 5
    }
}

export default function Home({
        dataTopAds, dataContentAds, dataContentAds4, dataContentAds5, dataCompare,
        dataProducts, mainNews, topNews, contNews, dataVerticalAds,
        topApp, listApp, tipsTrik, tipsTrikMain, tipsTrikSecond
    }) {
    const [topAds, setTopAds] = useState({
        iframe:[],
        bannerImage:[],
        link:[],
        urlImage:[],
        widthImage:[],
        heightImage:[]
    })    
    const getTopAds = () => {
        dataTopAds.Image_Banner === null ? setTopAds({iframe: dataTopAds.URL_Iframe}) : setTopAds({
            bannerImage:"withBanner",
            link:dataTopAds.url,
            urlImage:dataTopAds.Image_Banner.url,
            widthImage: dataTopAds.Image_Banner.width,
            heightImage: dataTopAds.Image_Banner.height,

        })
    }

    const [contentAds, setContentAds] = useState({
        iframe:[],
        bannerImage:[],
        link:[],
        urlImage:[],
        widthImage:[],
        heightImage:[]
    })
    const getContentAds = () => {
        dataContentAds.Image_Banner === null ? setContentAds({iframe:dataContentAds.URL_Iframe}) : setContentAds({
            bannerImage:"withBanner",
            link:dataContentAds.url,
            urlImage:apiUrl+dataContentAds.Image_Banner.url,
            widthImage: dataContentAds.Image_Banner.width,
            heightImage: dataContentAds.Image_Banner.height,
        })
    }

    const [contentAds4, setContentAds4] = useState({
        iframe:[],
        bannerImage:[],
        link:[],
        urlImage:[],
        widthImage:[],
        heightImage:[]
    })
    const getContentAds4 = () => {
            dataContentAds4.Image_Banner === null ? setContentAds4({iframe:dataContentAds4.URL_Iframe}) : setContentAds4({
                bannerImage:"withBanner",
                link:dataContentAds4.url,
                urlImage:dataContentAds4.Image_Banner.url,
                widthImage: dataContentAds4.Image_Banner.width,
                heightImage: dataContentAds4.Image_Banner.height,
            })
    }

    const [contentAds5, setContentAds5] = useState({
        iframe:[],
        bannerImage:[],
        link:[],
        urlImage:[],
        widthImage:[],
        heightImage:[]
    })
    const getContentAds5 = () => {
            dataContentAds5.Image_Banner === null ? setContentAds5({iframe:dataContentAds5.URL_Iframe}) : setContentAds5({
                bannerImage:"withBanner",
                link:dataContentAds5.url,
                urlImage:dataContentAds5.Image_Banner.url,
                widthImage: dataContentAds5.Image_Banner.width,
                heightImage: dataContentAds5.Image_Banner.height,
            })
    }



    const [verticalAds, setVerticalAds] = useState({
        iframe:[],
        bannerImage:[],
        link:[],
        urlImage:[],
        widthImage:[],
        heightImage:[]
    })    

    const getVerticalAds = () => {
        dataVerticalAds.Image_Banner === null ? setVerticalAds({iframe:dataVerticalAds.URL_Iframe}) : setVerticalAds({
            bannerImage:"withBanner",
            link:dataVerticalAds.url,
            urlImage:apiUrl+dataVerticalAds.Image_Banner.url,
            widthImage: dataVerticalAds.Image_Banner.width,
            heightImage: dataVerticalAds.Image_Banner.height,
        })
    }


    useEffect(()=> {
        getTopAds();
        getContentAds();
        getContentAds4();
        getContentAds5();
        getVerticalAds();
    },[])

    return (
        <React.Fragment>
            <LayoutHome>
                {
                    topAds.bannerImage === "withBanner" ? <AdsBanner linkbanner={topAds.link} urlImage={topAds.urlImage} width={topAds.widthImage} height={topAds.heightImage}/>
                    : <Ads banner={topAds.iframe}/>
                }            

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
                                                            <div className={styles.imgwrp}><Image src={apiUrl+data.product_image[0].url} width={(data.product_image[0].width)/2} height={(data.product_image[0].height)/2}></Image></div>
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
                                                <div className={styles.imageprod}><Image src={apiUrl+item.product_image[0].url} width={item.product_image[0].width/3} height={item.product_image[0].height/3}/> </div>
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

                {
                    contentAds.bannerImage === "withBanner" ? <AdsBanner linkbanner={contentAds.link} urlImage={contentAds.urlImage} width={contentAds.widthImage} height={contentAds.heightImage}/>
                    : <Ads banner={contentAds.iframe}/>
                }            

                <div className={styles.latestnews}>
                    <div className={styles.contents}>
                        <Title title="Berita Terbaru"/>
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="row">
                                    <div className="col-lg-6">
                                        {mainNews.map((item,i)=> {
                                            return(
                                                <div className={styles.mainpost} key={item.id}>
                                                    <div className={styles.imgwrp}><Image src={apiUrl+item.thumbnail.url} width={item.thumbnail.width} height={item.thumbnail.height} alt={item.title}/></div>                                                                                        
                                                    <div className={styles.desc}>
                                                        <div className={styles.tags}>
                                                            {(item.tags).map(data=> {
                                                                return (
                                                                    <a href="#" key={data.id}>{data.tag_name}</a>
                                                                )
                                                            })}
                                                        </div>
                                                        <a href="#"><h4>{item.title}</h4></a>
                                                        <div className={styles.infodate}>
                                                            <span>By {item.author === null ? "admin" : item.author}</span> 
                                                            <span>{(item.updated_at).substr(8,2)}-{(item.updated_at).substr(5,2)}-{(item.updated_at).substr(0,4)} </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="col-lg-6">
                                        <div className={styles.wrptopnews}>
                                            {topNews.map((item,i)=> {
                                                return (
                                                    <div className={styles.wrpitemnews} key={item.id}>
                                                        <div className={styles.imgwrp}><Image src={apiUrl+item.thumbnail.url} width={item.thumbnail.width/3} height={item.thumbnail.height/3} alt={item.title}/></div>
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
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {contNews.map((item,i)=> {
                                        return (
                                            <div className="col-lg-6" key={item.id}>                                
                                                <div className={styles.wrpitemnews}>
                                                        <div className={styles.imgwrp}><Image src={apiUrl+item.thumbnail.url} width={item.thumbnail.width/3} height={item.thumbnail.height/3} alt={item.title}/></div>
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
                                    })}
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
                        <div style={{textAlign:"center", display:"block", marginTop:30}}>
                            <a href="#" className="btn medium">Lihat berita terbaru lainnya</a>
                        </div>
                    </div>
                </div>

                <div className={styles.kanalapp}>
                    <div className={styles.contents}>
                        <Title title="Kanal Aplikasi"/>
                        <div className="row">
                            {topApp.map((item,i)=> {
                                return(
                                    <div className="col-lg-6" key={item.id}>
                                        <div className={styles.topkanal}>
                                            <div className={styles.imgwrp}>
                                                <Image src={apiUrl+item.thumbnail.url} width={item.thumbnail.width*1.3} height={item.thumbnail.height*1.3} alt="item.title"/>
                                            </div>
                                            <div className={styles.desc}>
                                                <a href="#"><h5>{item.title}</h5></a>
                                                <p>{(item.content).substr(0, 110)}...</p>
                                                <div className={styles.infodate}>
                                                    <span>By {item.author === null ? "admin" : item.author}</span> 
                                                    <span>{(item.updated_at).substr(8,2)}-{(item.updated_at).substr(5,2)}-{(item.updated_at).substr(0,4)} </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="row">
                            {listApp.map((item,i)=> {
                                return (
                                    <div className="col-lg-4">
                                        <div className={styles.wrplistapp}>
                                            <div className={styles.imgwrp}>
                                                {item.thumbnail != null ? <Image src={apiUrl+item.thumbnail.url} width={item.thumbnail.width} height={item.thumbnail.height} alt={item.title}/> : <div style={{display:'flex', height:'100%', minHeight:60, alignItems:"center", justifyContent:"space-around", margin:'0 auto', textAlign:"center"}}><span>Image</span></div>}
                                            </div>
                                            <div className={styles.desc}>
                                                <a href="#"><h5>{item.title}</h5></a>
                                                <div className={styles.infodate}>
                                                    <span>By {item.author === null ? "admin" : item.author}</span> 
                                                    <span>{(item.updated_at).substr(8,2)}-{(item.updated_at).substr(5,2)}-{(item.updated_at).substr(0,4)} </span>
                                                </div>                                                    

                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{textAlign:"center", display:"block", marginTop:30}}>
                            <a href="#" className="btn medium">Lihat aplikasi lainnya</a>
                        </div>

                    </div>
                </div>

                {
                    contentAds4.bannerImage === "withBanner" ? <AdsBanner linkbanner={contentAds4.link} urlImage={contentAds4.urlImage} width={contentAds4.widthImage} height={contentAds4.heightImage}/>
                    : <Ads banner={contentAds4.iframe}/>
                }            

                <div className={styles.tipstrik}>
                    <div className={styles.contents}>
                        <Title title="Tips & Trik"></Title>
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="row">
                                    {
                                        tipsTrik.map((item,i) => {
                                            return (
                                                <div className="col-lg-6" key={item.id}>
                                                    <div className={styles.itemcontent}>
                                                        <div className={styles.left}>
                                                            <div className={styles.desc}>
                                                                <div className={styles.tags}>
                                                                    {(item.tags).map(data=> {
                                                                        return (
                                                                            <a href="#" key={data.id}>{data.tag_name}</a>
                                                                        )
                                                                    })}
                                                                </div>
                                                                <a href="#"><h5>{item.title.substr(0,50)}..</h5></a>
                                                                <div className={styles.infodate}>
                                                                    <span>By {item.author === null ? "admin" : item.author}</span> 
                                                                    <span>{(item.updated_at).substr(8,2)}-{(item.updated_at).substr(5,2)}-{(item.updated_at).substr(0,4)} </span>
                                                                </div>
                                                            </div>                                                            
                                                        </div>
                                                        <div className={styles.right}>
                                                            <div className={styles.imgwrp}><Image src={apiUrl+item.thumbnail.url} width={item.thumbnail.width/3} height={item.thumbnail.height/3} alt={item.title}/></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }                                    
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className={styles.maintipstrik}>
                                    {
                                        tipsTrikMain.map((item,i)=> {
                                            return (
                                                <div key="item.id">
                                                    <div className={styles.topberita}>
                                                        <div className={styles.imgwrp}>
                                                            <Image src={apiUrl+item.thumbnail.url} width={item.thumbnail.width*1.3} height={item.thumbnail.height*1.3} alt="item.title"/>
                                                        </div>
                                                        <div className={styles.desc}>
                                                            <a href="#"><h5>{item.title}</h5></a>
                                                            <p>{(item.content).substr(0, 110)}...</p>
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
                                <div className={styles.secondtipstrik}>
                                    {
                                        tipsTrikSecond.map((item,i)=> {
                                            return (
                                                <div className={styles.itemcontent} key={item.id}>
                                                    <div className={styles.left}>
                                                        <div className={styles.desc}>
                                                            <div className={styles.tags}>
                                                                {(item.tags).map(data=> {
                                                                    return (
                                                                        <a href="#" key={data.id}>{data.tag_name}</a>
                                                                    )
                                                                })}
                                                            </div>
                                                            <a href="#"><h5>{item.title.substr(0,55)}..</h5></a>
                                                            <div className={styles.infodate}>
                                                                <span>By {item.author === null ? "admin" : item.author}</span> 
                                                                <span>{(item.updated_at).substr(8,2)}-{(item.updated_at).substr(5,2)}-{(item.updated_at).substr(0,4)} </span>
                                                            </div>
                                                        </div>                                                            
                                                    </div>
                                                    <div className={styles.right}>
                                                        <div className={styles.imgwrp}><Image src={apiUrl+item.thumbnail.url} width={item.thumbnail.width/3} height={item.thumbnail.height/3} alt={item.title}/></div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    contentAds5.bannerImage === "withBanner" ? <AdsBanner linkbanner={contentAds5.link} urlImage={contentAds5.urlImage} width={contentAds5.widthImage} height={contentAds5.heightImage}/>
                    : <Ads banner={contentAds5.iframe}/>
                }            
                {contentAds5.bannerImage}

            </LayoutHome>
        </React.Fragment>
    )
}
