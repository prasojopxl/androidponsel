import styles from "./rateBox.module.scss"
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //https://dev.to/vuongddang/how-to-use-fontawesome-in-next-js-5bl5

export default function RateBox(props) {
    const rate = (props.rate).toFixed(2) / props.voters
    return (
        <div className={styles.rateBox}>
            {props.rate === null ? "no rate" :
                <div>
                    <h4>{rate.toFixed(2)}</h4>
                    <div className={styles.starBox}>
                        <FontAwesomeIcon icon={faStar} style={{ color: rate >= 1 ? "#ffc529" : "#d7d7d7", width: 20 }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: rate >= 2 ? "#ffc529" : "#d7d7d7", width: 20 }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: rate >= 3 ? "#ffc529" : "#d7d7d7", width: 20 }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: rate >= 4 ? "#ffc529" : "#d7d7d7", width: 20 }} />
                        <FontAwesomeIcon icon={faStar} style={{ color: rate >= 5 ? "#ffc529" : "#d7d7d7", width: 20 }} />
                    </div>
                </div>
            }
        </div>
    )
}
