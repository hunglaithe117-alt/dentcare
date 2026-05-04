<?php
/**
 * Global footer.
 *
 * @package DentCare
 */

$year = gmdate('Y');
?>
<footer class="site-footer">
    <div class="site-footer__inner">
        <div class="site-footer__col">
            <img src="<?php echo esc_url(dentcare_asset('logo-light.svg')); ?>" alt="DentCare" class="site-footer__logo">
            <p class="site-footer__tagline"><?php echo esc_html(dentcare_t('footer.tagline')); ?></p>
        </div>
        <div class="site-footer__col">
            <p class="site-footer__heading"><strong><?php echo esc_html(dentcare_t('footer.company')); ?></strong></p>
            <div class="site-footer__details">
                <p><?php echo esc_html(dentcare_t('footer.address')); ?></p>
                <p><?php echo esc_html(dentcare_t('footer.registration')); ?></p>
                <p><?php echo esc_html(dentcare_t('footer.vat')); ?></p>
            </div>
        </div>
        <div class="site-footer__col">
            <p class="site-footer__heading"><strong>Contact</strong></p>
            <div class="site-footer__details">
                <p><a href="tel:+33678094749"><?php echo esc_html(dentcare_t('footer.phone')); ?></a></p>
                <p><a href="mailto:<?php echo esc_attr(dentcare_t('footer.email')); ?>"><?php echo esc_html(dentcare_t('footer.email')); ?></a></p>
                <p><a href="<?php echo esc_url(dentcare_url(dentcare_current_locale(), 'legal-info')); ?>"><?php echo esc_html(dentcare_t('footer.privacy')); ?></a></p>
                <p><a href="<?php echo esc_url(dentcare_url(dentcare_current_locale(), 'terms-and-conditions')); ?>"><?php echo esc_html(dentcare_t('footer.legal')); ?></a></p>
            </div>
        </div>
    </div>
    <div class="site-footer__bottom">
        <div class="container">
            <p>© <?php echo esc_html($year); ?> DentCare Consultation. <?php echo esc_html(dentcare_t('footer.rights')); ?>.</p>
        </div>
    </div>
</footer>

<button class="scroll-top" type="button" aria-label="<?php echo esc_attr(dentcare_t('a11y.scrollToTop')); ?>" data-scroll-top-button>↑</button>
<?php wp_footer(); ?>
</body>
</html>

