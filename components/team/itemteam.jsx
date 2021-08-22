import Image from "next/image";
import styles from "./team.module.scss"

export default function ItemTeam() {
    return (
        <div className="teamMember">
            <div className={styles.left}>
                <Image src="/man.jpg" alt="people" layout="fill" />
            </div>
            <div className={styles.right}>
                <h4>M Babeh</h4>
                <h6>Chief Executive Officer</h6>
            </div>
        </div>
    )
}
