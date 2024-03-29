import { GlobalAds } from "../components";
import styles from "./pages.module.scss";
import { fetchData } from '../config/data';
import Layout from '../layout'
import Link from "next/link";
import { useRouter } from "next/router"

export default function Menulis(props) {
    const router = useRouter();

    return (
        <Layout
            dataSEO={props.dataSEO.seo}
            dataMainMenu={props.getMenu}
            dataBrands={props.getTopBrands}
        >
            <GlobalAds adsId="1" />
            <div className={styles.pages}>
                <div className={styles.bgGradient}>
                    <div style={{
                        backgroundImage: "url(/faq.png)",
                        backgroundAttachment: "fixed",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right center",
                        minHeight: 400,
                    }}>
                        <div className={styles.contents}>
                            <h2>Bergabung Sebagai Penulis?</h2>

                            <ul>
                                <li><Link href="/"><a>Home</a></Link></li>
                                <li><Link href={router.route}><a>Menulis</a></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.contents}>
                    <h2>Bagaimana Bergabung Menjadi Penulis?</h2>
                    <div className={styles.itemfaq}>
                        <h4>Bagaimana cara menulis dan berkontribusi di androidponsel?</h4>
                        <p>Consequatur similique nulla ipsa voluptatum illum aperiam incidunt, voluptates magnam illo, possimus eligendi blanditiis</p>
                        <ol>
                            <li>Quisque pretium nunc id diam iaculis, quis tempor ex vehicula.</li>
                            <li>Pellentesque sodales magna eu sapien accumsan feugiat.</li>
                            <li>Pellentesque nec erat vulputate, vestibulum neque non, dictum turpis.</li>
                            <li>Vivamus bibendum eros non euismod faucibus.</li>
                            <li>Maecenas at metus ac nunc venenatis vulputate at non purus.</li>
                        </ol>
                    </div>
                    <div className={styles.itemfaq}>
                        <h4>Bagaimana cara menulis dan berkontribusi di androidponsel?</h4>
                        <p>Consequatur similique nulla ipsa voluptatum illum aperiam incidunt, voluptates magnam illo, possimus eligendi blanditiis</p>
                        <ol>
                            <li>Quisque pretium nunc id diam iaculis, quis tempor ex vehicula.</li>
                            <li>Pellentesque sodales magna eu sapien accumsan feugiat.</li>
                            <li>Pellentesque nec erat vulputate, vestibulum neque non, dictum turpis.</li>
                            <li>Vivamus bibendum eros non euismod faucibus.</li>
                            <li>Maecenas at metus ac nunc venenatis vulputate at non purus.</li>
                        </ol>
                    </div>
                    <div className={styles.itemfaq}>
                        <h4>Bagaimana cara menulis dan berkontribusi di androidponsel?</h4>
                        <p>Consequatur similique nulla ipsa voluptatum illum aperiam incidunt, voluptates magnam illo, possimus eligendi blanditiis</p>
                        <ol>
                            <li>Quisque pretium nunc id diam iaculis, quis tempor ex vehicula.</li>
                            <li>Pellentesque sodales magna eu sapien accumsan feugiat.</li>
                            <li>Pellentesque nec erat vulputate, vestibulum neque non, dictum turpis.</li>
                            <li>Vivamus bibendum eros non euismod faucibus.</li>
                            <li>Maecenas at metus ac nunc venenatis vulputate at non purus.</li>
                        </ol>
                    </div>
                    <div className={styles.itemfaq}>
                        <h4>Bagaimana cara menulis dan berkontribusi di androidponsel?</h4>
                        <p>Consequatur similique nulla ipsa voluptatum illum aperiam incidunt, voluptates magnam illo, possimus eligendi blanditiis</p>
                        <ol>
                            <li>Quisque pretium nunc id diam iaculis, quis tempor ex vehicula.</li>
                            <li>Pellentesque sodales magna eu sapien accumsan feugiat.</li>
                            <li>Pellentesque nec erat vulputate, vestibulum neque non, dictum turpis.</li>
                            <li>Vivamus bibendum eros non euismod faucibus.</li>
                            <li>Maecenas at metus ac nunc venenatis vulputate at non purus.</li>
                        </ol>
                    </div>
                    <div className={styles.itemfaq}>
                        <h4>Bagaimana cara menulis dan berkontribusi di androidponsel?</h4>
                        <p>Consequatur similique nulla ipsa voluptatum illum aperiam incidunt, voluptates magnam illo, possimus eligendi blanditiis</p>
                        <ol>
                            <li>Quisque pretium nunc id diam iaculis, quis tempor ex vehicula.</li>
                            <li>Pellentesque sodales magna eu sapien accumsan feugiat.</li>
                            <li>Pellentesque nec erat vulputate, vestibulum neque non, dictum turpis.</li>
                            <li>Vivamus bibendum eros non euismod faucibus.</li>
                            <li>Maecenas at metus ac nunc venenatis vulputate at non purus.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const dataSEO = await fetchData("/general");
    const getMenu = await fetchData("/menus?_sort=order");
    const getTopBrands = await fetchData("/brands?_top_brand=true");
    const dataBanerProdukTop = await fetchData(`/ads/8?_publicationState=preview`);

    return {
        props: {
            getMenu,
            getTopBrands,
            dataSEO,
            dataBanerProdukTop,
        }
    }
}
