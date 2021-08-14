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

    const removeLocalProd = () => {
        localStorage.removeItem("produk1")
        localStorage.removeItem("produk2")
        localStorage.removeItem("produk3")
        setIsActive(false)
    }
    const resetColor = () => {
        var elements = document.getElementsByClassName('btncompare'); // get all elements
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = "#89c340";
            elements[i].innerText = "BANDINGKAN PRODUK";
        }
    }
    const addCompare = (slug, e, title) => {
        let p1 = localStorage.getItem("produk1");
        let p2 = localStorage.getItem("produk2");
        let p3 = localStorage.getItem("produk3");
        if (e.target.innerText === "BANDINGKAN PRODUK") {
            e.target.innerText = "DIBANDINGKAN"
            e.target.style.background = "#ddd"
            if (p1 === null) {
                localStorage.setItem("produk1", props.slug)
                e.target.title = "produk1"
            }
            else if (p1 !== null && p2 == null) {
                localStorage.setItem("produk2", props.slug)
                e.target.title = "produk2"
            }
            else if (p1 !== null && p2 !== null && p3 == null) {
                localStorage.setItem("produk3", props.slug)
                e.target.title = "produk3"
            }
            else {
                alert("Maximal 3 produk")
                localStorage.removeItem("produk1")
                localStorage.removeItem("produk2")
                localStorage.removeItem("produk3")
                resetColor();
            }
        }
        else {
            e.target.innerText = "BANDINGKAN PRODUK"
            e.target.style.background = "#89c340"
            if (p2 === null) {
                localStorage.removeItem(e.target.title)
            }
            if (p3 === null) {
                localStorage.removeItem(e.target.title)
            }
            else {
                localStorage.removeItem(e.target.title)
            }
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
                    <button className={`${styles.btnfull} btncompare`} name="mybtn" onClick={(e) => addCompare(props.slug, e, props.title)} >
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
