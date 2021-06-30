import React, {useEffect, useState} from "react";
import Logo from "../../public/images/logo.svg";
import IconSearch from "../../public/images/search-icon.svg";
import Image from "next/image";
import styles from "./Header.module.scss";
import axios from "axios";
import { apiUrl } from '../../config/variable';


export default function Header() {
    const [menu, setMenu] = useState([]);


    const getMenu = () => {
        axios.get(`${apiUrl}/menus`)
        .then((res)=> {
            console.log(res.data)
            setMenu(res.data)
        })
    }

    useEffect(()=> {
        getMenu();
    },[])

    return (
        <div className={styles.header}>
            <div className={styles.contents}>
                <div className={styles.left}>
                    <a href="#"><Image src={Logo} alt="androidponsel.com" width="187px" height="32px"/> </a>
                </div>
                <div className={styles.center}>
                    <ul className={styles.mainmenu}>
                    {menu.map((item,i)=> {
                        return(
                            <li><a href={item.title}>{item.title} </a></li>
                        )
                    })}
                    </ul>
                </div>
                <div className={styles.right}>
                    <Image src={IconSearch} alt="seacrh" width="24px" height="24px" />
                </div>
            </div>
        </div>
    )
}
