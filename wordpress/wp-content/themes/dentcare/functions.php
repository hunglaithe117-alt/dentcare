<?php
/**
 * DentCare theme bootstrap.
 *
 * @package DentCare
 */

if (!defined('ABSPATH')) {
    exit;
}

define('DENTCARE_THEME_VERSION', '1.0.0');
define('DENTCARE_THEME_DIR', get_template_directory());
define('DENTCARE_THEME_URI', get_template_directory_uri());

require_once DENTCARE_THEME_DIR . '/inc/data.php';
require_once DENTCARE_THEME_DIR . '/inc/admin-settings.php';
require_once DENTCARE_THEME_DIR . '/inc/mail.php';

function dentcare_setup(): void
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);

    register_nav_menus([
        'primary' => __('Primary Navigation', 'dentcare'),
    ]);
}
add_action('after_setup_theme', 'dentcare_setup');

function dentcare_enqueue_assets(): void
{
    $main_css = DENTCARE_THEME_DIR . '/assets/css/main.min.css';
    $main_js = DENTCARE_THEME_DIR . '/assets/js/main.min.js';
    $main_css_version = file_exists($main_css) ? (string) filemtime($main_css) : DENTCARE_THEME_VERSION;
    $main_js_version = file_exists($main_js) ? (string) filemtime($main_js) : DENTCARE_THEME_VERSION;

    wp_enqueue_style('dentcare-main', DENTCARE_THEME_URI . '/assets/css/main.min.css', [], $main_css_version);
    wp_enqueue_script('dentcare-main', DENTCARE_THEME_URI . '/assets/js/main.min.js', [], $main_js_version, true);

    wp_localize_script('dentcare-main', 'DentCareTheme', [
        'locale' => dentcare_current_locale(),
        'strings' => [
            'sending' => dentcare_t('contact.form.sending'),
            'success' => dentcare_t('contact.form.success'),
            'error' => dentcare_t('contact.form.error'),
        ],
    ]);
}
add_action('wp_enqueue_scripts', 'dentcare_enqueue_assets');

function dentcare_preload_critical_assets(): void
{
    $main_css = DENTCARE_THEME_URI . '/assets/css/main.min.css';
    $mtime = file_exists(DENTCARE_THEME_DIR . '/assets/css/main.min.css') ? (string) filemtime(DENTCARE_THEME_DIR . '/assets/css/main.min.css') : DENTCARE_THEME_VERSION;

    echo '<link rel="preload" href="' . esc_url($main_css) . '?ver=' . esc_attr($mtime) . '" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">' . "\n";
    echo '<noscript><link rel="stylesheet" href="' . esc_url($main_css) . '?ver=' . esc_attr($mtime) . '"></noscript>' . "\n";

    $hero_images = dentcare_hero_images();
    if (!empty($hero_images[0])) {
        $hero_src = is_array($hero_images[0]) ? $hero_images[0]['src'] : $hero_images[0];
        echo '<link rel="preload" as="image" href="' . esc_url(dentcare_asset($hero_src)) . '" fetchpriority="high">' . "\n";
    }

    echo '<link rel="preload" as="image" href="' . esc_url(dentcare_asset('logo-light.svg')) . '">' . "\n";
    echo '<link rel="dns-prefetch" href="//fonts.googleapis.com">' . "\n";
    echo '<link rel="dns-prefetch" href="//fonts.gstatic.com">' . "\n";
    echo '<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>' . "\n";
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
    echo '<link rel="preconnect" href="https://pixel.wp.com" crossorigin>' . "\n";
}
add_action('wp_head', 'dentcare_preload_critical_assets', 1);

function dentcare_load_fonts_async(): void
{
    ?><link rel="preload" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&amp;family=Inter:wght@300;400;500;600;700;800;900&amp;display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&amp;family=Inter:wght@300;400;500;600;700;800;900&amp;display=swap"></noscript><?php
}
add_action('wp_head', 'dentcare_load_fonts_async', 2);

function dentcare_remove_block_styles(): void
{
    if (!is_admin()) {
        wp_dequeue_style('wp-block-library');
        wp_dequeue_style('wp-block-library-theme');
        wp_dequeue_style('wc-blocks-style');
        wp_dequeue_style('global-styles');
        wp_dequeue_style('classic-theme-styles');
        wp_dequeue_style('jetpack-carousel');
        wp_dequeue_style('jetpack-forms-layout');
        wp_dequeue_style('wpcom-blocks-code-style');
        wp_dequeue_style('layout-grid');
        wp_dequeue_style('wpcom-template-preview');
        wp_dequeue_script('jetpack-carousel');
        wp_dequeue_script('wpcom-template-preview');
    }
}
add_action('wp_enqueue_scripts', 'dentcare_remove_block_styles', 100);
add_action('wp_print_styles', 'dentcare_remove_block_styles', 100);

function dentcare_disable_emojis(): void
{
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
}
add_action('init', 'dentcare_disable_emojis');

