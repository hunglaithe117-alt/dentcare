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
            <img src="<?php echo esc_url(dentcare_asset('images/organization/pict-31.jpg')); ?>" alt="<?php echo esc_attr(dentcare_t('organization.digital.title')); ?>">
            <div>
                <h3><?php echo esc_html(dentcare_t('organization.digital.title')); ?></h3>
                <p><?php echo esc_html(dentcare_t('organization.digital.description')); ?></p>
            </div>
        </div>

        <div class="lab-grid">
            <article class="lab-card">
                <div class="lab-card__head"><span>VN</span><div><h3><?php echo esc_html(dentcare_t('organization.hanoi.title')); ?></h3><p><?php echo esc_html(dentcare_t('organization.hanoi.subtitle')); ?></p></div></div>
                <img src="<?php echo esc_url(dentcare_asset('images/organization/pict-8319.jpg')); ?>" alt="<?php echo esc_attr(dentcare_t('organization.hanoi.title')); ?>">
                <div class="lab-card__items">
                    <?php foreach (['item1', 'item2', 'item3', 'item4', 'item5'] as $key) : ?>
                        <p><?php echo esc_html(dentcare_t('organization.hanoi.' . $key)); ?></p>
                    <?php endforeach; ?>
                    <p class="lab-card__cert"><img src="<?php echo esc_url(dentcare_asset('images/brands/certifications/pict-5456.png')); ?>" alt="ISO 13485"></p>
                </div>
            </article>
            <article class="lab-card">
                <div class="lab-card__head"><span>FR</span><div><h3><?php echo esc_html(dentcare_t('organization.bordeaux.title')); ?></h3><p><?php echo esc_html(dentcare_t('organization.bordeaux.subtitle')); ?></p></div></div>
                <img src="<?php echo esc_url(dentcare_asset('images/organization/bordeaux-lab.jpg')); ?>" alt="<?php echo esc_attr(dentcare_t('organization.bordeaux.title')); ?>">
                <div class="lab-card__items">
                    <?php foreach (['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7'] as $key) : ?>
                        <p><?php echo esc_html(dentcare_t('organization.bordeaux.' . $key)); ?></p>
                    <?php endforeach; ?>
                </div>
            </article>
        </div>

        <div class="shipping-panel">
            <h3><?php echo esc_html(dentcare_t('organization.deliveryNote')); ?></h3>
            <div class="shipping-grid">
                <?php foreach ($shipping as $partner) : ?>
                    <?php if (!empty($partner['href'])) : ?><a href="<?php echo esc_url($partner['href']); ?>" target="_blank" rel="noopener noreferrer"><?php else : ?><div><?php endif; ?>
                        <img src="<?php echo esc_url(dentcare_asset($partner['logoSrc'])); ?>" alt="<?php echo esc_attr($partner['name']); ?>">
                    <?php if (!empty($partner['href'])) : ?></a><?php else : ?></div><?php endif; ?>
                <?php endforeach; ?>
            </div>
        </div>

        <div class="policies" data-policies>
            <h3><?php echo esc_html(dentcare_t('organization.policies.title')); ?></h3>
            <div class="policy-grid">
                <?php foreach ($policies as $key => $detail) : ?>
                    <button type="button" data-policy="<?php echo esc_attr($key); ?>" data-policy-detail="<?php echo esc_attr($detail); ?>">
                        <span><?php echo esc_html(dentcare_t('organization.policies.' . $key)); ?></span>
                    </button>
                <?php endforeach; ?>
            </div>
            <p class="policy-detail" data-policy-output><?php echo esc_html(reset($policies)); ?></p>
        </div>
    </div>
</section>

