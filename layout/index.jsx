import Head from "next/head";
import { Fragment } from "react";
import { Footer, Header, SEO } from "../components";
import styles from "./layout.module.scss";

export default function Layout(props) {
    const { dataSEO, dataMainMenu, dataBrands, dataProd } = props;
    return (
        <Fragment>
            <Head>
                <SEO title={dataSEO.title} description={dataSEO.description} keywords={dataSEO.keywords} />
            </Head>

            <div className={styles.headerweb}>
                <div className="relative_triger">
                    <Header mainMenu={dataMainMenu} brands={dataBrands} searchProd={dataProd} />
                </div>
            </div>
            <div className={styles.bodyweb}>{props.children}</div>

            <div className={styles.footerweb}>
                <Footer />
            </div>
        </Fragment>
    );
}
