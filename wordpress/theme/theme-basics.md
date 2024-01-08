# Wordpress Theme Development Basics

Ziel ist die Entwicklung eines Wordpress (WP)-Themes. Grundlage liefert die Wordpress-Dokumentation (Quelle: https://codex.wordpress.org/Theme_Development).

## Coding conventions

Bevor man loslegt, sollte man sich mit den Wordpress-spezifischen *Coding conventions* vertraut machen.

> https://developer.wordpress.org/coding-standards/wordpress-coding-standards/

## Wesentliche Files eines Themes

Genau genommen braucht es nur zwei Files für ein lauffähiges Theme: die `index.php` sowie die `style.css`. Praktisch ist
das natürlich nicht zielführend. Um ein Mindestmaß an Struktur zu schaffen, gilt es folgende Files zu erstellen:

1) index.php
2) style.css
3) header.php
4) footer.php

Der Zweck der `header.php` bzw. `footer.php` ist naheliegend: Es geht um die Vermeidung von Redundanzen. Es wäre bspw.
nicht sinnvoll, *Header*-spezifischen Code n-mal zu duplizieren.

### header.php

Erstellen Sie die `header.php` und fügen Sie nachfolgenden Code ein:

```html
<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Wordpress Theme Development</title>
</head>
<body>
```

### footer.php

Erstellen Sie die `footer.php` und fügen Sie nachfolgenden Code ein:

```html
   </body>
</html>
```

### index.php

Am Ende des Tages muss der Server valides HTML ausliefern. Das heißt, die einzelnen Bausteine (in Form der `header.php`
und `footer.php`) gilt es an zentraler Stelle zusammenzufügen. Und genau das ist Aufgabe der `index.php`.

Bei einem herkömmlichen PHP-Projekt würden man z.B. die Funktion `require_once()`verwenden, um Inhalte eines anderen
PHP-Files einzubinden. Das ist bei WordPress etwas komfortabler, indem wir die entsprechenden Funktionen, auch *
Template Tags* genannt, verwenden:

- get_header()
- get_footer()
- get_template_part()

Details sind in dieser Quelle https://codex.wordpress.org/Template_Tags zu entnehmen.

Header und Footer in der `index.php` einbinden:

```php
<?php
/**
 * The front page template file.
 *
 */
get_header(); ?>
    <h1>Hello, wordl!</h1>

<?php
get_footer();
```

> **Wichtig**: Um das Ergebnis im Browser zu betrachten, ist das neue Theme im Backend auszuwählen. Die `style.css` mit
> dem entsprechenden Inhalt nicht vergessen. Eine Vorlage ist dieser Quelle https://developer.wordpress.org/themes/basics/main-stylesheet-style-css/ zu entnehmen.
> Im Browser sollte dann "Hello, world!" zu sehen sein.

Der nächste Abschnitt behandelt die Verzahnung von Inhalten, die via Wordpress-Backend erstellt wurden, mit dem neuen
Theme. Denn gegenwärtig ist der sog. *Content* (Inhalt, siehe "Hello, world!") hard-coded. Das ist definitiv kein
Fortschritt. Hierzu hätten wir kein CMS benötigt. Außerdem werden einige Wordpress-Funktionen vorgestellt, die des
Entwicklers Arbeit entscheidend vereinfachen.

## Static Page erstellen

Im Backend die Page (Seite) *Home* erstellen, den Textblock "My first page" hinzufügen und unter *"Settings ->
Readings"* als *A static page* deklarieren. Zur Information: Ã„nderungen in den *Settings* sind zu speichern. Nach Aufruf
im Browser ist jedoch noch nichts zu sehen. Es braucht noch eine wesentliche Ergänzung in der `index.php`, und zwar um
die sog.
*Wordpress Loop*:

```php
<?php
/**
 * The front page template file.
 *
 */
get_header();

if (have_posts()) : // check if the loop has returned any posts.

    while (have_posts()) : // loop through each returned post.
        the_post(); // set up the content so we can use template tags like the_title().
        the_title(); // output the post title.
        the_content(); // output the post content.
    endwhile;

else :

    echo 'No Page Found'; // output an error message if there are no posts.

endif;

get_footer();
```

Nach nochmaligem Aufruf bzw. Refresh der Seite ist der Titel "Home" als auch der Textblock "My first page" zu sehen.

### Seite anpassen

Unter "Admin Dashboard -> Appearance -> Customize -> Site Identity" kann man bspw. den *Title* oder das *Favicon*
setzen. Im Theme kann dieser via `get_bloginfo( 'name' )` in der `header.php` abgerufen werden:

