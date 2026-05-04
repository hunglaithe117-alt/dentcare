<?php
/**
 * Clinical cases section.
 *
 * @package DentCare
 */

$gallery = dentcare_gallery();
$standalone_total = count($gallery['standalone']);
?>
<section id="clinical" class="section section--white clinical" data-clinical>
    <div class="container">
        <div class="section-heading">
            <span><?php echo esc_html(dentcare_t('clinical.sectionTitle')); ?></span>
            <h2><?php echo esc_html(dentcare_t('clinical.sectionSubtitle')); ?></h2>
            <p><?php echo esc_html(dentcare_t('clinical.description')); ?></p>
        </div>

        <div id="standalone" class="filmstrip-shell">
            <div class="filmstrip-rule" aria-hidden="true"><span></span><span></span><span></span></div>
            <div class="filmstrip-wrap">
                <div class="filmstrip">
                    <?php foreach ($gallery['collections'] as $strip_index => $collection) :
                        $title = dentcare_t('clinical.' . $collection['titleKey']);
                        $count = count($collection['imageSrcs']);
                        $items = array_map(static function ($src) use ($title) {
                            return ['src' => dentcare_asset($src), 'alt' => $title];
                        }, $collection['imageSrcs']);
                        ?>
                        <button type="button" class="film-card film-card--collection" data-lightbox="<?php echo esc_attr(wp_json_encode(['type' => 'gallery', 'title' => $title, 'items' => $items, 'index' => 0])); ?>">
                            <div class="film-card__inner">
                                <div class="film-card__line"></div>
                                <div class="film-card__frame">
                                    <span class="film-card__index"><?php echo esc_html(str_pad((string) ($strip_index + 1), 2, '0', STR_PAD_LEFT)); ?></span>
                                    
                                    <div class="film-card__badges">
                                        <span class="film-card__badge film-card__badge--category">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                                            <?php echo esc_html($title); ?>
                                        </span>
                                        <span class="film-card__badge film-card__badge--count">
                                            <?php echo esc_html(str_replace('{count}', (string) $count, dentcare_t('clinical.galleryPhotoCount'))); ?>
                                        </span>
                                    </div>

                                    <img src="<?php echo esc_url(dentcare_asset($collection['imageSrcs'][0])); ?>" alt="<?php echo esc_attr($title); ?>">
                                    <span class="film-card__action"><?php echo esc_html(dentcare_t('clinical.openGallery')); ?></span>
                                </div>
                            </div>
                        </button>
                    <?php endforeach; ?>

                    <?php foreach ($gallery['standalone'] as $index => $src) : ?>
                        <button type="button" class="film-card" data-lightbox="<?php echo esc_attr(wp_json_encode(['type' => 'single', 'src' => dentcare_asset($src), 'alt' => str_replace(['{n}', '{total}'], [(string) ($index + 1), (string) $standalone_total], dentcare_t('clinical.standaloneAlt'))])); ?>">
                            <div class="film-card__inner">
                                <div class="film-card__line"></div>
                                <div class="film-card__frame">
                                    <span class="film-card__index"><?php echo esc_html(str_pad((string) ($index + 1 + count($gallery['collections'])), 2, '0', STR_PAD_LEFT)); ?></span>
                                    <img src="<?php echo esc_url(dentcare_asset($src)); ?>" alt="<?php echo esc_attr(str_replace(['{n}', '{total}'], [(string) ($index + 1), (string) $standalone_total], dentcare_t('clinical.standaloneAlt'))); ?>">
                                    <span class="film-card__action"><?php echo esc_html(dentcare_t('clinical.standaloneEnlarge')); ?></span>
                                </div>
                            </div>
                        </button>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <div id="macro" class="clinical__intro">
            <h3><?php echo esc_html(dentcare_t('clinical.macroTitle')); ?></h3>
            <p><?php echo esc_html(dentcare_t('clinical.macroSubtitle')); ?></p>
        </div>

        <div class="macro-grid">
            <?php foreach ([1, 2, 3, 4, 6] as $num) : ?>
                <button type="button" class="macro-card" data-lightbox="<?php echo esc_attr(wp_json_encode(['type' => 'single', 'src' => dentcare_asset('images/clinical/macro/macro-' . $num . '.jpg'), 'alt' => dentcare_t('clinical.macroImageAlt') . ' ' . $num])); ?>">
                    <img src="<?php echo esc_url(dentcare_asset('images/clinical/macro/macro-' . $num . '.jpg')); ?>" alt="<?php echo esc_attr(str_replace('{num}', (string) $num, dentcare_t('clinical.macroImageAlt'))); ?>">
                </button>
            <?php endforeach; ?>
        </div>
    </div>

    <div class="lightbox" data-lightbox-modal aria-hidden="true">
        <div class="lightbox__backdrop" data-lightbox-close></div>
        <div class="lightbox__dialog" role="dialog" aria-modal="true">
            <div class="lightbox__header">
                <div class="lightbox__info">
                    <p class="lightbox__title" data-lightbox-title></p>
                    <p class="lightbox__counter" data-lightbox-counter></p>
                </div>
                <button type="button" class="lightbox__close" data-lightbox-close aria-label="<?php echo esc_attr(dentcare_t('clinical.closePreview')); ?>">×</button>
            </div>

            <div class="lightbox__main">
                <button type="button" class="lightbox__nav lightbox__nav--prev" data-lightbox-prev aria-label="<?php echo esc_attr(dentcare_t('clinical.previousImage')); ?>">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                
                <div class="lightbox__image-frame">
                    <img src="" alt="" data-lightbox-image>
                </div>

                <button type="button" class="lightbox__nav lightbox__nav--next" data-lightbox-next aria-label="<?php echo esc_attr(dentcare_t('clinical.nextImage')); ?>">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </div>

            <div class="lightbox__thumbs" data-lightbox-thumbs></div>
        </div>
    </div>
</section>
