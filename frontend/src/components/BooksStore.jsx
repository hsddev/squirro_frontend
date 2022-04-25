// Dependencies
import React from "react";
import _ from "underscore";

const BookStore = ({ store, included }) => {
    let country = store.relationships.countries.data;
    const books = [];
    // Get books
    if (store.relationships.books) {
        _.forEach(store.relationships.books.data, (bookInfo) => {
            const book = _.find(included, (includedItem) => {
                return (
                    includedItem.type === bookInfo.type &&
                    includedItem.id === bookInfo.id
                );
            });
            const author = _.find(included, (includedItem) => {
                return (
                    includedItem.type === book.relationships.author.data.type &&
                    includedItem.id === book.relationships.author.data.id
                );
            });
            books.push({
                name: book.attributes.name,
                copies: book.attributes.copiesSold,
                author: author.attributes.fullName,
            });
        });
    }

    // Sort books
    books.sort((a, b) => {
        if (a.copies > b.copies) return -1;
        if (a.copies < b.copies) return 1;
        return 0;
    });

    // Splice books
    books.splice(2);

    // Get country code
    country = _.find(included, (includedItem) => {
        return (
            includedItem.type === country.type && includedItem.id === country.id
        );
    }).attributes.code;

    return (
        <div className="App-book-store">
            <div className="store-img">
                <img
                    src={store.attributes.storeImage}
                    alt={store.attributes.name}
                />
            </div>
            <div className="store-content">
                <div className="store-name-rating">
                    <h2>Name: {store.attributes.name}</h2>
                    <p>Rating: {store.attributes.rating}</p>
                </div>
                <div className="store-best-selling">
                    <table>
                        <thead>
                            <tr>
                                <th colspan="2">Best-selling books</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.length > 0 &&
                                _.map(books, (book) => {
                                    return (
                                        <tr key={book.name}>
                                            <th>{book.name}</th>
                                            <th>{book.author}</th>
                                        </tr>
                                    );
                                })}
                            {books.length === 0 && (
                                <tr>
                                    <th>No available data</th>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="store-date-flag">
                <div className="store-data">
                    {store.attributes.establishmentDate
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join(".")}{" "}
                    - {store.attributes.website.split("//")[1]}
                </div>
                <div className="store-flag">{country}</div>
            </div>
        </div>
    );
};

export default BookStore;
