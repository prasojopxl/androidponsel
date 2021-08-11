import Head from "next/head";
import { apiUrl } from "../../config/variable";

export default function TemplateDefault(props) {
    return (
        <div>
            <Head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>{props.title}</title>
                <meta name="description" content="Description page here" />
                <meta name="keywords" content="Frontend, Website, HTML, CSS" />
                <meta name="author" content="Developer" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
                <link
                    rel="shortcut icon"
                    href={apiUrl + "/uploads/fav_425b2ec632.png"}
                />
            </Head>

            <div>
                Header di sini
            </div>

            <div>
                {props.children}
            </div>
            <div>
                footer
            </div>
        </div>
    )
}
