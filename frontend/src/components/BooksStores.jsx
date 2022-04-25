// Dependencies
import React from "react";
import _ from "underscore";
import BookStore from "./BooksStore";

const BooksStores = ({ payload: { data, included } }) => {
    if (!Array.isArray(data)) return <p>Fetched data invalid</p>;
    return (
        <div className="App-books-stores">
            <p>Books stores: {data.length}</p>
            {_.map(data, (store) => {
                return (
                    <BookStore
                        key={store.id}
                        store={store}
                        included={included}
                    />
                );
            })}
        </div>
    );
};

export default BooksStores;
