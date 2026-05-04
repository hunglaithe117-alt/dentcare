<?php
/**
 * Organization section.
 *
 * @package DentCare
 */

$policies = dentcare_policy_details();
$shipping = dentcare_shipping_partners();
?>
<section id="organization" class="section section--soft organization">
    <div class="container">
        <div class="section-heading">
            <span><?php echo esc_html(dentcare_t('organization.sectionTitle')); ?></span>
            <h2><?php echo esc_html(dentcare_t('organization.sectionSubtitle')); ?></h2>
        </div>

        <div class="digital-card">
            <img src="<?php echo esc_url(dentcare_asset('images/organization/pict-31.jpg')); ?>"
                alt="<?php echo esc_attr(dentcare_t('organization.digital.title')); ?>">
            <div>
                <h3><?php echo esc_html(dentcare_t('organization.digital.title')); ?></h3>
                <p><?php echo esc_html(dentcare_t('organization.digital.description')); ?></p>
            </div>
        </div>

        <div class="lab-grid">
            <article class="lab-card">
                <div class="lab-card__head">
                    <span class="lab-badge lab-badge--vn">VN</span>
                    <div>
                        <h3><?php echo esc_html(dentcare_t('organization.hanoi.title')); ?></h3>
                        <p><?php echo esc_html(dentcare_t('organization.hanoi.subtitle')); ?></p>
                    </div>
                </div>
                <div class="lab-card__image-frame">
                    <img src="<?php echo esc_url(dentcare_asset('images/organization/pict-8319.jpg')); ?>"
                        alt="<?php echo esc_attr(dentcare_t('organization.hanoi.title')); ?>">
                </div>
                <div class="lab-card__items">
                    <?php foreach (['item1', 'item2', 'item3', 'item4', 'item5'] as $key): ?>
                        <div class="lab-item">
                            <span class="lab-item__dot"></span>
                            <span
                                class="lab-item__text"><?php echo esc_html(dentcare_t('organization.hanoi.' . $key)); ?></span>
                        </div>
                    <?php endforeach; ?>
                    <div class="lab-item lab-item--cert">
                        <img src="<?php echo esc_url(dentcare_asset('images/brands/certifications/pict-5456.png')); ?>"
                            alt="ISO 13485">
                    </div>
                </div>
            </article>

            <article class="lab-card">
                <div class="lab-card__head">
                    <span class="lab-badge lab-badge--fr">FR</span>
                    <div>
                        <h3><?php echo esc_html(dentcare_t('organization.bordeaux.title')); ?></h3>
                        <p><?php echo esc_html(dentcare_t('organization.bordeaux.subtitle')); ?></p>
                    </div>
                </div>
                <div class="lab-card__image-frame">
                    <img src="<?php echo esc_url(dentcare_asset('images/organization/bordeaux-lab.jpg')); ?>"
                        alt="<?php echo esc_attr(dentcare_t('organization.bordeaux.title')); ?>">
                </div>
                <div class="lab-card__items">
                    <?php foreach (['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7'] as $key): ?>
                        <div class="lab-item">
                            <span class="lab-item__dot"></span>
                            <span
                                class="lab-item__text"><?php echo esc_html(dentcare_t('organization.bordeaux.' . $key)); ?></span>
                        </div>
                    <?php endforeach; ?>
                </div>
            </article>
        </div>

        <div class="shipping-panel">
            <div class="shipping-grid">
                <?php foreach ($shipping as $partner): ?>
                    <?php if (!empty($partner['href'])): ?>
                        <a href="<?php echo esc_url($partner['href']); ?>" target="_blank" rel="noopener noreferrer"
                            class="shipping-item" title="<?php echo esc_attr($partner['name']); ?>">
                            <img src="<?php echo esc_url(dentcare_asset($partner['logoSrc'])); ?>"
                                alt="<?php echo esc_attr($partner['name']); ?>">
                        </a>
                    <?php else: ?>
                        <div class="shipping-item" title="<?php echo esc_attr($partner['name']); ?>">
                            <img src="<?php echo esc_url(dentcare_asset($partner['logoSrc'])); ?>"
                                alt="<?php echo esc_attr($partner['name']); ?>">
                        </div>
                    <?php endif; ?>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- Policies Section Rebuild -->
        <div class="policies" data-policies>
            <h3 class="policies__title"><?php echo esc_html(dentcare_t('organization.policies.title')); ?></h3>
            
            <div class="policies__tabs">
                <?php foreach ($policies as $key => $detail): ?>
                    <button type="button" 
                            class="policy-card" 
                            data-policy-tab="<?php echo esc_attr($key); ?>"
                            data-policy-title="<?php echo esc_html(dentcare_t('organization.policies.' . $key)); ?>"
                            data-policy-description="<?php echo esc_attr($detail); ?>">
                        <span class="policy-card__icon">
                            <?php if ($key === 'traceability'): ?>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            <?php elseif ($key === 'market'): ?>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M8 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M16 14h.01" /></svg>
                            <?php elseif ($key === 'warranty'): ?>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
                            <?php else: ?>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
                            <?php endif; ?>
                        </span>
                        <span class="policy-card__label"><?php echo esc_html(dentcare_t('organization.policies.' . $key)); ?></span>
                    </button>
                <?php endforeach; ?>
            </div>

            <div class="policies__panel" data-policy-panel>
                <div class="policies__panel-content">
                    <h4 class="policies__panel-title" data-policy-panel-title></h4>
                    <p class="policies__panel-description" data-policy-panel-description></p>
                    <div class="policies__panel-action" data-policy-panel-action style="display: none;">
                        <a href="<?php echo esc_url(dentcare_url(dentcare_current_locale(), 'terms-and-conditions')); ?>" class="button button--dark">
                            <?php echo esc_html(dentcare_t('organization.policies.viewDoc')); ?>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>