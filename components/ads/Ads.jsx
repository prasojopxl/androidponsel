import styles from "./ads.module.scss";

export default function Ads(props) {
    return (
        <div className={styles.ads}>
            <div className={styles.contents}>
                {props.iframeBanner}
            </div>
        </div>
    )
}
