# React - First Components
Bei React dreht sich alles um sog. Komponenten. 

**>>Task 1**: Nehmen Sie dieses Tutorial https://react.dev/learn/your-first-component zum Thema *Components* durch. Durch Klicken auf den Fork-Link (zu finden oben rechts in jedem Codebeispiel) gelangen Sie zur CodeSandbox, wo das gesamte Projekt eingesehen und experimentell bearbeitet werden kann.

**>>Task 2 - Book Gallery** 
Ziel ist die Entwicklung einer Applikation, die die Lieblingsbücher ausgibt. Nachfolgender Screenshot zeigt die gewünschte Ausgabe.   

<img src="./imgs/screenshot-bookgallery.png" alt="bookgallery" style="box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">


Erstellen Sie das React-Projekt *bookgallery* (als Teil der UE04). Implementieren Sie sämtlichen Code in der *App.js* - also keine weiteren Dateien erstellen!

Verwenden Sie nachfolgendes Code-Grundgerüst als Ausgansbasis für die Umsetzung.

````jsx
// Die Book-Komponente wird wiederverwendet, um jedes Buch darzustellen
function Book({ title, author, description }) {
  return (
  // Your code...
  );
}

// Die Gallery-Komponente zeigt eine Liste von Lieblingsbüchern an
export default function Gallery() {
  return (
  // Your code...
  );
````

Passen Sie den Import in der *index.js* an.

Abschließend noch die Bücher bzw. die Datengrundlage:

````text
Harry Potter and the Philosopher's Stone

Author: J.K. Rowling
Description: The first book in the Harry Potter series, introducing the magical world of Hogwarts.


To Kill a Mockingbird

Author: Harper Lee
Description: A powerful story of racial injustice and moral growth set in the American South.


The Great Gatsby

Author: F. Scott Fitzgerald
Description: A classic novel depicting the Jazz Age and the American Dream.
````
