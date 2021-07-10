import React,{useState, useEffect} from 'react';
import styles from "./latestnews.module.scss";
import axios from "axios";
import Image from "next/image";
import {Title} from "../../components";
import { apiUrl } from '../../config/variable';

export function LatestNews() {
    const [mainNews, setMainNews] = useState([]);
    const [topNews, setTopNews] = useState([]);
    const [contNews, setContNews] = useState([]);

    const getMainNews = () => {
        axios.get(`${apiUrl}/posts?menu=2&_sort=updated_at:DESC&_limit=1`)
        .then((res)=> {
            setMainNews(res.data)
        })
    }

    const getTopNews = () => {
        axios.get(`${apiUrl}/posts?menu=2&_sort=updated_at:DESC&_start=2&_limit=2`)
        .then ((res)=> {
            setTopNews(res.data)
        })
    }

    const getContNews = () => {
        axios.get(`${apiUrl}/posts?menu=2&_sort=updated_at:DESC&_start=4&_limit=6`)
        .then((res)=> {
            setContNews(res.data)
        })
    }

    useEffect(()=>{
        getMainNews();
        getTopNews();
        getContNews();
    },[])


    return (
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
                                            <div className={styles.imgwrp}><Image src={item.thumbnail.url} width={item.thumbnail.width} height={item.thumbnail.height} alt={item.title}/></div>                                                                                        
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
                                            <div className={styles.wrpitemnews}>
                                                <div className={styles.imgwrp}><Image src={item.thumbnail.url} width={item.thumbnail.width/3} height={item.thumbnail.height/3} alt={item.title}/></div>
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
                                    <div className="col-lg-6">                                
                                        <div className={styles.wrpitemnews}>
                                                <div className={styles.imgwrp}><Image src={item.thumbnail.url} width={item.thumbnail.width/3} height={item.thumbnail.height/3} alt={item.title}/></div>
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
                    <div className="col-lg-3">Baner</div>
                </div>
                <div style={{textAlign:"center", display:"block", marginTop:30}}>
                    <a href="#" className="btn medium">Lihat berita terbaru lainnya</a>
                </div>
            </div>
        </div>
    )
}
