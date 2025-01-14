# Erstellung eines REST-APIs mit Laravel

In dieser Anleitung wird überblicksartig erklärt, wie ein einfaches REST-API mit Laravel erstellt wird. Ziel der API 
ist es, Bücher in einer Datenbank zu verwalten und die in der React-App *firstcomponent* hardcodierten Daten zu ersetzen.

> **Wichtig**: Dokumentieren Sie alle Arbeitsschritte sorgfältig, um die Reproduzierbarkeit und Nachvollziehbarkeit sicherzustellen.

---

## 1. Laravel-Projekt erstellen

Erstelle ein neues Laravel-Projekt mit Composer:
   ```bash
   composer create-project --prefer-dist laravel/laravel bookgallery-rest-api
````

## 2. Migration erstellen
Erstelle eine Migration für die `books`-Tabelle. Das setzt voraus, dass die Datenbank `booksgallery` existiert und in der .env-Datei 
konfiguriert ist. 

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=booksgallery
DB_USERNAME=root
DB_PASSWORD=
```
Als Grundlage für die zu erstellende `books`-Tabelle dient folgende Datenstruktur aus dem React-Projekt *firstcomponent*

```javascript
const books = [
        {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J.K. Rowling",
            description: "The first book in the Harry Potter series, introducing the magical world of Hogwarts."
        },
        {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            description: "A powerful story of racial injustice and moral growth set in the American South."
        },
        {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            description: "A classic novel depicting the Jazz Age and the American Dream."
        }
    ];
```
## 3. Modell erstellen
Erstelle ein Model `Book.php` für die gleichnamige DB-Tabelle.

## 4. Seeder erstellen
Erstelle einen Seeder `BooksTableSeeder` für die `books`-Tabelle und füge diese Daten ein:

````php
public function run()
{
    DB::table('books')->insert([
        [
            'title' => "Harry Potter and the Philosopher's Stone",
            'author' => "J.K. Rowling",
            'description' => "The first book in the Harry Potter series, introducing the magical world of Hogwarts."
        ],
        [
            'title' => "To Kill a Mockingbird",
            'author' => "Harper Lee",
            'description' => "A powerful story of racial injustice and moral growth set in the American South."
        ],
        [
            'title' => "The Great Gatsby",
            'author' => "F. Scott Fitzgerald",
            'description' => "A classic novel depicting the Jazz Age and the American Dream."
        ],
    ]);
}
````

Führe den Seeder aus:
```bash
php artisan db:seed --class=BooksTableSeeder
````
## 5. Controller erstellen
Erstelle den Resource-Controller `BookController ` für die Bücher. Wichtig ist `--resource`, damit alle CRUD-Methoden erstellt werden.

```bash
php artisan make:controller BookController --resource
````
Implementiere die `index`-Methode:
````php
public function index()
{
    return response()->json(Book::all());
}
````
## 6. API-Routen einrichten
Erstelle und öffne die Datei `routes/api.php` und füge die *index*-Route für die Bücher hinzu. Das nachfolgende Code-Fragment 
deutet an, wie die Route definiert wird:

```php
Route::get('/books', ... );
```
Öffne die Datei `app/Providers/RouteServiceProvider.php` und stelle sicher, dass die *api*-Routen korrekt registriert sind:
```php
protected $namespace = 'App\\Http\\Controllers';

public function boot()
{
    $this->routes(function () {
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path('routes/api.php'));
    });
}
```

## 8. Routen testen
Überprüfe die Routen mit folgendem Befehl:
```bash
php artisan route:list
```
Du solltest die definierte Route (/api/books) in der Ausgabe sehen.
>  Wie der Ausgabe zu entnehmen ist, wurde **api** der Route bzw. URI hinzugefügt. Das ist beim Aufruf zu berücksichtigen!
Zum Testen des API-Endpunkts kann der WebStorm HTTP Client (siehe *Tools -> HTTP Client -> Create Request in HTTP Client*) verwendet werden.

## 9. React FirstComponent anpassen
Passe die React-Komponente *FirstComponent* an, sodass die Daten aus der API geladen und angezeigt werden. Verwende hierzu *Axios* (Details siehe *firstcomponent*). 
