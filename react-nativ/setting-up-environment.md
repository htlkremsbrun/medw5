# React Native - einrichten der Arbeitsumgebung
Die folgenden Ausführungen basieren auf der Quelle https://reactnative.dev/docs/environment-setup?guide=quickstart. Bei eventuellen Unklarheiten wird empfohlen, einen Blick in diese zu werfen (siehe Tab "Expo Go Quickstart"). 

Der einfachste Weg, um mit *React Native* zu arbeiten, ist *Expo Go* (https://expo.dev/). Expo Go (kurz Expo) stellt Wekzeugen für die Entwicklung, das Testen sowie für das Deployment von mobilen Anwendungen auf dem Endgerät bereit.

> Wenn es einmal besonders schnell gehen muss, empfiehlt sich die Expo Online IDE **Snack**. Diese ist unter https://snack.expo.dev/ erreichbar.

## React Expo App erstellen und starten

Um React Native Anwendung mit Expo auf dem Engerät zu testen, sind einige Schritte zu tätigen. Erstellen Sie einen neuen Übungsordner (mit aktueller ID) und wechseln sie in diesen. Führen Sie folgenden Befehl aus, der ein neues Expo-Projekt mit dem Namen *reactnative-helloworld* erstellet: 

````shell
npx create-expo-app reactnative-helloworld
````

Wechseln Sie in den Projekt-Ordner und starten Sie das Projekt:
````shell
cd reactnative-helloworld
npx expo start
````
Im Terminal-Fenster sollte nun ein QR-Code zu sehen sein. Dieser wird später benötigt, um die *helloworld*-App auf dem Smartphone auszuführen. 


## React Expo App auf Smartphone ausführen

Erstellen Sie mit ihrer Schulmailadresse einen kostenlosen Account auf https://expo.dev/.

Installieren Sie die Expo-App auf ihrem Android- oder iOS-Smartphone (https://expo.dev/client), melden Sie sich an und verbinden Sie sich mit **demselben** WLAN wie ihr Entwicklungsrechner. 

Unter Android verwenden Sie die Expo Go-App, um den QR-Code von Ihrem Terminal zu scannen und Ihr Projekt zu öffnen, während Sie unter iOS den integrierten QR-Code-Scanner der Standard-iOS-Kamera-App verwenden.


