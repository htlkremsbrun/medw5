# Erstellung eines REST-APIs mit Laravel und Sanctum
Laravel Sanctum (https://laravel.com/docs/11.x/sanctum) ist ein leichtgewichtiges Authentifizierungspaket, das in Laravel integriert ist und eine einfache Möglichkeit bietet, Token-basierte Authentifizierung für Single Page Applications (SPAs), mobile Anwendungen und einfache Token-basierte APIs zu implementieren. 

## Laravel-Projekt erstellen
Erstelle ein neues Laravel-Proejkt mit Composer:

>composer create-project --prefer-dist laravel/laravel rest-api-sanctum

## API-Umsetzung
Grundlage bildet dieses Tutorial https://medium.com/@abdelra7manabdullah/api-authentication-using-laravel-sanctum-v10-x-21dfe130cda Die Installation mit Composer kann man sich sparen. Laravel 11 bietet hierzu folgenden Artisan-Befehl bereit:

>php artisan install:api

Danach mit `php artisan migrate` fortfahren. Die Sanctum Konfiguration muss nicht unbedingt erstellt werden.
