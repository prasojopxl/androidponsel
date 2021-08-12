import { Html, Head } from "next/document";
import { Fragment } from "react";
import { Footer, Header, SEO } from "../components";
import styles from "./layout.module.scss";

export default function Layout(props) {
    const { dataSEO, dataMainMenu, dataBrands } = props;
    return (
        <Html lang="id">
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
        </Html>
    );
}
