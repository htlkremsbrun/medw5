# Erstellung eines Child Themes in WordPress

## Ziel
Erstellen Sie ein **Child Theme** basierend auf einem freien Theme aus dem WordPress-Theme-Verzeichnis. Sie sollen das Design und die Funktionalität des Themes durch spezifische Anpassungen erweitern und anpassen.

## Abgabe
Laden Sie das fertige Child Theme (als ZIP-Datei) auf Microsoft Teams (5 BHITM MEDW Gruppe) in der entsprechenden Aufgabe hoch. Geben Sie einer **readme.md** an, auf welchem Theme das Child Theme basiert.

---

## Anforderungen an das Child Theme

### 1. Installation und Aktivierung des Parent Themes

- **Wählen Sie ein freies Theme** aus dem offiziellen WordPress-Theme-Verzeichnis. Dieses Theme wird als Parent Theme dienen. Empfohlene Themes könnten z.B. „Twenty Twenty-One“ oder „Astra“ sein.
- **Schritte:**
   - Navigieren Sie im WordPress-Backend zu **Design > Themes > Hinzufügen**.
   - Suchen Sie nach einem freien Theme, installieren und aktivieren Sie es.
   - Stellen Sie sicher, dass das Parent Theme korrekt läuft und dass die Standard-Startseite geladen wird.

### 2. Erstellung und Konfiguration des Child Themes

- **Erstellen Sie ein Child Theme**, das auf dem gewählten Parent Theme basiert. Dies geschieht durch das Anlegen eines neuen Ordners und das Hinzufügen von zwei essentiellen Dateien: `style.css` und `functions.php`.
  
- **Schritte:**
   - Erstellen Sie im `wp-content/themes/` Verzeichnis einen neuen Ordner mit dem Namen Ihres Child Themes, z.B. `mytheme-child`.
   - Erstellen Sie in diesem Ordner eine Datei namens `style.css` mit folgendem Inhalt:
     ```css
     /*
     Theme Name: MyTheme Child
     Template: mytheme (Verzeichnisname des Parent Themes)
     */
     ```

   - Erstellen Sie eine Datei namens `functions.php` im Child Theme Ordner mit folgendem Code, um die Styles des Parent Themes zu laden:
     ```php
     <?php
     function mytheme_enqueue_styles() {
         wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
     }
     add_action( 'wp_enqueue_scripts', 'mytheme_enqueue_styles' );
     ```
   - Aktivieren Sie das Child Theme im WordPress-Backend unter **Design > Themes**.

### 3. Designanpassungen im Child Theme

- **Nehmen Sie mindestens zwei individuelle CSS-Anpassungen** im Child Theme vor, um das Erscheinungsbild des Themes zu verändern. Diese Änderungen sollten die Gestaltung Ihres Projekts unterstützen und ein klar sichtbares Ergebnis auf der Website zeigen.

- **Schritte:**
   - Fügen Sie in der `style.css` des Child Themes zwei Designänderungen hinzu, z.B.:
     - **Änderung der Schriftgröße oder Farbe** der Hauptüberschriften (`h1`, `h2`, etc.).
     - **Änderung der Hintergrundfarbe** oder des Layouts bestimmter Elemente (z.B. des Headers, der Navigation oder des Footers).
   - Beispiel:
     ```css
     /* Schriftfarbe der Überschriften ändern */
     h1, h2 {
         color: #ff6600;
     }

     /* Hintergrundfarbe des Headers anpassen */
     .site-header {
         background-color: #f5f5f5;
     }
     ```

### 4. Anpassung der Startseite (45 Minuten)

- **Passen Sie die Startseite an**, indem Sie eine **eigene Template-Datei für die Startseite** im Child Theme erstellen und Änderungen an der Layout-Struktur vornehmen. Zusätzlich sollten Sie einen neuen **Widget-Bereich** (z.B. in der Sidebar oder im Footer) integrieren, der über das WordPress-Backend befüllt werden kann.

