import { Fragment } from "react";
import { Footer, Header, SEO } from "../components";
import styles from "./layout.module.scss";

export default function Layout(props) {
    const { dataSEO, dataMainMenu, dataBrands, dataProd } = props;
    return (
        <Fragment>

            <div className={styles.headerweb}>
                <div className="relative_triger">
                    <Header brands={dataBrands} searchProd={dataProd} />
                </div>
            </div>
            <div className={styles.bodyweb}>{props.children}</div>

            <div className={styles.footerweb}>
                <Footer />
            </div>
        </Fragment>
    );
}