function dentcare_clean_preconnect(array $hints, string $relation): array
{
    if ($relation !== 'preconnect') {
        return $hints;
    }
    $remove = [
        '//c0.wp.com',
        'https://c0.wp.com',
        '//i.ytimg.com',
        'https://i.ytimg.com',
    ];
    foreach ($hints as $i => $hint) {
        $url = is_string($hint) ? $hint : ($hint['href'] ?? '');
        foreach ($remove as $r) {
            if (str_starts_with($url, $r)) {
                unset($hints[$i]);
                break;
            }
        }
    }
    return array_values($hints);
}
add_filter('wp_resource_hints', 'dentcare_clean_preconnect', 10, 2);

function dentcare_defer_scripts(string $tag, string $handle): string
{
    if ($handle === 'dentcare-main') {
        return str_replace(' src', ' defer src', $tag);
    }
    return $tag;
}
add_filter('script_loader_tag', 'dentcare_defer_scripts', 10, 2);

function dentcare_asset(string $path): string
{
    $uri = DENTCARE_THEME_URI . '/assets/' . ltrim($path, '/');
    $ext = strtolower((string) pathinfo($path, PATHINFO_EXTENSION));
    if (!in_array($ext, ['jpg', 'jpeg', 'png'], true)) {
        return $uri;
    }
    $webp_rel = preg_replace('/\.(jpe?g|png)$/i', '.webp', $path);
    $webp_file = DENTCARE_THEME_DIR . '/assets/' . ltrim($webp_rel, '/');
    if (file_exists($webp_file)) {
        return DENTCARE_THEME_URI . '/assets/' . ltrim($webp_rel, '/');
    }
    return $uri;
}

function dentcare_generate_webp(string $path): ?string
{
    $ext = strtolower((string) pathinfo($path, PATHINFO_EXTENSION));
    if (!in_array($ext, ['jpg', 'jpeg', 'png'], true)) {
        return null;
    }
    $webp_rel = preg_replace('/\.(jpe?g|png)$/i', '.webp', $path);
    $webp_file = DENTCARE_THEME_DIR . '/assets/' . ltrim($webp_rel, '/');
    if (!file_exists($webp_file)) {
        return null;
    }
    return DENTCARE_THEME_URI . '/assets/' . ltrim($webp_rel, '/');
}

function dentcare_responsive_image(string $path, int $width = 0, int $height = 0, string $alt = '', string $loading = 'lazy', string $class = ''): string
{
    $src = dentcare_asset($path);
    $webp_src = dentcare_generate_webp($path);
    $ext = strtolower((string) pathinfo($path, PATHINFO_EXTENSION));
    $width_attr = $width > 0 ? ' width="' . $width . '"' : '';
    $height_attr = $height > 0 ? ' height="' . $height . '"' : '';
    $class_attr = $class ? ' class="' . esc_attr($class) . '"' : '';
    
    $srcset = '';
    if ($webp_src && in_array($ext, ['jpg', 'jpeg', 'png'], true)) {
        $srcset = ' srcset="' . esc_attr($webp_src) . '" type="image/webp"';
    }
    
    return '<img src="' . esc_url($src) . '" alt="' . esc_attr($alt) . '"' . $width_attr . $height_attr . $class_attr . ' loading="' . esc_attr($loading) . '" decoding="async"' . $srcset . '>';
}

function dentcare_asset_path(string $path): string
{
    return DENTCARE_THEME_DIR . '/assets/' . ltrim($path, '/');
}

function dentcare_current_locale(): string
{
    if (function_exists('pll_current_language')) {
        $pll_locale = pll_current_language('slug');
        if (in_array($pll_locale, ['fr', 'en'], true)) {
            return $pll_locale;
        }
    }

    $path = trim((string) wp_parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH), '/');
    $parts = array_values(array_filter(explode('/', $path)));
    foreach ($parts as $part) {
        if (in_array($part, ['fr', 'en'], true)) {
            return $part;
        }
    }

    $query_locale = get_query_var('dentcare_locale');
    if (in_array($query_locale, ['fr', 'en'], true)) {
        return $query_locale;
    }

    return 'fr';
}

function dentcare_current_view(): string
{
    $query_view = get_query_var('dentcare_view');
    if (in_array($query_view, ['home', 'legal-info', 'terms-and-conditions'], true)) {
        return $query_view;
    }

    $path = trim((string) wp_parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH), '/');
    $parts = array_values(array_filter(explode('/', $path)));
    $locale_index = null;
    foreach ($parts as $index => $part) {
        if (in_array($part, ['fr', 'en'], true)) {
            $locale_index = $index;
            break;
        }
    }

    if ($locale_index === null) {
        return 'home';
    }

    $view = $parts[$locale_index + 1] ?? '';
    if (in_array($view, ['legal-info', 'terms-and-conditions'], true)) {
        return $view;
    }

    return 'home';
}

