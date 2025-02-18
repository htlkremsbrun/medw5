# Erweiterung des Book Gallery REST-APIs um Token-basierter Authentifizierung

Voraussetzung ist, dass das Book Gallery API (siehe *<a href="https://github.com/htlkremsbrun/medw5/blob/main/laravel/book-gallery-api.md">Erstellung eines REST-APIs mit Laravel</a>*) bereits existiert und die Implementierung der Token-basierten Authentifizierung mit Sanctum verstanden wurde. Zudem sollte die React-App Book Gallery ebenfalls funktionsfähig sein und der API-Zugriff mit *Axis* (wie hier dokumentiert *[Erstellung eines REST-APIs mit Laravel](https://github.com/htlkremsbrun/medw5/blob/main/react/firstcomponent/firstcomponent.md#api-zugriff-mit-axios)*) funktionieren. Nachfolgend sind die erforderlichen Schritte übersichtlich dokumentiert.

## Serverseitige Erweiterung
Da haben wir im Prinzip bereits alles gemacht: 
### 1. Sanctum im Projekt installieren und konfigurieren

### 2. Routes in routes/api.php definieren
Die für *Register* und *Login* sowie für *CRDU* erforderlichen Routes definieren. Wichtig ist, dass die CRDU-Operationen nur für angemeldete Benutzer zugänglich sind, siehe Beispiel für die Read-Funktion (aller Bücher):

````PHP
Route::resource('books', BookController::class)->middleware('auth:sanctum');
````
Genau genommen würde es für die Demonstration der Funktionsweise die *Register*- und *Login*-Routes nicht benötigen. Man könnte einen Token mit dem Sanctum-Demoprojekt erstellen und verwenden. Hierfür ist dann noch der Token bzw. dessen Hash-Wert der DB-Tabelle `users` zu kopieren. Das würde den Entwicklungsprozess ein wenig abkürzen.

### 3.CRUD-Funktionen implementieren
Das sollte bereits erledigt sein (siehe *<a href="https://github.com/htlkremsbrun/medw5/blob/main/laravel/book-gallery-api.md">Erstellung eines REST-APIs mit Laravel</a>*).

## Cientseitige Erweiterung
Auch hier lässt sich der Aufwand reduzieren, indem man die Bücher initial via API ladet. Das setzt aber voraus, dass ein Token existiert, den man kopieren und verwenden kann (siehe Punkt 2). 
````javascript
  const authToken = "5|YYxRoVm4x8JptNn3FzNtDad978JyvTtXChwPZLMnefecb1e4"; // Ersetze dies mit deinem 'echten' Token

  // Bücher beim Laden der Komponente abrufen
  useEffect(() => {
    fetch("http://localhost:8000/api/books", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Bücher");
        }
        return response.json();
      })
      .then(data => setBooks(data))
      .catch(err => console.error("Fehler:", err));
  }, []);
````
Bei erfolgreicher Authentifizierung beim API-Zugriff retourniert das API die Bücher. Wenn nicht, erfolgt die Ausgabe der Fehlermeldung.
