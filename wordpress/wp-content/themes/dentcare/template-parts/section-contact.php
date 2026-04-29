<?php
/**
 * Contact section.
 *
 * @package DentCare
 */

$cf7 = dentcare_cf7_shortcode();
$status = sanitize_key($_GET['contact_status'] ?? '');
?>
<section id="contact" class="section section--white contact">
    <div class="container">
        <div class="section-heading">
            <span><?php echo esc_html(dentcare_t('contact.sectionTitle')); ?></span>
            <h2><?php echo esc_html(dentcare_t('contact.sectionSubtitle')); ?></h2>
        </div>

        <div class="contact__grid">
            <div class="contact__form">
                <?php if ($cf7 !== '') : ?>
                    <?php echo $cf7; ?>
                <?php else : ?>
                    <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" data-contact-form>
                        <input type="hidden" name="action" value="dentcare_contact">
                        <?php wp_nonce_field('dentcare_contact', 'dentcare_contact_nonce'); ?>
                        <label><?php echo esc_html(dentcare_t('contact.form.name')); ?> *<input type="text" name="name" autocomplete="name" required></label>
                        <label><?php echo esc_html(dentcare_t('contact.form.email')); ?> *<input type="email" name="email" autocomplete="email" required></label>
                        <label><?php echo esc_html(dentcare_t('contact.form.phone')); ?><input type="tel" name="phone" autocomplete="tel"></label>
                        <label><?php echo esc_html(dentcare_t('contact.form.message')); ?> *<textarea name="message" rows="4" required></textarea></label>
                        <button class="button button--dark" type="submit"><?php echo esc_html(dentcare_t('contact.form.submit')); ?> →</button>
                        <?php if ($status === 'success') : ?>
                            <p class="form-status form-status--success"><?php echo esc_html(dentcare_t('contact.form.success')); ?></p>
                        <?php elseif ($status === 'error') : ?>
                            <p class="form-status form-status--error"><?php echo esc_html(dentcare_t('contact.form.error')); ?></p>
                        <?php endif; ?>
                    </form>
                <?php endif; ?>
            </div>

            <div class="contact__info">
                <article class="location-card">
                    <h3><?php echo esc_html(dentcare_t('contact.locations.bordeaux.title')); ?></h3>
                    <p><?php echo esc_html(dentcare_t('contact.locations.bordeaux.address')); ?></p>
                    <p><a href="tel:+33678094749"><?php echo esc_html(dentcare_t('contact.locations.bordeaux.phone')); ?></a></p>
                    <p><a href="mailto:<?php echo esc_attr(dentcare_t('contact.locations.bordeaux.email')); ?>"><?php echo esc_html(dentcare_t('contact.locations.bordeaux.email')); ?></a></p>
                </article>
                <div class="contact-actions">
                    <a href="mailto:<?php echo esc_attr(dentcare_t('contact.locations.bordeaux.email')); ?>">✉ <?php echo esc_html(dentcare_t('contact.cta.email')); ?></a>
                    <a href="tel:+33678094749">☎ <?php echo esc_html(dentcare_t('contact.cta.callback')); ?></a>
                    <a href="#contact">▣ <?php echo esc_html(dentcare_t('contact.cta.quote')); ?></a>
                </div>
                <div class="contact-shipping">
                    <h3><?php echo dentcare_current_locale() === 'fr' ? 'Partenaires de livraison en France' : 'Delivery partners in France'; ?></h3>
                    <div class="shipping-grid">
                        <?php foreach (dentcare_shipping_partners() as $partner) : ?>
                            <div><img src="<?php echo esc_url(dentcare_asset($partner['logoSrc'])); ?>" alt="<?php echo esc_attr($partner['name']); ?>"></div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