```html
<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo get_bloginfo( 'name' );?>></title>
</head>
<body>
```

Mit `get_bloginfo()` kann man weitere Werte (für z.B. *Charset* oder *Language*) dynamisch auslesen, wie diese Quelle
dokumentiert: https://developer.wordpress.org/reference/functions/get_bloginfo/. Grundlage bilden die Einstellungen im
Backend (z.B. *Language*-Einstellungen siehe "Settings => General").

Unser Theme wird so definitiv keine Designpreise gewinnen (bspw. fehlt die Navigation oder generell ein CSS), aber es
ist ein guter Anfang.

## Ressourcen einbinden

Nahezu jedes Projekt benötigt 3rd Party Ressourcen wie Bootstrap. Um diese sauber einzubinden, empfiehlt sich
die `functions.php`. Diese ist auf Ebene der anderen Files zu erstellen. Sollen Ressourcen vom "eigenen" Webserver
ausgeliefert werden, gilt es diese in einem Unterverzeichnis abzulegen. Für CSS-Files wäre das bspw. *assets/css*, bei
JS-Files *assets/js*. Da wir 3rd Party Ressource aus einem CDN laden, braucht es keine Kopien auf dem Server.

> By the way: *jQuery* muss nicht mehr eingebunden werden. Ist per *Default* erledigt.

Die ursprünglich erstellte `style.css` bleibt auf der Root-Ebene.

### wp_enqueue_scripts

Mit `wp_enqueue_scripts` kann man Stylesheets und JavaScript dem Frontend hinzufügen. Hierzu braucht es folgende
Einträge in der `functions.php` des Themes:

```php
function my_custom_styles_enqueue() {
    wp_enqueue_style(
        'bootstrap',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
        array(),
        false,
        'all'
    );
    wp_enqueue_style(
        'mystyles',
        get_stylesheet_directory_uri() . '/style.css',
        array(),
        false,
        'all'
    );
}
add_action( 'wp_enqueue_scripts', 'my_custom_styles_enqueue' );
```

Abschließend braucht es in der `header.php` noch ein wenig PHP-Code, damit die in der `functions.php` definierten
CSS-Ressourcen auch wirklich eingebunden werden. Fügen die Zeile `<?php wp_head(); ?>` hinzu:

````html
<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
    <title><?php echo get_bloginfo( 'name' );?>></title>
</head>
<body>
````

Analog ist in der `footer.php` die Funktion `<?php wp_footer(); ?>` aufzurufen. Dass `wp_footer()` funktioniert, ist an
der schwarzen Taskbar (oben im Viewport) im Frontend zu erkennen. Dadurch kann man Backend-Funktionalitäten aus dem
Frontend aufrufen. Aber nur dann, wenn man angemeldet ist.

### Action Hooks

Im vorhergehenden Kapitel haben wir einen sog. *Action Hook* in der `functions.php` implementiert. Weiterführende
Details liefert diese Quelle https://developer.wordpress.org/plugins/hooks/actions/. Kurzum: Mit *Action Hooks* kann man
die Wordpress-Kernfunktionalitäten einfach und schnell erweitern.

## Menü hinzufügen

Nahezu jede Website verwendet ein klassisches Menü. Wir streben ein horizontales Menü im Header der Site an. Im ersten
Schritt gilt es das Menü in der `functions.php` bekanntzumachen. Ergänze Sie diese um:

````php
register_nav_menus( array(
    'main-menu' => __( 'Primary Menu', 'my-custom-theme' ),
));
````

Wie der Name der Funktion (siehe Mehrzahl) vermuten lässt, könnte man gleich mehrere Menüs im Theme mit dem
Funktionsaufruf ermöglichen. Nachdem das Theme zumindest ein Menü unterstützt, können wir dieses in der `header.php`
einbinden. Hierzu stellt Wordpress die Funktion `wp_nav_menu()`, die ein Array als Argument entgegennimmt, bereit. Fügen
Sie diese der `header.php` hinzu:

````php
<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
    <title><?php echo get_bloginfo( 'name' );?>></title>
</head>
<body>
<header>
<nav>
    <?php
    wp_nav_menu( array(
        'theme_location' => 'main-menu',
    ) );
    ?>
    </nav>
</header>
````

