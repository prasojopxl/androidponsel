import Head from "next/head";
import styles from "./layoutberita.module.scss";
import {Children, useEffect, useState, Fragment} from "react";
import {Header, Footer, ListCategories} from "../../components"

export default function LayoutBerita(props) {
 
    return (
        <Fragment>
            <Head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>{props.title}</title>
                <meta name="description" content="Description page here"/>
                <meta name="keywords" content="Frontend, Website, HTML, CSS"/>
                <meta name="author" content="Developer"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
                <link rel="shortcut icon" href="https://www.google.com/s2/favicons?domain=www.google.com"/>                
            </Head>         

            <div className={styles.headerweb}>
                <Header/>
                <ListCategories/>
            </div>            

            <div className={styles.bodyweb}>
                {props.children}
            </div>            
            
            <div className={styles.footerweb}>
                <Footer/>
            </div>

        </Fragment>
    )
}