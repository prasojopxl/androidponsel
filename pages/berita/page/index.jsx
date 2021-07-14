import LayoutBerita from "../../../layout/layoutberita/LayoutBerita"


export default function Page({props, dataPosts}) {
    return (
        <LayoutBerita>
            {
                dataPosts.map((item,i) => {
                    return (
                        <React.Fragment>
                            <div>{item.title}</div>
                        </React.Fragment>
                    )
                })
            }
        </LayoutBerita>
    )
}

export async function getStaticProps() {
    const res = await fetch (`http://localhost:1337/posts?menu=2&_limit=9&_start=0`)
    const dataPosts = await res.json();

    return {
        props: {
            dataPosts,
        }
    }
}