Im Grunde ist das Menü bereits jetzt im Frontend zu sehen und funktionsfähig. Um dieses anzupassen, muss "das" Menü im
Backend unter *Appearance > Menus* quasi erstellt und im Karteireiter *Manage Locations* der Eintrag "Main Menu"
ausgewählt werden. Im Bereich "Menu structure" kann man Einträge hinzufügen oder löschen.

### Bootstrap-Menü anpassungen

Möchte man das Menü, was aus mehreren Gründen ratsam ist, mit dem uns bekannten Bootstrap Look & Feel implementieren,
braucht es ein wenig Hilfe in Form eines sog. "Walkers". Was ist nun der Zweck eines Walkers? Das Menü wird von
Wordpress mit einigen Default-Klassenbezeichnern ausgeliefert. Das ist zwar für die Umsetzung eines eigenen CSS-Designs
hilfreich, jedoch nicht bei einem Bootstrap-Menu, wo es definierten Klassenbezeichner braucht. Genau darum kümmert sich
der Walker; der passt die Struktur und Klassenbezeichner in Nachhinein noch an, bevor das Markup (HTML) an den Client
ausgeliefert wird.

Es gibt verschiedenen Implementierungen in den Tiefen des Internets zu finden. Wir verwenden
diese: https://github.com/AlexWebLab/bootstrap-5-wordpress-navbar-walker.

> **Hinweis zum eingesetzten Walker**: Den Inhalt der Zeile 79 (siehe `register_nav_menu('main-menu', 'Main menu');`) braucht
> es nicht mehr. Wir haben das Menü mit gleichnamiger Location bereits registriert.

Die `header.php` gestaltet sich nach Verwendung des Walkers etwas umfangreicher, wie nachfolgender Code zeigt:

```php
<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
    <title><?php echo get_bloginfo('name'); ?>></title>
</head>
<body>
<header>
    <nav class="navbar navbar-expand-md navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-menu"
                    aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="main-menu">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'main-menu',
                    'container' => false,
                    'menu_class' => '',
                    'fallback_cb' => '__return_false',
                    'items_wrap' => '<ul id="%1$s" class="navbar-nav me-auto mb-2 mb-md-0 %2$s">%3$s</ul>',
                    'depth' => 2,
                    'walker' => new bootstrap_5_wp_nav_menu_walker()
                ));
                ?>
            </div>
        </div>
    </nav>
</header>
```

Den Markup kann/muss man unter Umständen etwas anpassen. Im Beispielsfall wurde die Klasse `container-fluid`
durch `container` ersetzt. Damit diese Maßnahme durchgängig ist, wird die `index.php` ebenfalls um einen Container
erweitert.

## Sidebar hinzufügen

Im ersten Schritt ist wiederum die `funtions.php` zu erweitern. Fügen Sie folgenden Code ein:

```php 
function my_custom_theme_sidebar() {
    register_sidebar( array(
        'name' => __( 'Primary Sidebar', 'my-custom-theme' ),
        'id'   => 'sidebar-1',
    ) );
}

add_action( 'widgets_init', 'my_custom_theme_sidebar' );
```

Nach diesem Schritt ist der Menüeintrag *Widgets* unter *Appearance* zu finden. Es ist nun möglich, die Sidebar mit
Inhalten zu befüllen. Noch ist nichts im Frontend zu sehen, es fehlt der entsprechende Aufruf in der `index.php`. Fügen
Sie den Funktionsaufruf `get_sidebar()` unmittelbar vor `get_footer()` ein. Abschließend ist noch das
Skript `sidebar.php` zu erstellen. In diesem wird definiert, wie die Sidebar aussehen soll. Inhalt der noch zu
erstellenden `sidebar.php`:

```php
<?php if ( is_active_sidebar( 'sidebar-1' ) ) { ?>
    <ul class="sidebar">
        <?php dynamic_sidebar('sidebar-1' ); ?>
    </ul>
<?php } ?>
```

Jetzt sollte die Sidebar im Viewport des Frontends zu sehen sein. Dass der Inhalt unter jenem der Loop steht, ist
logisch, wir haben diese auch dort (ohne weiteres Markup) eingebunden. Was es braucht, sind entsprechenden Ã„nderungen in
der `index.php`, sodass ein 2-Spalten-Layout gegeben ist:

