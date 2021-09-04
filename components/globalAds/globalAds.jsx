import styles from "./globalAds.module.scss";
import useSWR from 'swr'
import { apiUrl } from '../../config/variable';
import Image from "next/image";

export default function GlobalAds(props) {
    const { data, error } = useSWR(`${apiUrl}/ads/${props.adsId}?_publicationState=preview`)
    if (error) return "An error has occurred.";
    if (!data) return (
        <div style={{ textAlign: "center" }}>
            loading
        </div>
    );
    console.log(data)
    return (
        <div>
            {data.Image_Banner !== null ?
                <div className={styles.ads}>
                    <div className={styles.contents}>
                        <a href={data.url}>
                            <Image src={apiUrl + data.Image_Banner.url} width={data.Image_Banner.width} height={data.Image_Banner.height} alt={data.title} />
                        </a>
                    </div>
                </div>
                :
                <div className={styles.ads}>
                    <div className={styles.contents}>
                        <iframe src={data.URL_Iframe} scrolling="no" title="baner ads"></iframe>
                    </div>
                </div>
            }
        </div>
    )
}
