import { useState, useEffect } from "react";


export default function Coba(props) {
    const { data } = useSWR('', fetch, { initialData: props.posts })
    const people = [
        "Siri",
        "Alexa",
        "Google",
        "Facebook",
        "Twitter",
        "Linkedin",
        "Sinkedin"
    ];
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = e => {
        setSearchTerm(e.target.value);
    };
    useEffect(() => {
        const results = people.filter(person =>
            person.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm]);

    return (
        <div>
            page coba
            <div className="App">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <ul>
                    {searchResults.map(item => (
                        <li>{item}</li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export async function getStaticProps() {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await data.json();
    return { props: { posts } }
}