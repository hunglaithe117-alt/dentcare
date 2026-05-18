<?php
/**
 * Products section.
 *
 * @package DentCare
 */

$products = dentcare_products();
$brands = dentcare_brand_groups();
?>
<section id="products" class="section section--soft products" data-products>
    <div class="container">
        <div class="section-heading">
            <span><?php echo esc_html(dentcare_t('products.sectionTitle')); ?></span>
            <h2><?php echo esc_html(dentcare_t('products.sectionSubtitle')); ?></h2>
        </div>

        <div class="tabs" role="tablist" aria-label="<?php echo esc_attr(dentcare_t('products.sectionTitle')); ?>">
            <?php foreach ($products['categories'] as $index => $category) : ?>
                <button type="button" class="<?php echo $index === 0 ? 'is-active' : ''; ?>" data-product-tab="<?php echo esc_attr($category); ?>">
                    <?php echo esc_html(dentcare_t('products.categories.' . $category . '.title')); ?>
                </button>
            <?php endforeach; ?>
        </div>

        <?php foreach ($products['categories'] as $cat_index => $category) : ?>
            <div class="product-panel <?php echo $cat_index === 0 ? 'is-active' : ''; ?>" data-product-panel="<?php echo esc_attr($category); ?>">
                <div class="product-grid">
                    <?php foreach ($products['keys'][$category] as $key) :
                        $image_list = $products['images'][$category][$key] ?? ['images/hero/hero-dental-closeup.jpg'];
                        $payload = [
                            'title' => dentcare_t('products.categories.' . $category . '.items.' . $key . '.name'),
                            'description' => dentcare_t('products.categories.' . $category . '.items.' . $key . '.description'),
                            'technical' => dentcare_t('products.categories.' . $category . '.items.' . $key . '.technical'),
                            'images' => array_map('dentcare_asset', $image_list),
                        ];
                        ?>
                        <article class="product-card" tabindex="0" role="button" data-product-detail="<?php echo esc_attr(wp_json_encode($payload)); ?>">
                            <div class="product-card__image">
                                <img src="<?php echo esc_url(dentcare_asset($image_list[0])); ?>" alt="<?php echo esc_attr($payload['title']); ?>" loading="lazy" width="360" height="260">
                                <?php if (count($image_list) > 1) : ?>
                                    <span>+<?php echo esc_html(count($image_list) - 1); ?></span>
                                <?php endif; ?>
                            </div>
                            <h3><?php echo esc_html($payload['title']); ?></h3>
                            <p><?php echo esc_html($payload['description']); ?></p>
                            <strong><?php echo esc_html(dentcare_t('products.detail.view')); ?></strong>
                        </article>
                    <?php endforeach; ?>
                </div>

                <?php if ($category === 'crowns') : ?>
                    <div class="brand-panels">
                        <div class="brand-panel">
                            <h3><?php echo esc_html(dentcare_t('products.labels.materials')); ?></h3>
                            <div class="logo-grid">
                                <?php foreach ($brands['materials'] as $brand) : ?>
                                    <div><img src="<?php echo esc_url(dentcare_asset($brand['src'])); ?>" alt="<?php echo esc_attr($brand['name']); ?>" loading="lazy" width="160" height="90"></div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="brand-panel">
                            <h3><?php echo esc_html(dentcare_t('products.labels.digitalFlow')); ?></h3>
                            <div class="logo-grid">
                                <?php foreach ($brands['digitalFlow'] as $brand) : ?>
                                    <div><img src="<?php echo esc_url(dentcare_asset($brand['src'])); ?>" alt="<?php echo esc_attr($brand['name']); ?>" loading="lazy" width="160" height="90"></div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>

                <?php if ($category === 'removable') : ?>
                    <div class="brand-panel brand-panel--wide">
                        <h3><?php echo esc_html(dentcare_t('products.labels.toothRangeNote')); ?></h3>
                        <div class="logo-grid logo-grid--two">
                            <?php foreach ($brands['toothChoices'] as $brand) : ?>
                                <div><img src="<?php echo esc_url(dentcare_asset($brand['src'])); ?>" alt="<?php echo esc_attr($brand['name']); ?>" loading="lazy" width="160" height="90"></div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    </div>

    <div class="modal" data-product-modal aria-hidden="true">
        <div class="modal__backdrop" data-modal-close></div>
        <div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
            <div class="modal__header">
                <div class="modal__title-area">
                    <h3 id="product-modal-title" data-modal-title></h3>
                    <p class="modal__description" data-modal-description></p>
                </div>
                <button class="modal__close-btn" type="button" data-modal-close>
                    <?php echo esc_html(dentcare_t('products.detail.close')); ?>
                </button>
            </div>

            <div class="modal__technical-box" data-modal-technical></div>

            <div class="modal__media">
                <div class="modal__image-frame">
                    <img src="" alt="" data-modal-image>
                </div>
                <div class="modal__thumbs" data-modal-thumbs></div>
                <div class="modal__media-footer" data-modal-image-count></div>
            </div>
        </div>
    </div>
</section>
