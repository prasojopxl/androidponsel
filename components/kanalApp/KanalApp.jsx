import React, {useEffect, useState} from 'react';
import styles from "./kanalapp.module.scss";
import axios from "axios";
import Image from "next/image";
import {Title} from "../../components";
import { apiUrl } from '../../config/variable';


export function KanalApp() {
    const [topApp, setTopApp] = useState([]);
    const [listApp, setListApp] = useState([]);

    const getTopApp = () => {
        axios.get(`${apiUrl}/posts?menu=2&_limit=2&_sort=updated_at:DESC`)
        .then(res=> {
            setTopApp(res.data)
        })
    }

    const getListApp = () => {
        axios.get(`${apiUrl}/posts?menu=10&_limit=15&_start=3&_sort=updated_at:DESC`)
        .then(res=> {
            setListApp(res.data)
        })
    }
    useEffect(()=> {
        getTopApp();
        getListApp();
    },[])

    return (
        <div className={styles.kanalapp}>
            <div className={styles.contents}>
                <Title title="Kanal Aplikasi"/>
                <div className="row">
                    {topApp.map((item,i)=> {
                        return(
                            <div className="col-lg-6" key={item.id}>
                                <div className={styles.topkanal}>
                                    <div className={styles.imgwrp}>
                                        <Image src={item.thumbnail.url} width={item.thumbnail.width*1.3} height={item.thumbnail.height*1.3} alt="item.title"/>
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
                                        {/* <Image src={item.thumbnail.url} width={item.thumbnail.width} height={item.thumbnail.height} alt={item.title}/> */}
                                        {item.thumbnail != null ? <Image src={item.thumbnail.url} width={item.thumbnail.width} height={item.thumbnail.height} alt={item.title}/> : <div style={{display:'flex', height:'100%', minHeight:60, alignItems:"center", justifyContent:"space-around", margin:'0 auto', textAlign:"center"}}><span>Image</span></div>}
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
    )
}