```php 
<?php
/**
 * The front page template file.
 */
get_header(); ?>
    <div class="container">
        <div class="row">
            <main class="col-8">
                <?php
                if (have_posts()) : // check if the loop has returned any posts.

                    while (have_posts()) : // loop through each returned post.
                        the_post(); // set up the content so we can use template tags like the_title().
                        the_title(); // output the post title.
                        the_content(); // output the post content.
                    endwhile;

                else :

                    echo 'No Page Found'; // output an error message if there are no posts.

                endif;
                ?>
            </main>
            <aside class="col-4">
                <?php get_sidebar(); ?>
            </aside>
        </div>
    </div>
<?php get_footer(); ?>
```

> Die Aufzählungspunkte bei der Sidebar müsste man noch entfernen.

## Page Templates erstellen

Erstellt man weitere Pages (z.B. Contact oder About), basieren diese auf dem 2-Spalten-Layout der `index.php`. Ist das
nicht gewünscht, braucht es zusätzliche Page-Templates. Die Umsetzung mit Wordpress ist einfach.

Erstellen Sie den Ordner "page-templates" im Theme-Ordner, und in diesem wiederum die Datei `single-column.php`. Damit
das Template im Backend sichtbar ist, braucht es ein definierten Kommentar-Header in der `single-column.php`:

```php 
/*
Template Name: Single Column Template
Template Post Type: post, page
*/
```

Wie der Kommentar bereits erahnen lässt, soll die Umsetzung eines 1-Spalten-Layout mit dem neuen Template möglich sein (
bspw. bei der About-Page). Demnach braucht es nun folgenden Code in der `single-column.php`:

````php 
<?php
/*
Template Name: Single Column Template
Template Post Type: post, page
*/
get_header(); ?>
    <div class="container">
        <div class="row">
            <main class="col-12">
                <?php
                if (have_posts()) : // check if the loop has returned any posts.
                    while (have_posts()) : // loop through each returned post.
                        the_post(); // set up the content so we can use template tags like the_title().
                        the_title(); // output the post title.
                        the_content(); // output the post content.
                    endwhile;
                else :
                    echo 'No Page Found'; // output an error message if there are no posts.
                endif;
                ?>
            </main>
        </div>
    </div>
<?php get_footer(); ?>
````

Im Prinzip ist das jener Code, den wir vor dem Umbau auf das 2-Spalten-Layout in der `index.php` hatten. Faktum ist: In
jeder Template-Page ist mindestens die Loop zu implementieren, der Rest gemäß Aufgabenstellung. Abschließend stellt sich
noch die Frage, wie man das Template verwenden kann. Hierfür klickt man auf die gewünschte Page im Backend. In der
Sidebar ist dann im Bereich "Template" eine Dropdown-Box zu sehen, in welcher das neu erstellte Template selektiert
werden kann. Details bzw. weiterführende Informationen bzgl. Page Templates können dieser
Quelle https://developer.wordpress.org/themes/template-files-section/page-template-files/ entnommen werden. Erstellen
Sie eine weitere Page (z.B. About) und das neue Template zu testen.

## Conclusio

Die Umsetzung eines eigenen Themes ist gar nicht so schwer. Auch wenn das hier vorgestellte Beispiel alles andere als
umfassend ist und den von Wordpress bereitgestellten Funktionsumfang bei weitem nicht ausschöpft, wird die prinzipielle
Vorgehensweise deutlich. Das zählt!

## Anhang

### Logo hinzufügen

Für Bild-Ressourcen empfiehlt sich mit `assets\images` die Erstellung eines eigenen Ordners. In diesen kopieren wir z.B.
das Logo der HTL-Krems. Im ersten Schritt wäre folgende Implementierung des Logos naheliegend:

```html
<img src="<?php echo get_template_directory_uri() . '/assets/images/HTL_Krems_Logo_bigger.png' ?>" alt="HTL Logo"/>
```

Aus technischer Sicht funktioniert diese Variante einwandfrei, hat jedoch den Nachteil, dass das Logo via Backend nicht
getauscht werden kann. Um diese durch das Backend zu ermöglichen, braucht es folgende Ergänzungen in
der `functions.php`:

```php
function my_custom_theme_setup() {

    // Add <title> tag support
    add_theme_support( 'title-tag' );

    // Add custom-logo support
    add_theme_support( 'custom-logo' );

}
add_action( 'after_setup_theme', 'my_custom_theme_setup');
```

An der entsprechenden Stelle im Theme (i.d.R. `header.php`) kann dann folgendermaßen darauf zugegriffen werden:

```php
 <?php the_custom_logo(); ?>
```

Abschließen das Logo noch via Backend "Admin Dashboard -> Customize -> Site Identity Options Panel" hochladen und
gegebenenfalls anpassen.
