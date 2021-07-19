import styles from "./title.module.scss";

export default function Title(props) {
    return (
        <div className={styles.title} id={props.idName}>
            <h4>{props.title}</h4>
        </div>
    )
}
