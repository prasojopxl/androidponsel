import React from 'react'
import styles from "./title.module.scss";

export function Title(props) {
    return (
        <div className={styles.title}>
            <h4>{props.title}</h4>
        </div>
    )
}
