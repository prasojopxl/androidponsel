import {useState, useEffect}  from 'react'
import styles from "./listnews.module.scss"
import axios from "axios";
import Image from "next/image";
import {Title, Ads, AdsBanner} from "../../components";
import { apiUrl } from '../../config/variable';



export function ListNews(props) {
    const [listNews, setListNews] = useState([]);
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

    // const getListNews = () => {        
    //     axios.get(`http://localhost:1337/posts?menu=2&_limit=9&_start=${props.page}`)
    //     .then (res=> {
    //         setListNews(res.data)
    //     })
    // }

    const getListNews = async () => {        
        const res = await fetch(`http://localhost:1337/posts?menu=2&_limit=9&_start=${props.page}`)
        const resData = await res.json();
        setListNews(resData)
    }

    useEffect(()=> {
        getVerticalAds();
        getListNews();

    },[])

    return (
        <div className={styles.listnews}>
            <div className={styles.contents}>
                <Title title="Berita"/>
                <div className="row">
                    <div className="col-lg-9">
                        <div className="row">
                            {
                                listNews.map((item, i)=> {
                                    return (
                                        <div className="col-lg-4" key={item.id}>                                
                                            <div className={styles.wrpitemnews}>
                                                    <div className={styles.imgwrp}><Image src={item.thumbnail.url} width={item.thumbnail.width} height={item.thumbnail.height} alt={item.title}/></div>
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
    )
}
