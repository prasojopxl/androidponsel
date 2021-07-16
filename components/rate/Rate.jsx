import { Fragment } from "react";
import styles from "./rate.module.scss";
import Image from "next/image";
import { apiUrl } from "../../config/variable";

export default function Rate(props) {

    function Star5() {
        return (
            <Fragment>                
                <Image src={apiUrl+"/uploads/star_full_f8bc483685.png"} alt="star full" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_full_f8bc483685.png"} alt="star full" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_full_f8bc483685.png"} alt="star full" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_full_f8bc483685.png"} alt="star full" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_full_f8bc483685.png"} alt="star full" width="16" height="14"/>
            </Fragment>
        )
    }
    function Star4() {
        return (
            <Fragment>
                <Image src={apiUrl+"/uploads/star_full_f8bc483685.png"} alt="star full" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_full_f8bc483685.png"} alt="star full" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_full_f8bc483685.png"} alt="star full" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_full_f8bc483685.png"} alt="star full" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_blank_b59eeecd7b.png"} alt="star blank" width="16" height="14"/>
            </Fragment>
        )
    }
    function Star3() {
        return (
            <Fragment>
                <Image src={apiUrl+"/uploads/star_full_f8bc483685.png"} alt="star full" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_full_f8bc483685.png"} alt="star full" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_full_f8bc483685.png"} alt="star full" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_blank_b59eeecd7b.png"} alt="star blank" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_blank_b59eeecd7b.png"} alt="star blank" width="16" height="14"/>
            </Fragment>
        )
    }
    function Star2() {
        return (
            <Fragment>
                <Image src={apiUrl+"/uploads/star_full_f8bc483685.png"} alt="star full" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_full_f8bc483685.png"} alt="star full" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_blank_b59eeecd7b.png"} alt="star blank" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_blank_b59eeecd7b.png"} alt="star blank" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_blank_b59eeecd7b.png"} alt="star blank" width="16" height="14"/>
            </Fragment>
        )
    }
    function Star1() {
        return (
            <Fragment>
                <Image src={apiUrl+"/uploads/star_full_f8bc483685.png"} alt="star full" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_blank_b59eeecd7b.png"} alt="star blank" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_blank_b59eeecd7b.png"} alt="star blank" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_blank_b59eeecd7b.png"} alt="star blank" width="16" height="14"/>
                <Image src={apiUrl+"/uploads/star_blank_b59eeecd7b.png"} alt="star blank" width="16" height="14"/>
            </Fragment>
        )
    }

    return (
        <div className={styles.rate}>
            <div className={styles.totalrate}> {props.TotalRate >0 ? props.TotalRate  : 0}</div>
            <div className={styles.wrpvote}>
                <h6>{props.TotalVote}Rating</h6>
                <div className={styles.star}>{props.star}
                    {
                        props.TotalRate >= 5 ? <Star5/> : 
                        props.TotalRate >=4 ? <Star4/> :
                        props.TotalRate >=3 ? <Star3/> :
                        props.TotalRate >=2 ? <Star2/> :
                        props.TotalRate >=1 ? <Star1/> :
                        "no rate"
                    }
                </div>
            </div>
        </div>
    )

    
}
