import styles from "./footer.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.contents}>
                <div className={styles.top}>
                    <div className={styles.itemfooter}>
                        <h4>Tentang Kami</h4>
                        <div className={styles.item}>
                            <ul>
                                <li><Link href="/tentang-kami"><a>Android Ponsel</a></Link></li>
                                <li><Link href="/team"><a>Staff</a></Link></li>
                                <li><Link href="/hubungu-kami"><a>Hubungi Kami</a></Link></li>
                                <li><Link href="/kerjasama"><a>Kerja Sama</a></Link></li>
                                <li><Link href="/karir"><a>Karir</a></Link></li>
                            </ul>
                            <ul>
                                <li><Link href="/redaksi"><a>Redaksi</a></Link></li>
                                <li><Link href="/menulis"><a>Menulis di Android Ponsel</a></Link></li>
                                <li><Link href="/faq"><a>FAQ</a></Link></li>
                                <li><Link href="/sitemap"><a>Sitemap</a></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.itemfooter}>
                        <h4>Legal</h4>
                        <div className={styles.item}>
                            <ul>
                                <li><Link href="/tnc"><a>Privacy Policy</a></Link></li>
                                <li><Link href="/service"><a>Term of Service</a></Link></li>
                                <li><Link href="/kode-etik"><a>Kode Etik</a></Link></li>
                                <li><Link href="/pedoman"><a>Pedoman Media Siber</a></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.itemfooter}>
                        <h4>Social Media</h4>
                        <div className={styles.item}>
                            <ul className={styles.socmed}>
                                <li><Link href="#" target="_blank"><a><Image src="/icon_fb.png" alt="facebook" width={12 / 1.5} height={25 / 1.5} /></a></Link></li>
                                <li><Link href="https://twitter.com/androidPonsel_" target="_blank"><a><Image src="/icon_tw.png" alt="twitter" width={23 / 1.5} height={18 / 1.5} /></a></Link></li>
                                <li><Link href="#" target="_blank"><a><Image src="/icon_yt.png" alt="youtube" width={25 / 1.5} height={16 / 1.5} /></a></Link></li>
                                <li><Link href="https://instagram.com/androidponselcom" target="_blank"><a><Image src="/icon_ig.png" alt="telegram" width={22 / 1.5} height={22 / 1.5} /></a></Link></li>
                                <li><Link href="#" target="_blank"><a><Image src="/icon_in.png" alt="linkedin" width={21 / 1.5} height={21 / 1.5} /></a></Link></li>
                            </ul>
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
