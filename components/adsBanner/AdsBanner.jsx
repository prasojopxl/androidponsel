import styles from "./adsbanner.module.scss";
import Image from "next/image";

export default function AdsBanner(props) {
    return (
        <div className={styles.ads}>
            <div className={styles.contents}>
                <a href={props.linkbanner}>
                    <Image src={props.urlImage} width={props.width} height={props.height} alt="baner" />
                </a>
            </div>
        </div>

    )
}
