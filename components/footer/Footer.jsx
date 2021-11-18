import styles from "./footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import { staticImage } from "../../config/variable";


export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.contents}>
                <div className={styles.top}>
                    <div className="col-lg-5 col-md-7 col-sm-12 col-12">
                        <div className={styles.itemfooter}>
                            <h4>About Us</h4>
                            <div className={styles.item}>
                                <ul>
                                    <li><Link href="/about"><a>About Us</a></Link></li>
                                    <li><Link href="/sitemap"><a>Sitemap</a></Link></li>
                                    <li><Link href="/privacy"><a>Privacy Policy</a></Link></li>
                                </ul>
                                <ul>
                                    <li><Link href="/contact"><a>Contact Us</a></Link></li>
                                    <li><Link href="/disclaimer"><a>Terms of use</a></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-5 col-sm-12 col-12">
                        <div className={styles.itemfooter}>
                            <h4>Legal</h4>
                            <div className={styles.item}>
                                <ul>
                                    <li><Link href="/redaction"><a>Redaction</a></Link></li>
                                    <li><Link href="/cyber-media"><a>Cyber Media</a></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className={styles.itemfooter}>
                            <h4>Social Network</h4>
                            <div className={styles.item}>
                                <ul className={styles.socmed}>
                                    <li><Link href="#" target="_blank"><a><Image src={staticImage + "icon_fb.png"} alt="facebook" width={12 / 1.5} height={25 / 1.5} /></a></Link></li>
                                    <li><Link href="https://twitter.com/androidPonsel_" target="_blank"><a><Image src={staticImage + "icon_tw.png"} alt="twitter" width={23 / 1.5} height={18 / 1.5} /></a></Link></li>
                                    <li><Link href="#" target="_blank"><a><Image src={staticImage + "icon_yt.png"} alt="youtube" width={25 / 1.5} height={16 / 1.5} /></a></Link></li>
                                    <li><Link href="https://instagram.com/androidponselcom" target="_blank"><a><Image src={staticImage + "icon_ig.png"} alt="telegram" width={22 / 1.5} height={22 / 1.5} /></a></Link></li>
                                    <li><Link href="#" target="_blank"><a><Image src={staticImage + "icon_in.png"} alt="linkedin" width={21 / 1.5} height={21 / 1.5} /></a></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.btm}>
                &copy; 2020-2021 Android Ponsel Media. All rights reserved. Beta Version V.0.01
            </div>
        </div>
    )
}
