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
> 2025-02-18T142903.200.json

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
