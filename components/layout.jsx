import Head from "next/head";
import styles from "../styles/Layout.module.scss";
import Image from "next/image";

export default function Layout(props) {
    return (
        <div>
            <Head>
                <title>{props.title}</title>
                <link rel="shortcut icon" href="../images/favicon.ico"/>
            </Head>         

            <div className={styles.headerweb}>
                <div className={styles.contents}>
                    <div className={styles.left}>
                    </div>      
                    <div className={styles.right}>
                        ini kanan    
                    </div>          
                </div>
            </div>
            <Image 
                        src="/gal.jpg" 
                        layout="responsive"
                        width={448}
                        height={484}                        
                        />

            {props.children}
        </div>
    )
}
