import Link from 'next/link'
import React from 'react'
import { baseUrl } from '../../config/variable'
import styles from "./paging.module.scss";

export default function Paging(props) {
    return (
        <div className={styles.paging}>
            <ul>
                <li>{props.linkPrev <= 0 ? <div className={styles.disable}>Sebelumnya</div> : <Link href={`${baseUrl + "handphone/page/" + props.linkPrev}`}><a className={styles.btnPaging}>Sebelumnya</a></Link>} </li>
                <li>{props.linkNext > props.lengthPost ? <div className={styles.disable}>Berikutnya</div> : <Link href={`${baseUrl + "handphone/page/" + props.linkNext}`}><a className={styles.btnPaging}>Berikutnya</a></Link>}</li>
            </ul>
        </ div>
    )
}
