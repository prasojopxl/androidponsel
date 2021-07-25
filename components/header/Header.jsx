import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { apiUrl, baseUrl } from "../../config/variable";
import styles from "./Header.module.scss";

export default function Header(props) {
  return (
    <Fragment>
      <div className={styles.header}>
        <div className={styles.contents}>
          <div className={styles.left}>
            <Link href={baseUrl}>
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
            <ul className={styles.mainmenu}>{props.listmenu}</ul>
          </div>
          <div className={styles.right}>
            {/* <Image src={IconSearch} alt="seacrh" width="24px" height="24px" /> */}
          </div>
        </div>
      </div>
      <div className={styles.TopBrands}>
        <label>Merk:</label>
        <ul>{props.listTopBrands}</ul>
      </div>
    </Fragment>
  );
}
