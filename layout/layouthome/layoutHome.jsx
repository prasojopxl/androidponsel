import Head from "next/head";
import { Fragment } from "react";
import { Footer, Header } from "../../components";
import SEO from "../../components/seo";
import { apiUrl } from "../../config/variable";
import styles from "./layouthome.module.scss";

export default function LayoutHome(props) {
    const { dataSEO, dataMainMenu, dataBrands } = props;
    return (
        <Fragment>
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
        </Fragment>
    );
}
