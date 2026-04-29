<?php
/**
 * Clinical cases section.
 *
 * @package DentCare
 */

$gallery = dentcare_gallery();
$standalone_total = count($gallery['standalone']);
?>
<section id="macro" class="section section--white clinical" data-clinical>
    <div class="container">
        <div class="section-heading">
            <span><?php echo esc_html(dentcare_t('clinical.sectionTitle')); ?></span>
            <h2><?php echo esc_html(dentcare_t('clinical.sectionSubtitle')); ?></h2>
            <p><?php echo esc_html(dentcare_t('clinical.description')); ?></p>
        </div>

        <div class="macro-grid">
            <?php foreach ([1, 2, 3, 4, 6] as $num) : ?>
                <button type="button" class="macro-card" data-lightbox="<?php echo esc_attr(wp_json_encode(['type' => 'single', 'src' => dentcare_asset('images/clinical/macro/macro-' . $num . '.jpg'), 'alt' => dentcare_t('clinical.macroImageAlt') . ' ' . $num])); ?>">
                    <img src="<?php echo esc_url(dentcare_asset('images/clinical/macro/macro-' . $num . '.jpg')); ?>" alt="<?php echo esc_attr(str_replace('{num}', (string) $num, dentcare_t('clinical.macroImageAlt'))); ?>">
                </button>
            <?php endforeach; ?>
        </div>

        <div class="clinical__intro">
            <h3><?php echo esc_html(dentcare_t('clinical.macroTitle')); ?></h3>
            <p><?php echo esc_html(dentcare_t('clinical.macroSubtitle')); ?></p>
        </div>

        <div class="filmstrip">
            <?php foreach ($gallery['collections'] as $collection) :
                $title = dentcare_t('clinical.' . $collection['titleKey']);
                $items = array_map(static function ($src) use ($title) {
                    return ['src' => dentcare_asset($src), 'alt' => $title];
                }, $collection['imageSrcs']);
                ?>
                <button type="button" class="film-card" data-lightbox="<?php echo esc_attr(wp_json_encode(['type' => 'gallery', 'title' => $title, 'items' => $items, 'index' => 0])); ?>">
                    <img src="<?php echo esc_url(dentcare_asset($collection['imageSrcs'][0])); ?>" alt="<?php echo esc_attr($title); ?>">
                    <span><?php echo esc_html($title); ?></span>
                    <strong><?php echo esc_html(count($collection['imageSrcs'])); ?> images</strong>
                </button>
            <?php endforeach; ?>

            <?php foreach ($gallery['standalone'] as $index => $src) : ?>
                <button type="button" class="film-card" data-lightbox="<?php echo esc_attr(wp_json_encode(['type' => 'single', 'src' => dentcare_asset($src), 'alt' => str_replace(['{n}', '{total}'], [(string) ($index + 1), (string) $standalone_total], dentcare_t('clinical.standaloneAlt'))])); ?>">
                    <img src="<?php echo esc_url(dentcare_asset($src)); ?>" alt="<?php echo esc_attr(str_replace(['{n}', '{total}'], [(string) ($index + 1), (string) $standalone_total], dentcare_t('clinical.standaloneAlt'))); ?>">
                    <span><?php echo esc_html(dentcare_t('clinical.standaloneEnlarge')); ?></span>
                </button>
            <?php endforeach; ?>
        </div>
    </div>

    <div class="lightbox" data-lightbox-modal aria-hidden="true">
        <div class="lightbox__backdrop" data-lightbox-close></div>
        <div class="lightbox__dialog" role="dialog" aria-modal="true">
            <button type="button" class="lightbox__close" data-lightbox-close aria-label="<?php echo esc_attr(dentcare_t('clinical.closePreview')); ?>">×</button>
            <button type="button" class="lightbox__nav lightbox__nav--prev" data-lightbox-prev aria-label="<?php echo esc_attr(dentcare_t('clinical.previousImage')); ?>">‹</button>
            <img src="" alt="" data-lightbox-image>
            <button type="button" class="lightbox__nav lightbox__nav--next" data-lightbox-next aria-label="<?php echo esc_attr(dentcare_t('clinical.nextImage')); ?>">›</button>
            <p data-lightbox-caption></p>
        </div>
    </div>
</section>

