import logo from './logo.svg';
import './App.css';

// Die Book-Komponente wird wiederverwendet, um jedes Buch darzustellen
function Book({ title, author, description }) {
  return (
      <div className="book">
        <h2>{title}</h2>
        <p>Author: {author}</p>
        <p>Description: {description}</p>
      </div>
  );
}

// Die Gallery-Komponente zeigt eine Liste von Lieblingsbüchern an
export default function Gallery() {
  return (
      <section>
        <h1>Favorite Books</h1>
        <Book
            title="Harry Potter and the Philosopher's Stone"
            author="J.K. Rowling"
            description="The first book in the Harry Potter series, introducing the magical world of Hogwarts."
        />
        <Book
            title="To Kill a Mockingbird"
            author="Harper Lee"
            description="A powerful story of racial injustice and moral growth set in the American South."
        />
        <Book
            title="The Great Gatsby"
            author="F. Scott Fitzgerald"
            description="A classic novel depicting the Jazz Age and the American Dream."
        />
      </section>
  );
}