<?php
/**
 * Global header.
 *
 * @package DentCare
 */

$locale = dentcare_current_locale();
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
            <img class="site-header__logo-img site-header__logo-img--light" src="<?php echo esc_url(dentcare_asset('logo-light.svg')); ?>" alt="DentCare">
            <img class="site-header__logo-img site-header__logo-img--dark" src="<?php echo esc_url(dentcare_asset('logo-dark.svg')); ?>" alt="DentCare">
        </a>

        <nav class="site-header__nav" aria-label="<?php echo esc_attr(dentcare_t('header.mainNav')); ?>">
            <?php foreach (dentcare_nav_items() as $key => $hash) : ?>
                <a href="#<?php echo esc_attr($hash); ?>"><?php echo esc_html(dentcare_t('header.' . $key)); ?></a>
            <?php endforeach; ?>
        </nav>

        <div class="site-header__actions">
            <div class="language-switcher" aria-label="<?php echo esc_attr(dentcare_t('header.chooseLanguage')); ?>">
                <a class="<?php echo $locale === 'fr' ? 'is-active' : ''; ?>" href="<?php echo esc_url(dentcare_url('fr', get_query_var('dentcare_view') !== 'home' ? get_query_var('dentcare_view') : '')); ?>">FR</a>
                <a class="<?php echo $locale === 'en' ? 'is-active' : ''; ?>" href="<?php echo esc_url(dentcare_url('en', get_query_var('dentcare_view') !== 'home' ? get_query_var('dentcare_view') : '')); ?>">EN</a>
            </div>
            <div class="social-links" aria-label="Social">
                <a href="https://www.instagram.com/dentcare.consultation?IGsh=dnRid2s3b3plc2l2&utm_sour" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <span aria-hidden="true">◎</span>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <span aria-hidden="true">f</span>
                </a>
            </div>
            <a class="site-header__cta" href="#contact"><?php echo esc_html(dentcare_t('header.contact')); ?></a>
            <button class="site-header__menu" type="button" aria-expanded="false" aria-label="<?php echo esc_attr(dentcare_t('header.toggleMenu')); ?>" data-menu-toggle>
                <span></span><span></span><span></span>
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
                <img src="<?php echo esc_url(dentcare_asset($logo['src'])); ?>" alt="<?php echo esc_attr($logo['alt']); ?>">
            </div>
        <?php endforeach; ?>
    </div>
</header>
