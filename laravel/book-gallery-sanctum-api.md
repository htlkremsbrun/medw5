# Erstellung eines REST-APIs mit Laravel und Sanctum
Laravel Sanctum (https://laravel.com/docs/11.x/sanctum) ist ein leichtgewichtiges Authentifizierungspaket, das in Laravel integriert ist und eine einfache Möglichkeit bietet, Token-basierte Authentifizierung für Single Page Applications (SPAs), mobile Anwendungen und einfache Token-basierte APIs zu implementieren. 

## Laravel-Projekt erstellen
Erstelle ein neues Laravel-Proejkt mit Composer:

>composer create-project --prefer-dist laravel/laravel rest-api-sanctum

**Hinweis**: Ziel des Projekts ist es, eine grundlegende Benutzer-Authentifizierung innerhalb einer Laravel-Anwendung zu implementieren. Konkret umfasst das Projekt ausschließlich die Funktionen zur Registrierung, Anmeldung und Abmeldung von Benutzern. 

Im **Registrierungsprozess** wird ein neuer Benutzer angelegt, wobei die Eingabedaten validiert und das Passwort sicher gespeichert werden. 

Beim **Login** überprüft der Controller die Anmeldedaten eines Benutzers, und bei erfolgreicher Authentifizierung wird ein **Zugangstoken** erstellt, das dem Benutzer für zukünftige Anfragen zur Verfügung gestellt wird. 

Schließlich ermöglicht der Logout-Prozess dem Benutzer, sich abzumelden, indem alle zugehörigen Token gelöscht werden.

## API-Umsetzung
Grundlage bildet dieses Tutorial https://medium.com/@abdelra7manabdullah/api-authentication-using-laravel-sanctum-v10-x-21dfe130cda Die Installation mit Composer kann man sich sparen. Laravel 11 bietet hierzu folgenden Artisan-Befehl bereit:

>php artisan install:api

Danach mit `php artisan migrate` fortfahren. Die Sanctum Konfiguration muss nicht unbedingt erstellt werden.
