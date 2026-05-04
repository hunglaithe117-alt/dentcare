<?php
/**
 * Contact section.
 *
 * @package DentCare
 */

$cf7 = dentcare_cf7_shortcode();
$status = sanitize_key($_GET['contact_status'] ?? '');
$shipping_title = dentcare_current_locale() === 'fr' ? 'Partenaires de livraison en France' : 'Delivery partners in France';
$shipping_note = dentcare_current_locale() === 'fr'
    ? 'Expedition securisee sur toute la France avec nos transporteurs partenaires.'
    : 'Secure shipping across France with our trusted carrier partners.';
?>
<section id="contact" class="section section--white contact">
    <div class="container">
        <div class="section-heading">
            <span><?php echo esc_html(dentcare_t('contact.sectionTitle')); ?></span>
            <h2><?php echo esc_html(dentcare_t('contact.sectionSubtitle')); ?></h2>
        </div>

        <div class="contact__grid">
            <div class="contact__left">
                <div class="contact__form">
                    <?php if ($cf7 !== '') : ?>
                        <?php echo $cf7; ?>
                    <?php else : ?>
                        <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" data-contact-form>
                            <input type="hidden" name="action" value="dentcare_contact">
                            <?php wp_nonce_field('dentcare_contact', 'dentcare_contact_nonce'); ?>
                            <div class="contact__form-row">
                                <label><?php echo esc_html(dentcare_t('contact.form.name')); ?> *<input type="text" name="name" autocomplete="name" required></label>
                                <label><?php echo esc_html(dentcare_t('contact.form.email')); ?> *<input type="email" name="email" autocomplete="email" required></label>
                            </div>
                            <label><?php echo esc_html(dentcare_t('contact.form.phone')); ?><input type="tel" name="phone" autocomplete="tel"></label>
                            <label><?php echo esc_html(dentcare_t('contact.form.message')); ?> *<textarea name="message" rows="1" required></textarea></label>
                            <button class="button button--dark" type="submit"><?php echo esc_html(dentcare_t('contact.form.submit')); ?> →</button>
                            <?php if ($status === 'success') : ?>
                                <p class="form-status form-status--success"><?php echo esc_html(dentcare_t('contact.form.success')); ?></p>
                            <?php elseif ($status === 'error') : ?>
                                <p class="form-status form-status--error"><?php echo esc_html(dentcare_t('contact.form.error')); ?></p>
                            <?php endif; ?>
                        </form>
                    <?php endif; ?>
                </div>

                <div class="contact__locations">
                    <article class="location-card">
                        <div class="location-card__head">
                            <h3><?php echo esc_html(dentcare_t('contact.locations.bordeaux.title')); ?></h3>
                            <span aria-hidden="true"></span>
                        </div>
                        <div class="location-card__body">
                            <p><?php echo esc_html(dentcare_t('contact.locations.bordeaux.address')); ?></p>
                            <p><a href="tel:+33678094749"><?php echo esc_html(dentcare_t('contact.locations.bordeaux.phone')); ?></a></p>
                            <p><a href="mailto:<?php echo esc_attr(dentcare_t('contact.locations.bordeaux.email')); ?>"><?php echo esc_html(dentcare_t('contact.locations.bordeaux.email')); ?></a></p>
                        </div>
                    </article>
                </div>
            </div>

            <div class="contact__side">
                <div class="contact__map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2829.4975549072976!2d-0.5786729235882069!3d44.83177897107062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5527ca3df11d8d%3A0x6bba355b9e7dfc92!2s29%20Rue%20de%20Cursol%2C%2033000%20Bordeaux%2C%20France!5e0!3m2!1sen!2svn!4v1741682855217!5m2!1sen!2svn"
                        width="100%"
                        height="100%"
                        style="border:0"
                        allowfullscreen
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="Google Maps Location Bordeaux"
                    ></iframe>
                </div>

                <div class="contact-shipping">
                    <div class="contact-shipping__head">
                        <div>
                            <h3><?php echo esc_html($shipping_title); ?></h3>
                            <p><?php echo esc_html($shipping_note); ?></p>
                        </div>
                        <?php if (dentcare_asset_path('images/wetransfer/Logo livraison dans toute la france/IMG_1634.jpg')) : ?>
                            <img src="<?php echo esc_url(dentcare_asset('images/wetransfer/Logo livraison dans toute la france/IMG_1634.jpg')); ?>" alt="France">
                        <?php endif; ?>
                    </div>
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
