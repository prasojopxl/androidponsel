import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link"
import styles from "./Header.module.scss";
import axios from "axios";
import { baseUrl, apiUrl } from '../../config/variable';



export default function Header() {
    const [menu, setMenu] = useState([]);
    const [logo, setLogo]= useState([]);

    const getMenu = () => {
        axios.get(`${apiUrl}/menus`)
        .then((res)=> {
            setMenu(res.data)
        })
    }

    const getLogo = () => {
        axios.get(`${apiUrl}/general`)
        .then ((res)=> {
            setLogo(res.data.logo.url)
        })
    }

    useEffect(()=> {
        getMenu();
        getLogo();
    },[])

    return (
        <div className={styles.header}>
            <div className={styles.contents}>
                <div className={styles.left}>                    
                    <Link href={baseUrl}><a><img src={`${apiUrl}${logo}`} width="160px" height="32px"/></a></Link>                    
                </div>
                <div className={styles.center}>
                    <ul className={styles.mainmenu}>
                    {menu.map((item,i)=> {
                        return(
                            <li key={item.id}><Link href={baseUrl+item.title}><a>{item.title}</a></Link></li>
                        )
                    })}
                    </ul>
                </div>
                <div className={styles.right}>
                    {/* <Image src={IconSearch} alt="seacrh" width="24px" height="24px" /> */}
                </div>
            </div>
        </div>
    )
}
