import Head from "next/head";
import styles from "./Layout.module.scss";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { apiUrl } from "../../config/variable";


export default function Layout(props) {
    const [menu, setMenu] = useState([]);
    const [lalestPost, setLatestPost]= useState([]);
    const [logo, setLogo]= useState([]);
    const [logoWidth, setlogoWidth]= useState([])
    const [logoHeight, setlogoHeight]= useState ([])

    const getMenu = () => {
        axios.get(`${apiUrl}/menus`)
        .then((res)=> {
            setMenu(res.data)
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
                        <div className="row">
                            <div className="col-lg-9">
                                <div className={styles.boxwhite}>
                                    {props.children}
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className={styles.stickytop}>
                                    <div className={`${styles.boxwhite} ${styles.itemboxwhite}`}>
                                        <div className={styles.itemsidebar}>
                                            <h4>Terbaru</h4>
                                            <div className={styles.wrpitem}>
                                                {lalestPost.map((item,i)=> {
                                                    return(
                                                        <div className={styles.itemterbaru} key={item.id}>
                                                            <div className={styles.imgwrp}>
                                                                <Image src={item.thumbnail.url} width={item.thumbnail.width} height={item.thumbnail.height} alt={item.alternativeText}></Image>
                                                            </div>
                                                            <a href="#">{(item.title).substring(0,30)} ...</a>
                                                        </div>
        
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.boxwhite} ${styles.itemboxwhite}`}>
                                        <div className={styles.itemsidebar}>
                                            <h4>Tags</h4>
                                        </div>
                                    </div>
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
