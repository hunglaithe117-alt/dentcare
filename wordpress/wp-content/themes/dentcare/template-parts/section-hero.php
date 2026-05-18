<?php
/**
 * Hero section.
 *
 * @package DentCare
 */

$images = dentcare_hero_images();
?>
<section id="hero" class="hero" data-hero-slider>
    <div class="hero__media">
        <?php foreach ($images as $index => $image) : ?>
            <img class="hero__image <?php echo $index === 0 ? 'is-active' : ''; ?>" src="<?php echo esc_url(dentcare_asset($image)); ?>" alt="" width="1920" height="1080" <?php echo $index === 0 ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'; ?> data-hero-image>
        <?php endforeach; ?>
        <div class="hero__overlay"></div>
    </div>
    <div class="hero__content">
        <h1><?php echo esc_html(dentcare_t('hero.title')); ?></h1>
        <p><?php echo esc_html(dentcare_t('hero.subtitle')); ?></p>
        <div class="hero__actions">
            <a class="button button--gold" href="#products"><?php echo esc_html(dentcare_t('hero.cta')); ?></a>
            <a class="button button--ghost" href="#macro"><?php echo esc_html(dentcare_t('hero.ctaQuote')); ?></a>
        </div>
    </div>
    <div class="hero__controls" aria-label="Hero slides">
        <span data-hero-count>01 / <?php echo esc_html(str_pad((string) count($images), 2, '0', STR_PAD_LEFT)); ?></span>
        <div>
            <?php foreach ($images as $index => $image) : ?>
                <button type="button" class="<?php echo $index === 0 ? 'is-active' : ''; ?>" aria-label="Go to slide <?php echo esc_attr($index + 1); ?>" data-hero-dot="<?php echo esc_attr($index); ?>"></button>
            <?php endforeach; ?>
        </div>
    </div>
    <div class="hero__scroll" aria-hidden="true"><span></span></div>
</section>
