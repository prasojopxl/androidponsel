import React from 'react'
import styles from "./footer.module.scss";

export  function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.contents}>
                <div className={styles.top}>
                    <div className={styles.itemfooter}>
                        <h4>Tentang Kami</h4>
                        <div className={styles.item}>
                            <ul>
                                <li><a href="#">Android Ponsel</a></li>
                                <li><a href="#">Staff</a></li>
                                <li><a href="#">Hubungi Kami</a></li>
                                <li><a href="#">Kerja Sama</a></li>
                                <li><a href="#">Karir</a></li>
                            </ul>
                            <ul>
                                <li><a href="#">Redaksi</a></li>
                                <li><a href="#">Menulis di Android Ponsel</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Sitemap</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.itemfooter}>
                        <h4>Legal</h4>
                        <div className={styles.item}>
                            <ul>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Kode etik</a></li>
                                <li><a href="#">Kode etik</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.itemfooter}>
                        <h4>Social Media</h4>
                        <div className={styles.item}>
                            <ul>
                                <li><a href="#">fb</a></li>
                                <li><a href="#">fb</a></li>
                                <li><a href="#">fb</a></li>
                                <li><a href="#">fb</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.btm}>
                    &copy; 2020-2021 Android Ponsel Media. All rights reserved. Beta Version V.0.01
                </div>
            </div>
        </div>
    )
}
