import "./App.css";
import { useQuery, gql } from "@apollo/client";
import AddBook from "./components/AddBook";

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <h1>Book List Items</h1>

      <ul>
        {data.books.map((book) => {
          return <li key={book.id}>{book.name}</li>;
        })}
      </ul>

      <AddBook />
    </>
  );
}

export default App;
