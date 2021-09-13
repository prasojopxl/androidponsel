import { useState, useEffect } from "react";
import data from "../../pages/data.json";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { apiUrl, baseUrl } from "../../config/variable";
import styles from "./Header.module.scss";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //https://dev.to/vuongddang/how-to-use-fontawesome-in-next-js-5bl5
import { Search } from "../../components"
import axios from "axios";

export default function Header(props) {
    const { mainMenu, brands, searchProd } = props;
    const [inputVal, setInputVal] = useState("");
    const [people, setPeople] = useState([]);
    const [dataProd, setDataProd] = useState([])
    const getDataProd = () => {
        axios.get(`${apiUrl}/products`).then(res => {
            setPeople(res.data)
        })
    }
    useEffect(() => {
        getDataProd();
    }, [])
    return (
        <Fragment>
            <div className={styles.header}>
                <div className={styles.contents}>
                    <div className={styles.left}>
                        <Link href="/">
                            <a>
                                <Image
                                    src={`${apiUrl}/uploads/logo_2b23bd5ec1.png`}
                                    width="192px"
                                    height="33px"
                                    alt="androindponsel.com"
                                />
                            </a>
                        </Link>
                    </div>
                    <div className={styles.center}>
                        <ul className={styles.mainmenu}>
                            {
                                mainMenu.map(item => {
                                    return (
                                        <li key={item.id}><Link href={item.url}><a>{item.title}</a></Link></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className={styles.right}>
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>
            </div>
            <div className={styles.TopBrands}>
                <label>Merk:</label>
                <ul>
                    {
                        brands.map(item => {
                            return (
                                <li key={item.id}><Link href={`/brand/${item.slug}`}><a>{item.title}</a></Link></li>
                            )
                        })
                    }
                </ul>
            </div>

            <input
                type="text"
                value={inputVal}
                onChange={(e) => {
                    setInputVal(e.target.value);
                }}
                placeholder="search..."
            />
            {people
                .filter((person) => {
                    if (inputVal === "") {
                        return person;
                    } else if (
                        person.title
                            .toLowerCase()
                            .includes(inputVal.toLowerCase())
                    ) {
                        return person;
                    }
                })
                .map((item, i) => {
                    return (
                        <div key={item.id}>
                            <a href={item.slug}>{item.title}</a>
                        </div>
                    );
                })}

        </Fragment >
    );
}
