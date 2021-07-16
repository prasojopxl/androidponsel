import { Rate, Title } from "../../components";
import { apiUrl } from "../../config/variable";
import LayoutHandphone from "../../layout/layouthandphone/LayoutHandphone";
import Image from "next/image"
import styles from "./index.module.scss";

export async function getStaticProps() {
    const resListHanphone = await fetch(`http://localhost:1337/products?category=1&_limit=12`)
    const dataListHandphone = await resListHanphone.json();

    return {
        props: {
            dataListHandphone
        }
    }
}

export default function Handphone({dataListHandphone}) {
    return (
        <LayoutHandphone>
            <div className={styles.pagelisthandphone}>
                <div className={styles.contents}>
                    <Title title="Handphone"></Title>
                    <div className="row">
                        {
                            dataListHandphone.map((item,i)=> {
                                return (
                                    <div className="col-lg-3" key={item.id}>
                                        <div className={styles.productItem}>
                                            <div className={styles.shortproduct}>
                                                <div className={styles.imageprod}><Image src={apiUrl+item.product_image[0].url} width={item.product_image[0].width/3} height={item.product_image[0].height/3}/> </div>
                                                <div className={styles.productinfo}>
                                                    <h5>{item.title}</h5>
                                                    <h6>{item.memory_internal}</h6>
                                                    <Rate TotalRate={item.rate.rating}/>
                                                </div>
                                            </div>
                                            <div className={styles.wrpbtn}>
                                                <a href="#" className={styles.btnfull}>BANDINGKAN PRODUK</a>
                                                <a href="#" className={styles.btnblank}>LIHAT SELENGKAPNYA</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </LayoutHandphone>
    )
}
