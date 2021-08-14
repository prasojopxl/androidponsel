import { Fragment, useState, useEffect } from "react"
import styles from "./products.module.scss"
import { Rate } from "../index";
import { apiUrl } from "../../config/variable";
import Image from "next/image";
import Link from "next/link";

export default function ItemProduct(props) {
    const [show, setShow] = useState(false)
    const [compare1, setCompare1] = useState("")
    const [compare2, setCompare2] = useState("")
    const [compare3, setCompare3] = useState("")
    const [isActive, setIsActive] = useState(false)

    function removeLocalProd() {
        localStorage.removeItem("produk1")
        localStorage.removeItem("produk2")
        localStorage.removeItem("produk3")
        setIsActive(false)
    }

    const addCompare = (slug, e, title) => {
        let p1 = localStorage.getItem("produk1");
        let p2 = localStorage.getItem("produk2");
        let p3 = localStorage.getItem("produk3");
        if (p1 == null && p2 == null && p3 == null) {
            localStorage.setItem("produk1", slug)
            setCompare1(title)
            setShow(true)
            e.target.disabled = true
        }
        else if (p1 !== null && p2 == null && p3 == null) {
            localStorage.setItem("produk2", slug)
            setCompare2(title)
            setShow(true)
            e.target.disabled = true
        }
        else {
            localStorage.setItem("produk3", slug)
            // setCompare3(title)
            setIsActive(true)
        }
    }
    useEffect(() => {
        removeLocalProd();
    }, [])
    return (
        <Fragment>
            <div className={styles.productItem}>
                <div className={styles.shortproduct}>
                    <div className={styles.imageprod}>
                        <Image
                            src={apiUrl + props.productImage.url}
                            width={props.productImage.width / 3}
                            height={props.productImage.height / 3}
                            alt={props.productImage.name}
                        />{" "}
                    </div>
                    <div className={styles.productinfo}>
                        <h5>{props.title}</h5>
                        <h6>{props.memoryInternal}</h6>

                        {props.rating !== null && (
                            <Rate TotalRate={props.rating} />
                        )}
                    </div>
                </div>
                <div className={`${styles.wrpbtn}`}>
                    <button className={`${styles.btnfull} btncompare`} name="mybtn" onClick={(e) => addCompare(props.slug, e, props.title)} disabled={isActive}>
                        BANDINGKAN PRODUK
                    </button>
                    <Link href={`${"/handphone/" + props.slug}`}>
                        <a className={styles.btnblank}>
                            LIHAT SELENGKAPNYA
                        </a>
                    </Link>
                </div>
            </div>
        </Fragment>
    )
}