function dentcare_url(string $locale = '', string $path = ''): string
{
    $locale = in_array($locale, ['fr', 'en'], true) ? $locale : dentcare_current_locale();
    $path = trim($path, '/');
    return home_url('/' . $locale . ($path !== '' ? '/' . $path : ''));
}

function dentcare_nav_items(): array
{
    return [
        'about' => 'about',
        'products' => 'products',
        'clinical' => 'macro',
        'organization' => 'organization',
    ];
}

function dentcare_rewrite_rules(): void
{
    add_rewrite_tag('%dentcare_locale%', '([^&]+)');
    add_rewrite_tag('%dentcare_view%', '([^&]+)');
    add_rewrite_rule('^(fr|en)/?$', 'index.php?dentcare_locale=$matches[1]&dentcare_view=home', 'top');
    add_rewrite_rule('^(fr|en)/(legal-info|terms-and-conditions)/?$', 'index.php?dentcare_locale=$matches[1]&dentcare_view=$matches[2]', 'top');
}
add_action('init', 'dentcare_rewrite_rules');

function dentcare_template_include(string $template): string
{
    $view = dentcare_current_view();
    if ($view === 'home') {
        return DENTCARE_THEME_DIR . '/front-page.php';
    }
    if ($view === 'legal-info') {
        return DENTCARE_THEME_DIR . '/page-legal-info.php';
    }
    if ($view === 'terms-and-conditions') {
        return DENTCARE_THEME_DIR . '/page-terms-and-conditions.php';
    }
    return $template;
}
add_filter('template_include', 'dentcare_template_include');

function dentcare_redirect_root(): void
{
    if (is_admin() || wp_doing_ajax()) {
        return;
    }

    $path = trim((string) wp_parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH), '/');
    $home_path = trim((string) wp_parse_url(home_url('/'), PHP_URL_PATH), '/');
    if ($path === $home_path || $path === '') {
        wp_safe_redirect(dentcare_url('fr'), 302);
        exit;
    }
}
add_action('template_redirect', 'dentcare_redirect_root');

function dentcare_activate(): void
{
    dentcare_rewrite_rules();
    flush_rewrite_rules();
}
add_action('after_switch_theme', 'dentcare_activate');

function dentcare_deactivate(): void
{
    flush_rewrite_rules();
}
add_action('switch_theme', 'dentcare_deactivate');

function dentcare_document_title_parts(array $parts): array
{
    $locale = dentcare_current_locale();
    $view = dentcare_current_view();
    $meta = dentcare_meta($locale, $view);
    $parts['title'] = $meta['title'];
    return $parts;
}
add_filter('document_title_parts', 'dentcare_document_title_parts');

function dentcare_head_meta(): void
{
    $locale = dentcare_current_locale();
    $view = dentcare_current_view();
    $meta = dentcare_meta($locale, $view);
    $url = dentcare_url($locale, $view === 'home' ? '' : $view);
    $image = dentcare_asset('images/og-image.jpg');
    ?>
    <meta name="description" content="<?php echo esc_attr($meta['description']); ?>">
    <link rel="canonical" href="<?php echo esc_url($url); ?>">
    <link rel="alternate" hreflang="fr" href="<?php echo esc_url(dentcare_url('fr', $view === 'home' ? '' : $view)); ?>">
    <link rel="alternate" hreflang="en" href="<?php echo esc_url(dentcare_url('en', $view === 'home' ? '' : $view)); ?>">
    <link rel="alternate" hreflang="x-default" href="<?php echo esc_url(dentcare_url('fr', $view === 'home' ? '' : $view)); ?>">
    <meta property="og:title" content="<?php echo esc_attr($meta['title']); ?>">
    <meta property="og:description" content="<?php echo esc_attr($meta['description']); ?>">
    <meta property="og:url" content="<?php echo esc_url($url); ?>">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="<?php echo esc_attr($locale === 'fr' ? 'fr_FR' : 'en_US'); ?>">
    <meta property="og:image" content="<?php echo esc_url($image); ?>">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo esc_attr($meta['title']); ?>">
    <meta name="twitter:description" content="<?php echo esc_attr($meta['description']); ?>">
    <meta name="twitter:image" content="<?php echo esc_url($image); ?>">
    <script type="application/ld+json"><?php echo wp_json_encode(dentcare_schema(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?></script>
    <?php
}
add_action('wp_head', 'dentcare_head_meta', 3);

function dentcare_cf7_shortcode(): string
{
    if (!shortcode_exists('contact-form-7')) {
        return '';
    }

    $configured_id = (int) get_option('dentcare_cf7_form_id', 0);
    if ($configured_id > 0) {
        return do_shortcode('[contact-form-7 id="' . $configured_id . '"]');
    }

    $forms = get_posts([
        'post_type' => 'wpcf7_contact_form',
        'numberposts' => 1,
        'post_status' => 'publish',
    ]);

    if (!empty($forms[0])) {
        return do_shortcode('[contact-form-7 id="' . (int) $forms[0]->ID . '"]');
    }

    return '';
}
