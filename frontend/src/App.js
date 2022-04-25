import React from "react";
import "./App.css";
import BooksStores from "./components/BooksStores";

function App() {
    // App state
    const [loading, setLoading] = React.useState(true);
    const [fetchedData, setFetchedData] = React.useState(null);

    React.useEffect(() => {
        // Get books
        (async () => {
            let response = await fetch("http://localhost:5000/stores/");

            if (response) {
                setLoading(false);
                setFetchedData(await response.json());
            }
        })();
    }, []);

    console.log("Fetched data ", fetchedData);
    return (
        <div className="App">
            {loading && <p>Loading data from server...</p>}
            {fetchedData && <BooksStores payload={fetchedData} />}
        </div>
    );
}

export default App;
