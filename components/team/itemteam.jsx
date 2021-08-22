import Image from "next/image";
import styles from "./team.module.scss";

export default function ItemTeam(props) {
    return (
        <div className={styles.teamMember}>
            <div className={styles.left}>
                <Image src="/man.jpg" alt={props.name} layout="fill" />
            </div>
            <div className={styles.right}>
                <h4>{props.name}</h4>
                <h6>{props.title}</h6>
            </div>
        </div>
    )
}
