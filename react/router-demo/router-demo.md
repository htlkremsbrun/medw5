# React - Router Demo
*React Router* ist eine Bibliothek für React, um zwischen verschiedenen Ansichten in einer Single-Page-Anwendung zu navigieren ohne die Seite neu laden zu müssen.

Installation der Bibiothek:
````shell
npm install react-router-dom
````

Die Umsetzung bzw. die Definition einer *Route* (vergleiche Link mit \<a\>-Tag) gestaltet sich folgendermaßen:

````javascript
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Projects = () => <h2>Projects</h2>;

const App = () => {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
````

Der Router-spezifische Code in einer React-Anwendung ermöglicht die Navigation und das Routing zwischen verschiedenen Ansichten innerhalb der Anwendung. Durch die Verwendung des React Routers können wir Links erstellen, die zu verschiedenen Routen führen, und definieren, welche Komponenten gerendert werden sollen, wenn eine bestimmte Route übereinstimmt. Selbstverständlich können die zu rendernden Komponenten  weitere Child-Komponenten enhalten. In diesem Fall macht es Sinn, die Komponenten in separate Dateien zu migrieren. 