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
                                <li><Link href="#"><a>Android Ponsel</a></Link></li>
                                <li><Link href="#"><a>Staff</a></Link></li>
                                <li><Link href="#"><a>Hubungi Kami</a></Link></li>
                                <li><Link href="#"><a>Kerja Sama</a></Link></li>
                                <li><Link href="#"><a>Karir</a></Link></li>
                            </ul>
                            <ul>
                                <li><Link href="#"><a>Redaksi</a></Link></li>
                                <li><Link href="#"><a>Menulis di Android Ponsel</a></Link></li>
                                <li><Link href="#"><a>FAQ</a></Link></li>
                                <li><Link href="#"><a>Sitemap</a></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.itemfooter}>
                        <h4>Legal</h4>
                        <div className={styles.item}>
                            <ul>
                                <li><Link href="#"><a>Privacy Policy</a></Link></li>
                                <li><Link href="#"><a>Term of Service</a></Link></li>
                                <li><Link href="#"><a>Kode Etik</a></Link></li>
                                <li><Link href="#"><a>Pedoman Media Siber</a></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.itemfooter}>
                        <h4>Social Media</h4>
                        <div className={styles.item}>
                            <ul className={styles.socmed}>
                                <li><Link href="#" target="_blank"><a><Image src="/icon_fb.png" alt="facebook" width={12 / 1.5} height={25 / 1.5} /></a></Link></li>
                                <li><Link href="#" target="_blank"><a><Image src="/icon_tw.png" alt="twitter" width={23 / 1.5} height={18 / 1.5} /></a></Link></li>
                                <li><Link href="#" target="_blank"><a><Image src="/icon_yt.png" alt="youtube" width={25 / 1.5} height={16 / 1.5} /></a></Link></li>
                                <li><Link href="#" target="_blank"><a><Image src="/icon_ig.png" alt="telegram" width={22 / 1.5} height={22 / 1.5} /></a></Link></li>
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
