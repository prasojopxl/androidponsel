import styles from "./title.module.scss";

export default function Title(props) {
    return (
        <div className={styles.title}>
            <h2 id={props.idName}>{props.title}</h2>
        </div>
    )
}
