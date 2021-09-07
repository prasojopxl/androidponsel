import styles from "./rateBox.module.scss"
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //https://dev.to/vuongddang/how-to-use-fontawesome-in-next-js-5bl5

export default function RateBox(props) {
    return (
        <div className={styles.rateBox}>
            {props.rate === null ? "no rate" :
                <div>
                    <h4>{props.rate}</h4>
                    <div className={styles.starBox}>
                        <FontAwesomeIcon icon={faStar} style={{ color: props.rate >= 1 ? "#ffc529" : "#d7d7d7" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: props.rate >= 2 ? "#ffc529" : "#d7d7d7" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: props.rate >= 3 ? "#ffc529" : "#d7d7d7" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: props.rate >= 4 ? "#ffc529" : "#d7d7d7" }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: props.rate >= 5 ? "#ffc529" : "#d7d7d7" }} />
                    </div>
                </div>
            }
        </div>
    )
}
