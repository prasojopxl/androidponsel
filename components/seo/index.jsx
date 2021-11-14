import { Fragment } from "react";
import { apiUrl } from "../../config/variable";

export default function SEO(props) {
    return (
        <Fragment>
            <title>{props.title} </title>
            <meta name="description" content={props.description} />
            <meta name="keywords" content={props.keywords} />
            <meta name="author" content="androidponsel" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <link
                rel="shortcut icon"
                href={apiUrl + "/uploads/fav_425b2ec632.png"}
            />
            <meta property="og:locale" content="id_ID" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={props.title} />
            <meta property="og:image" content={props.image} />
            <meta property="og:description" content={props.description} />
            <meta property="og:url" content="https://www.androidponsel.com/" />
            {/* <meta property="og:image" content={props.ogimage} /> */}
        </Fragment>
    )
}
