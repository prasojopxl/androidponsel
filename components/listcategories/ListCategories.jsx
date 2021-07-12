import styles from "./listcategories.module.scss"

export function ListCategories() {
    return (
        <div className={styles.ListCategories}>
            <div className={styles.contents}>
                <label>TOPIK: </label>
                <ul>
                    <li><a href="#">Handphone</a></li>
                    <li><a href="#">Handphone</a></li>
                    <li><a href="#">Handphone</a></li>
                </ul>
            </div>
        </div>
    )
}
