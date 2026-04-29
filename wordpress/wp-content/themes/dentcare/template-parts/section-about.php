<?php
/**
 * About section.
 *
 * @package DentCare
 */

$method_items = [
    ['key' => 'scanner', 'image' => 'images/workflow/intraoral-scanner.png'],
    ['key' => 'printing', 'image' => 'images/workflow/impression-3d.jpg'],
    ['key' => 'milling', 'image' => 'images/workflow/usinage-zircone.jpg'],
    ['key' => 'implant', 'image' => 'images/workflow/implantologie.jpg'],
];
?>
<section id="about" class="section section--white about">
    <div class="container">
        <div class="section-heading">
            <span><?php echo esc_html(dentcare_t('about.sectionTitle')); ?></span>
            <h2><?php echo esc_html(dentcare_t('about.sectionSubtitle')); ?></h2>
        </div>

        <div class="about__grid">
            <div class="about__portrait">
                <img src="<?php echo esc_url(dentcare_asset('images/about/founder-portrait.jpg')); ?>" alt="<?php echo esc_attr(dentcare_t('about.founderName')); ?>">
                <div class="about__signature">
                    <img src="<?php echo esc_url(dentcare_asset('images/about/founder-signature.svg')); ?>" alt="<?php echo esc_attr(dentcare_t('about.signatureAlt')); ?>">
                    <p><?php echo esc_html(dentcare_t('about.founderRole')); ?></p>
                </div>
            </div>
            <div class="about__copy">
                <h3><?php echo esc_html(dentcare_t('about.history.title')); ?></h3>
                <p><?php echo nl2br(esc_html(dentcare_t('about.history.description'))); ?></p>
            </div>
        </div>

        <div class="about__method">
            <div>
                <span class="eyebrow"><?php echo esc_html(dentcare_t('about.certification.badge')); ?></span>
                <h3><?php echo esc_html(dentcare_t('about.method.title')); ?></h3>
                <p><?php echo esc_html(dentcare_t('about.method.description')); ?></p>
            </div>
            <div class="workflow-grid">
                <?php foreach ($method_items as $item) : ?>
                    <article>
                        <img src="<?php echo esc_url(dentcare_asset($item['image'])); ?>" alt="<?php echo esc_attr(dentcare_t('about.method.' . $item['key'])); ?>">
                        <strong><?php echo esc_html(dentcare_t('about.method.' . $item['key'])); ?></strong>
                    </article>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>

