import { Fragment } from "react";
import { Footer, Header, SEO } from "../components";
import styles from "./layout.module.scss";
import Head from "next/head";

export default function Layout(props) {
    const { dataSEO, dataMainMenu, dataBrands, dataProd } = props;
    return (
        <Fragment>
            <Head>
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-122566613-1"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-122566613-1');

            `,
                    }}
                />
            </Head>
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
