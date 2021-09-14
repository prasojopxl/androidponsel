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
    const [showSearch, setShowSearch] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const getDataProd = () => {
        axios.get(`${apiUrl}/products`).then(res => {
            setPeople(res.data)
        })
    }
    const handleChange = e => {
        setInputVal(e.target.value);
        e.target.value === "" ? setShowSearch(false) : setShowSearch(true)
    };
    const resultSearch = () => {
        showResult === false ? setShowResult(true) : setShowResult(false)
    }
    const showMenuMobile = () => {
        showMenu == false ? setShowMenu(true) : setShowMenu(false)
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
                        <FontAwesomeIcon icon={faSearch} onClick={resultSearch} style={{ cursor: "pointer" }} />
                        <div className={styles.navMenu} onClick={showMenuMobile}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
            {
                showResult &&
                <>
                    <div className={styles.inputSearch}>
                        <span>Cari Handphone</span>
                        <input
                            type="text"
                            value={inputVal}
                            onChange={handleChange}
                            placeholder="search..."
                        />
                    </div>
                    <div className={styles.searchResult}>
                        {showSearch &&
                            people.filter((person) => {
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
                                        <div className={styles.itemResult} key={item.id}>
                                            <a href={`${baseUrl}handphone/${item.slug}`}>{item.title}</a>
                                        </div>
                                    );
                                })}
                    </div>

                </>
            }
            {
                showMenu &&
                <ul className={styles.mainMenuMobile}>
                    {
                        mainMenu.map(item => {
                            return (
                                <li key={item.id}><Link href={item.url}><a>{item.title}</a></Link></li>
                            )
                        })
                    }
                </ul>

            }

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
        </Fragment >
    );
}
