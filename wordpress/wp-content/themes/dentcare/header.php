<?php
/**
 * Global header.
 *
 * @package DentCare
 */

$locale = dentcare_current_locale();
$view = dentcare_current_view();
?><!doctype html>
<html lang="<?php echo esc_attr($locale === 'fr' ? 'fr-FR' : 'en-US'); ?>">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class('dentcare-site'); ?>>
<?php wp_body_open(); ?>
<header class="site-header" data-site-header>
    <div class="site-header__inner">
        <a class="site-header__logo" href="<?php echo esc_url(dentcare_url($locale)); ?>" aria-label="<?php echo esc_attr(dentcare_t('header.logoHome')); ?>" data-scroll-top>
            <img class="site-header__logo-img site-header__logo-img--light" src="<?php echo esc_url(dentcare_asset('logo-light.svg')); ?>" alt="DentCare" width="160" height="160">
            <img class="site-header__logo-img site-header__logo-img--dark" src="<?php echo esc_url(dentcare_asset('logo-dark.svg')); ?>" alt="DentCare" width="160" height="160">
        </a>

        <nav class="site-header__nav" aria-label="<?php echo esc_attr(dentcare_t('header.mainNav')); ?>">
            <?php foreach (dentcare_nav_items() as $key => $hash) : ?>
                <a href="#<?php echo esc_attr($hash); ?>"><?php echo esc_html(dentcare_t('header.' . $key)); ?></a>
            <?php endforeach; ?>
        </nav>

        <div class="site-header__actions">
            <div class="language-switcher" data-language-switcher>
                <button type="button" class="language-switcher__toggle" aria-expanded="false" aria-haspopup="menu" aria-label="<?php echo esc_attr(dentcare_t('header.chooseLanguage')); ?> (<?php echo strtoupper($locale); ?>)">
                    <span><?php echo strtoupper($locale); ?></span>
                    <svg class="icon-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div class="language-switcher__menu" role="menu">
                    <a role="menuitem" class="<?php echo $locale === 'fr' ? 'is-active' : ''; ?>" href="<?php echo esc_url(dentcare_url('fr', $view !== 'home' ? $view : '')); ?>">FR</a>
                    <a role="menuitem" class="<?php echo $locale === 'en' ? 'is-active' : ''; ?>" href="<?php echo esc_url(dentcare_url('en', $view !== 'home' ? $view : '')); ?>">EN</a>
                </div>
            </div>
            <div class="social-links" aria-label="Social">
                <a href="https://www.instagram.com/dentcare.consultation?IGsh=dnRid2s3b3plc2l2&utm_sour" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg class="icon-social" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.9 1.5a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" /></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <svg class="icon-social" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
            </div>
            <a class="site-header__cta" href="#contact"><?php echo esc_html(dentcare_t('header.contact')); ?></a>
            <button class="site-header__menu" type="button" aria-expanded="false" aria-label="<?php echo esc_attr(dentcare_t('header.toggleMenu')); ?>" data-menu-toggle>
                <div class="menu-icon" aria-hidden="true">
                    <span></span><span></span><span></span>
                </div>
            </button>
        </div>
    </div>

    <div class="mobile-menu" data-mobile-menu>
        <?php foreach (dentcare_nav_items() as $key => $hash) : ?>
            <a href="#<?php echo esc_attr($hash); ?>"><?php echo esc_html(dentcare_t('header.' . $key)); ?></a>
        <?php endforeach; ?>
        <a class="mobile-menu__cta" href="#contact"><?php echo esc_html(dentcare_t('header.contact')); ?></a>
    </div>

    <div class="partner-rail" aria-hidden="true">
        <?php foreach (dentcare_partner_logos() as $logo) : ?>
            <div class="partner-rail__item">
                <img src="<?php echo esc_url(dentcare_asset($logo['src'])); ?>" alt="<?php echo esc_attr($logo['alt']); ?>" loading="lazy" width="120" height="60">
            </div>
        <?php endforeach; ?>
    </div>
</header>
