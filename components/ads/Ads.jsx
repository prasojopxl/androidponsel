import styles from "./ads.module.scss";

export default function Ads(props) {
    return (
        <div className={styles.ads}>
            <div className={styles.contents}>
                <iframe src={props.banner} scrolling="no"></iframe>
            </div>
        </div>
    )
}
