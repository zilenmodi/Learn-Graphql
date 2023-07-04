import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_BOOKS } from "../App";

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`;

const ADD_BOOK = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
    }
  }
`;

function AddBook() {
  const {
    loading: authorsLoading,
    error: authorsError,
    data: authorsData,
  } = useQuery(GET_AUTHORS);
  const [
    addBook,
    { data: booksData, loading: booksLoading, error: booksError },
  ] = useMutation(ADD_BOOK);

  const [bookName, setBookName] = useState("");
  const [genreName, setGenreName] = useState("");
  const [authorName, setAuthorName] = useState("");

  const handleBookNameChange = (event) => {
    setBookName(event.target.value);
  };

  const handleGenreNameChange = (event) => {
    setGenreName(event.target.value);
  };

  const handleAuthorNameChange = (event) => {
    setAuthorName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the form data or perform any desired action
    addBook({
      variables: { name: bookName, genre: genreName, authorId: authorName },
      refetchQueries: [{ query: GET_BOOKS }],
    });
    // Reset the form fields
    setBookName("");
    setGenreName("");
    setAuthorName("");
  };

  if (authorsLoading) return <p>Loading...</p>;
  if (authorsError) return <p>Error : {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="bookName">Book Name:</label>
        <input
          type="text"
          id="bookName"
          name="bookName"
          value={bookName}
          onChange={handleBookNameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="genreName">Genre Name:</label>
        <input
          type="text"
          id="genreName"
          name="genreName"
          value={genreName}
          onChange={handleGenreNameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="authorName">Author Name:</label>
        <select
          id="authorName"
          name="authorName"
          value={authorName}
          onChange={handleAuthorNameChange}
          required
        >
          <option>Select Option</option>
          {authorsData.authors.map((author) => {
            return (
              <option value={author.id} key={author.id}>
                {author.name}
              </option>
            );
          })}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddBook;
