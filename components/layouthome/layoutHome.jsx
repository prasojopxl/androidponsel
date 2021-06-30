import Head from "next/head";
import styles from "./layouthome.module.scss";
import React, {Children, useEffect, useState} from "react";
import Header from "../header/Header";
import Footer from "../footer/footer";

export default function LayoutHome(props) {
 
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
                <Header/>
            </div>            

            <div className={styles.bodyweb}>
                {props.children}
            </div>            
            
            <div className={styles.footerweb}>
                <Footer/>
            </div>

        </React.Fragment>
    )
}
