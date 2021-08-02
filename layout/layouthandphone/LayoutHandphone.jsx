import Head from "next/head";
import { Fragment } from "react";
import { Footer, Header } from "../../components";
import { apiUrl } from "../../config/variable";
import styles from "./layouthandphone.module.scss";

export default function LayoutHandphone(props) {
  return (
    <Fragment>
      <Head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>{props.title}</title>
        <meta name="description" content="Description page here" />
        <meta name="keywords" content="Frontend, Website, HTML, CSS" />
        <meta name="author" content="Developer" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link
          rel="shortcut icon"
          href={apiUrl + "/uploads/fav_425b2ec632.png"}
        />
      </Head>

      <div className={styles.headerweb}>
        <Header
          listmenu={props.menu}
          listTopBrands={props.listTopBrands}
        ></Header>
      </div>

      <div className={styles.bodyweb}>{props.children}</div>

      <div className={styles.footerweb}>
        <Footer />
      </div>
    </Fragment>
  );
}
