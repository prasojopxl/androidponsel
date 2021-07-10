import React from 'react'
import styles from "./ads.module.scss";
import Image from "next/image";

export function Ads(props) {
    return (
        <div className={styles.ads}>
            <div className={styles.contents}>
                <iframe src={props.banner} scrolling="no"></iframe>
            </div>
        </div>
    )
}