import Image from "next/image";
import { Fragment } from "react";
import { apiUrl } from "../../config/variable";
import styles from "./rate.module.scss";

export default function Rate(props) {
    const rate = (props.rate) / props.voters

    function Star5() {
        return (
            <Fragment>
                <Image
                    src={apiUrl + "/uploads/star_full_f8bc483685.png"}
                    alt="star full"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_full_f8bc483685.png"}
                    alt="star full"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_full_f8bc483685.png"}
                    alt="star full"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_full_f8bc483685.png"}
                    alt="star full"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_full_f8bc483685.png"}
                    alt="star full"
                    width="16"
                    height="14"
                />
            </Fragment>
        );
    }
    function Star4() {
        return (
            <Fragment>
                <Image
                    src={apiUrl + "/uploads/star_full_f8bc483685.png"}
                    alt="star full"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_full_f8bc483685.png"}
                    alt="star full"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_full_f8bc483685.png"}
                    alt="star full"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_full_f8bc483685.png"}
                    alt="star full"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_blank_b59eeecd7b.png"}
                    alt="star blank"
                    width="16"
                    height="14"
                />
            </Fragment>
        );
    }
    function Star3() {
        return (
            <Fragment>
                <Image
                    src={apiUrl + "/uploads/star_full_f8bc483685.png"}
                    alt="star full"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_full_f8bc483685.png"}
                    alt="star full"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_full_f8bc483685.png"}
                    alt="star full"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_blank_b59eeecd7b.png"}
                    alt="star blank"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_blank_b59eeecd7b.png"}
                    alt="star blank"
                    width="16"
                    height="14"
                />
            </Fragment>
        );
    }
    function Star2() {
        return (
            <Fragment>
                <Image
                    src={apiUrl + "/uploads/star_full_f8bc483685.png"}
                    alt="star full"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_full_f8bc483685.png"}
                    alt="star full"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_blank_b59eeecd7b.png"}
                    alt="star blank"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_blank_b59eeecd7b.png"}
                    alt="star blank"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_blank_b59eeecd7b.png"}
                    alt="star blank"
                    width="16"
                    height="14"
                />
            </Fragment>
        );
    }
    function Star1() {
        return (
            <Fragment>
                <Image
                    src={apiUrl + "/uploads/star_full_f8bc483685.png"}
                    alt="star full"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_blank_b59eeecd7b.png"}
                    alt="star blank"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_blank_b59eeecd7b.png"}
                    alt="star blank"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_blank_b59eeecd7b.png"}
                    alt="star blank"
                    width="16"
                    height="14"
                />
                <Image
                    src={apiUrl + "/uploads/star_blank_b59eeecd7b.png"}
                    alt="star blank"
                    width="16"
                    height="14"
                />
            </Fragment>
        );
    }

    return (
        <div className={styles.rate}>
            <div className={styles.totalrate}>
                {props.rate >= 1 ? rate.toFixed(2) : 0}
            </div>
            <div className={styles.wrpvote}>
                <h6>Rating</h6>
                <div className={styles.star}>
                    {props.star}
                    {rate >= 5 ? (
                        <Star5 />
                    ) : rate >= 4 ? (
                        <Star4 />
                    ) : rate >= 3 ? (
                        <Star3 />
                    ) : rate >= 2 ? (
                        <Star2 />
                    ) : rate >= 1 ? (
                        <Star1 />
                    ) : (
                        "no rate"
                    )}
                </div>
            </div>
        </div>
    );
}
