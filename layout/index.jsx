import Head from "next/head";
import { Fragment } from "react";
import { Footer, Header, SEO } from "../components";
import styles from "./layout.module.scss";

export default function Layout(props) {
    const { dataSEO, dataMainMenu, dataBrands } = props;
    return (
        <html xmlns="http://www.w3.org/1999/xhtml" lang="id">
            <Head>
                <SEO title={dataSEO.title} description={dataSEO.description} keywords={dataSEO.keywords} />
            </Head>

            <div className={styles.headerweb}>
                <Header mainMenu={dataMainMenu} brands={dataBrands} />
            </div>
            <div className={styles.bodyweb}>{props.children}</div>

            <div className={styles.footerweb}>
                <Footer />
            </div>
        </html>
    );
}
