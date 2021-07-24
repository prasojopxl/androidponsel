import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiUrl, baseUrl } from "../../config/variable";
import styles from "./Header.module.scss";

export default function Header() {
  const [menu, setMenu] = useState([]);
  const [logo, setLogo] = useState([]);

  const getMenu = () => {
    axios
      // .get(`${apiUrl}/menus`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      //   },
      // })
      .get(`${apiUrl}/menus`)
      .then((res) => {
        setMenu(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLogo = () => {
    axios.get(`${apiUrl}/general`).then((res) => {
      setLogo(res.data.logo.url);
    });
  };

  useEffect(() => {
    getMenu();
    getLogo();
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.contents}>
        <div className={styles.left}>
          <Link href={baseUrl}>
            <a>
              <Image
                src={`${apiUrl}${logo}`}
                width="153.6px"
                height="46.4px"
                alt="androindponsel.com"
              />
            </a>
          </Link>
        </div>
        <div className={styles.center}>
          <ul className={styles.mainmenu}>
            {menu.map((item, i) => {
              return (
                <li key={item.id}>
                  <Link href={baseUrl + item.title}>
                    <a>{item.title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.right}>
          {/* <Image src={IconSearch} alt="seacrh" width="24px" height="24px" /> */}
        </div>
      </div>
    </div>
  );
}