- **Schritte:**
   - Erstellen Sie im Child Theme eine Datei namens `front-page.php`. Diese Datei wird als Vorlage für die Startseite verwendet.
   - Fügen Sie eigenen HTML- oder PHP-Code hinzu, um den Inhalt der Startseite individuell zu gestalten, z.B.:
     ```php
     <?php get_header(); ?>

     <div class="custom-homepage">
         <h1>Herzlich Willkommen auf unserer Seite!</h1>
         <p>Hier können Sie maßgeschneiderte Inhalte einfügen.</p>
     </div>

     <?php get_footer(); ?>
     ```

   - Um einen neuen **Widget-Bereich** hinzuzufügen, fügen Sie folgenden Code in die `functions.php` ein:
     ```php
     function custom_homepage_widget_area() {
         register_sidebar(array(
             'name'          => 'Startseite Widget Area',
             'id'            => 'home-widget-area',
             'before_widget' => '<div class="widget-area">',
             'after_widget'  => '</div>',
             'before_title'  => '<h2>',
             'after_title'   => '</h2>',
         ));
     }
     add_action('widgets_init', 'custom_homepage_widget_area');
     ```

   - In der `front-page.php` verwenden Sie den Widget-Bereich:
     ```php
     if ( is_active_sidebar( 'home-widget-area' ) ) {
         dynamic_sidebar( 'home-widget-area' );
     }
     ```

### 5. Erstellen einer individuellen Template-Datei (40 Minuten)

- **Erstellen Sie eine zusätzliche Template-Datei** für eine bestimmte Seite, z.B. eine Landing Page oder einen speziellen Seitentyp, der eine abweichende Struktur hat. Diese Template-Datei sollte von WordPress nutzbar sein, um eine individuelle Seite zu gestalten.

- **Schritte:**
   - Erstellen Sie im Child Theme eine neue Datei, z.B. `template-custom.php`.
   - Fügen Sie am Anfang der Datei folgenden Kommentar hinzu, um die Datei als Template zu definieren:
     ```php
     <?php
     /*
     Template Name: Custom Page
     */
     ?>
     ```
   - Fügen Sie HTML- und PHP-Code hinzu, um das Layout der Seite zu gestalten:
     ```php
     <?php get_header(); ?>

     <div class="custom-page-layout">
         <h1>Unsere individuelle Seite</h1>
         <p>Hier können Sie spezifische Inhalte und Strukturen für diese Seite einfügen.</p>
     </div>

     <?php get_footer(); ?>
     ```

   - Wählen Sie im WordPress-Backend unter **Seiten > Erstellen** bei der Erstellung einer neuen Seite dieses Template aus.

### 6. Test und Feinschliff (30 Minuten)

- **Testen Sie das Child Theme** gründlich, um sicherzustellen, dass alle Anpassungen korrekt funktionieren. Überprüfen Sie das Design, die Funktionalität und ob die Startseite und die individuell erstellten Seiten wie erwartet angezeigt werden.

- **Schritte:**
   - Rufen Sie Ihre WordPress-Seite auf und überprüfen Sie, ob die Startseite und die neuen Designänderungen sichtbar sind.
   - Testen Sie den neuen Widget-Bereich, indem Sie über **Design > Widgets** ein Widget hinzufügen und sicherstellen, dass es korrekt auf der Startseite erscheint.
   - Prüfen Sie, ob die Template-Datei für die spezielle Seite korrekt ausgewählt und angezeigt wird.

### 7. Dokumentation (20 Minuten)

- **Erstellen Sie eine kurze Dokumentation** (max. 1 Seite im PDF-Format), die folgende Punkte erklärt:
   - Welches Parent Theme wurde verwendet?
   - Welche Anpassungen wurden im Child Theme vorgenommen (Design, Funktionalität)?
   - Welche Schwierigkeiten oder Herausforderungen sind aufgetreten und wie wurden sie gelöst?

---

## Abgabe:
- **Child Theme als ZIP-Datei**: Laden Sie das Child Theme (den gesamten Ordner) als ZIP-Datei hoch.
- **Dokumentation als PDF**: Laden Sie eine PDF-Datei mit der Dokumentation auf Microsoft Teams hoch.
- Nennen Sie alle Gruppenmitglieder in der Dokumentation.

---

## Bewertungskriterien:
- Korrekte Erstellung und Einbindung des Child Themes
- Umsetzung der Design- und Funktionsanpassungen (z.B. Widget-Bereiche, CSS-Änderungen)
- Saubere und lesbare Codierung (CSS/HTML/PHP)
- Funktionalität des Child Themes im WordPress-System (fehlerfreie Anzeige und Verwendung)
- Vollständigkeit und Klarheit der Dokumentation

