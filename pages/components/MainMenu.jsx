import React from 'react'
import { fetchData } from '../../config/data'

export default function MainMenu(props) {
    console.log(props.dataku)
    return (
        <div>
            {
                props.data.map((item, i) => {
                    return (
                        <div key={item.id}>{item.title}</div>
                    )
                })


            }
        </div>
    )
}

export async function getStaticProps(context) {
    const data = await fetchData("/menus");
    const dataku = await fetchData("/posts");

    return {
        props: {
            data,
            dataku
        }
    }
}