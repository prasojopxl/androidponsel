import Head from "next/head";
import styles from "./layouthome.module.scss";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { apiUrl } from "../../config/variable";


export default function LayoutHome(props) {
    const [menu, setMenu] = useState([]);
    const [lalestPost, setLatestPost]= useState([]);
    const [logo, setLogo]= useState([]);

    const getMenu = () => {
        axios.get(`${apiUrl}/menus`)
        .then((res)=> {
            setMenu(res.data)
        })
    }

    const getGeneral = () => {
        axios.get(`${apiUrl}/general`)
        .then((res)=>{
            setLogo(res.data.logo.url)
        })
    }

    const getLatestPost = () => {
        axios.get(`${apiUrl}/posts?_limit=3&_sort=updated_at`)
        .then((res)=> {
            setLatestPost(res.data)
        })
    }

    useEffect(()=>{
        getMenu();
        getLatestPost();
        getGeneral();
    },[])
    return (
        <React.Fragment>
            <Head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>{props.title}</title>
                <meta name="description" content="Description page here"/>
                <meta name="keywords" content="Frontend, Website, HTML, CSS"/>
                <meta name="author" content="Developer"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
                <link rel="shortcut icon" href="fav.svg"/>                
            </Head>         

            <div className={styles.headerweb}>
                <div className={styles.contents}>
                    <div className={styles.left}>                        
                        <a href="#" className={styles.mainlogo}>
                            logo                          
                        </a>
                    </div>
                    <div className={styles.right}>
                        <ul className={styles.mainmenu}>
                            {menu.map((item,i)=> {
                                return (
                                    <li key={item.id}><a href="#">{item.title}</a></li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>            

            <div className={styles.bodyweb}>
                <div className={styles.wrppages}>
                    <div className={styles.contents}>
                        <div className="fullbaner">
                            <div className="imgwrp"><img src="https://dummyimage.com/1200x150/d1cfd1/a1a2a8&text=Full+baner+Ads" alt=""/></div>
                        </div>
                        <div className={styles.categoriesHome}>
                            <ul>
                                <li><a href="#">Smartphone</a></li>
                                <li><a href="#">Smart TV</a></li>
                                <li><a href="#">Jam Tangan</a></li>
                                <li><a href="#">Lain-Lain</a></li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className={styles.boxwhite}>
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
            
            <div className={styles.footerweb}>
                <div className={styles.contents}>
                    Footer
                </div>
            </div>

        </React.Fragment>
    )
}
