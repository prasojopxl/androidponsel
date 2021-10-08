import Link from 'next/link'
import React from 'react'
import { baseUrl } from '../../config/variable'
import styles from "./paging.module.scss";

export default function Paging(props) {
    return (
        <div className={styles.paging}>
            <ul>
                <li>{props.linkPrev <= 0 ? <div className={styles.disable}>Previous</div> : <Link href={`${baseUrl + "handphone/page/" + props.linkPrev}`}><a className={styles.btnPaging}>Previous</a></Link>} </li>
                <li>{props.linkNext > props.lengthPost ? <div className={styles.disable}>Next</div> : <Link href={`${baseUrl + "handphone/page/" + props.linkNext}`}><a className={styles.btnPaging}>Next</a></Link>}</li>
            </ul>
        </ div>
    )
}
