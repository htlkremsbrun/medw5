# Erstellung eines REST-APIs mit Laravel und Sanctum
Laravel Sanctum (https://laravel.com/docs/11.x/sanctum) ist ein leichtgewichtiges Authentifizierungspaket, das in Laravel integriert ist und eine einfache Möglichkeit bietet, Token-basierte Authentifizierung für Single Page Applications (SPAs), mobile Anwendungen und einfache Token-basierte APIs zu implementieren. 

## Laravel-Projekt erstellen
Erstelle ein neues Laravel-Proejkt mit Composer:

>composer create-project --prefer-dist laravel/laravel rest-api-sanctum

### Zielsetzung
Ziel des Projekts ist es, eine grundlegende Benutzer-Authentifizierung innerhalb einer Laravel-Anwendung zu implementieren. Konkret umfasst das Projekt ausschließlich die Funktionen zur Registrierung, Anmeldung und Abmeldung von Benutzern. 

Im **Registrierungsprozess** wird ein neuer Benutzer angelegt, wobei die Eingabedaten validiert und das Passwort sicher gespeichert werden. 

Beim **Login** überprüft der Controller die Anmeldedaten eines Benutzers, und bei erfolgreicher Authentifizierung wird ein **Zugangstoken** erstellt, das dem Benutzer für zukünftige Anfragen zur Verfügung gestellt wird. 

Schließlich ermöglicht der Logout-Prozess dem Benutzer, sich abzumelden, indem alle zugehörigen Token gelöscht werden.

## API-Umsetzung
Grundlage bildet dieses Tutorial https://medium.com/@abdelra7manabdullah/api-authentication-using-laravel-sanctum-v10-x-21dfe130cda Die Installation mit Composer kann man sich sparen. Laravel 11 bietet hierzu folgenden Artisan-Befehl bereit:

>php artisan install:api

Danach mit `php artisan migrate` fortfahren. Die Sanctum Konfiguration muss nicht unbedingt erstellt werden.

## API-Test
Zum Testen kann entweder *Postman* (Browser-Plugin) oder der *HTTP Client* von Webstorm (siehe Tool > HTTP Client) verwendent werden. Führen Sie die Requests wie folgt durch:

### Benutzer registrieren
Aufruf der Route/des Endpunktes: `http://localhost:8000/api/register`

Request im Detail:
````bash
POST http://localhost:8000/api/register
Content-Type: application/json

{
  "name": "Max Mustermann",
  "email": "m.mustermann@htlkrems.at",
  "password": "123456"
}
````
Als Antwort sollte folgendes im HTTP Client zu sehen sein:
````bash
HTTP/1.1 200 OK
Host: localhost:8000
Connection: close
X-Powered-By: PHP/8.3.10
Cache-Control: no-cache, private
Date: Tue, 18 Feb 2025 13:29:03 GMT
Content-Type: application/json
Access-Control-Allow-Origin: *

{
  "message": "User Created "
}
Response file saved.

Response code: 200 (OK); Time: 667ms (667 ms); Content length: 27 bytes (27 B)
````
Wobei die erhaltene *Message* von der tatsächlichen Implementierung abhängt. Im Beispielsfall sieht die diese wie folgt aus (siehe return response ...):
````php
    public function register(Request $request){
        $registerUserData = $request->validate([
            'name'=>'required|string',
            'email'=>'required|string|email|unique:users',
            'password'=>'required|min:4'
        ]);
        $user = User::create([
            'name' => $registerUserData['name'],
            'email' => $registerUserData['email'],
            'password' => Hash::make($registerUserData['password']),
        ]);
        return response()->json([
            'message' => 'User Created ',
        ]);
    }
````

### Benutzer anmelden
Durch das Anmelden (oder Einloggen) erhalten wir den Auth-Token vom API. Es braucht  
Aufruf der Route/des Endpunktes: `http://localhost:8000/api/login`

Request im Detail:
````bash
POST http://localhost:8000/api/login
Content-Type: application/json

{
  "email": "m.mustermann@htlkrems.at",
  "password": "123456"
}
````
Als Antwort erwarten wir nun den Auth-Token:
````bash
HTTP/1.1 200 OK
Host: localhost:8000
Connection: close
X-Powered-By: PHP/8.3.10
Cache-Control: no-cache, private
Date: Tue, 18 Feb 2025 13:35:56 GMT
Content-Type: application/json
Access-Control-Allow-Origin: *

{
  "access_token": "6|6u0J9qOO9HKehYw5012jG7kc11OUHM66tvgoYNKrb19c4a36"
}
````
Sollten die Anmeldedaten nicht stimmen, erfolgt eine entsprechende Fehlermeldung - entsprechende Implementierung (vom Schüler/von der Schülerin) vorausgesetzt!

### Benutzer abmelden
Im ersten Schritt testen wir die Abmeldung ohne bereitgestellten Auth-Token. In diesem Fall erwarten wir eine Fehlermeldung, da der Zugriff auf diese API ausschließlich mit einem gültigen Auth-Token möglich sein sollte.

Aufruf der Route/des Endpunktes: `http://localhost:8000/api/logout`

Request im Detail (ohne Token):
````bash
POST http://127.0.0.1:8000/api/logout
Accept: application/json
````
Eine Fehlermeldung (401) als Antwort ist in diesem Fall korrekt und erwünscht:
````bash
HTTP/1.1 401 Unauthorized
Host: 127.0.0.1:8000
Connection: close
X-Powered-By: PHP/8.3.10
Cache-Control: no-cache, private
Date: Tue, 18 Feb 2025 13:43:51 GMT
Content-Type: application/json
Access-Control-Allow-Origin: *

{
  "message": "Unauthenticated."
}

Response code: 401 (Unauthorized); Time: 272ms (272 ms); Content length: 30 bytes (30 B)
````
Im zweiten Schritt stellen wir den Auth-Token bereit. Das ist jener Token, den wir bei der Anmeldung (siehe oben) erhalten haben.
````bash
POST http://127.0.0.1:8000/api/logout
Accept: application/json

Authorization: Bearer 6|6u0J9qOO9HKehYw5012jG7kc11OUHM66tvgoYNKrb19c4a36
````
In diesem Fall sollte die Abmeldung funktionieren (siehe *logged out*-Antwort).
````bash
HTTP/1.1 200 OK
Host: 127.0.0.1:8000
Connection: close
X-Powered-By: PHP/8.3.10
Cache-Control: no-cache, private
Date: Tue, 18 Feb 2025 13:51:26 GMT
Content-Type: application/json
Access-Control-Allow-Origin: *

{
  "message": "logged out"
}

Response code: 200 (OK); Time: 248ms (248 ms); Content length: 24 bytes (24 B)
````
## Ablauf des Logouts mit Laravel Sanctum

Laravel Sanctum ermöglicht eine einfache Token-basierte Authentifizierung und bietet eine sichere Methode zum Abmelden (Logout). Hier ist der typische Ablauf für einen Logout-Vorgang beschrieben:

### **Ablauf des Logouts mit Sanctum:**

1. **Client schickt Anfrage:**  
   Der Client sendet einen `POST`-Request an die `logout`-Route und überträgt den `Authorization`-Header mit dem Bearer-Token:  
   `Authorization: Bearer <token>`

2. **Token-Extraktion:**  
   Laravel Sanctum extrahiert den Klartext-Token aus dem Header.

3. **Hash und Suche in der Datenbank:**  
   - Sanctum hasht den extrahierten Token mit derselben Hashing-Methode, die bei der Erstellung des Tokens verwendet wurde.
   - Sanctum sucht in der `personal_access_tokens`-Tabelle nach einem Datensatz mit dem passenden gehashten Token.

4. **Überprüfung:**  
   - Wenn ein gültiger Eintrag gefunden wird und der Token zu einem aktiven Benutzer gehört, ist die Authentifizierung erfolgreich.
   - Der Benutzer wird basierend auf dem Token authentifiziert.

5. **Token-Löschung:**  
   Wird die `logout`-Methode aufgerufen, löscht Sanctum den gefundenen Token (oder alle Tokens des Benutzers) aus der `personal_access_tokens`-Tabelle.

6. **Antwort an den Client:**  
   - Bei erfolgreicher Löschung gibt das API üblicherweise eine Erfolgsmeldung (z. B. `200 OK` mit "Logged out successfully") zurück.  
   - Wenn der Token nicht gefunden wird oder ungültig ist, wird eine Fehlermeldung zurückgegeben (z. B. `401 Unauthorized`).

### **Code-Beispiel für Logout-Methode:**

Hier ist ein Beispiel einer `logout`-Methode in einem Laravel-Controller:

```php
public function logout(Request $request)
{
    // Löscht alle Tokens des authentifizierten Benutzers
    auth()->user()->tokens()->delete();

    return response()->json(["message" => "Logged out successfully"]);
}
```
