<?php
/**
 * About section.
 *
 * @package DentCare
 */

$method_items = [
    ['key' => 'scanner', 'image' => 'images/wetransfer/Pict 3 scanner intra oral/scanner-intra-oral.png'],
    ['key' => 'printing', 'image' => 'images/workflow/impression-3d.jpg'],
    ['key' => 'milling', 'image' => 'images/workflow/usinage-zircone.jpg'],
    ['key' => 'implant', 'image' => 'images/workflow/implantologie.jpg'],
];
$video_title = dentcare_current_locale() === 'fr' ? 'Video de presentation' : 'Introduction Video';
$video_description = dentcare_current_locale() === 'fr' ? 'Decouvrez DentCare Consultation en video.' : 'Discover DentCare Consultation in video.';
?>
<section id="about" class="section section--white about">
    <div class="about__decor" aria-hidden="true"></div>

    <div class="container">
        <div class="section-heading">
            <span class="eyebrow"><?php echo esc_html(dentcare_t('about.sectionTitle')); ?></span>
            <h2><?php echo esc_html(dentcare_t('about.sectionSubtitle')); ?></h2>
        </div>

        <div class="about__grid">
            <div class="about__copy">
                <h3><?php echo esc_html(dentcare_t('about.history.title')); ?></h3>
                <p><?php echo esc_html(dentcare_t('about.history.description')); ?> <?php echo dentcare_current_locale() === 'fr' ? 'Découvrez notre <a href="#products">gamme de prothèses dentaires</a> et nos <a href="#macro">cas cliniques</a>.' : 'Discover our <a href="#products">dental prosthetics range</a> and our <a href="#macro">clinical cases</a>.'; ?></p>
                <div class="about__signature">
                    <img src="<?php echo esc_url(dentcare_asset('images/about/founder-signature.svg')); ?>" alt="<?php echo esc_attr(dentcare_t('about.signatureAlt')); ?>" loading="lazy" width="200" height="80">
                </div>
            </div>
            <div class="about__portrait">
                <div class="about__portrait-frame">
                    <img src="<?php echo esc_url(dentcare_asset('images/about/founder-portrait.jpg')); ?>" alt="<?php echo esc_attr(dentcare_t('about.founderName')); ?>" loading="lazy" width="400" height="500">
                    <div class="about__portrait-overlay"></div>
                    <div class="about__portrait-caption">
                        <p><?php echo esc_html(dentcare_t('about.founderName')); ?></p>
                        <p><?php echo esc_html(dentcare_t('about.founderRole')); ?></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="about__method">
            <div class="about__video">
                <h3><?php echo esc_html($video_title); ?></h3>
                <p><?php echo esc_html($video_description); ?></p>
                <div class="about__video-rule" aria-hidden="true"></div>
                <div class="about__video-frame about__video-frame--lazy" data-video-id="Gp1mmmbTzJk" data-video-title="<?php echo esc_attr($video_title); ?>">
                    <div class="about__video-placeholder">
                        <img src="https://img.youtube.com/vi/Gp1mmmbTzJk/maxresdefault.jpg" alt="<?php echo esc_attr($video_title); ?>" loading="lazy" width="560" height="315">
                        <button type="button" class="about__video-play-btn" aria-label="<?php echo esc_attr($video_title); ?>">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="about__method-heading">
                <h3><?php echo esc_html(dentcare_t('about.method.title')); ?></h3>
                <p><?php echo esc_html(dentcare_t('about.method.description')); ?></p>
            </div>
            <div class="workflow-grid">
                <?php foreach ($method_items as $item) : ?>
                    <article>
                        <div class="image-wrapper">
                            <img src="<?php echo esc_url(dentcare_asset($item['image'])); ?>" alt="<?php echo esc_attr(dentcare_t('about.method.' . $item['key'])); ?>" loading="lazy" width="320" height="240">
                        </div>
                        <strong><?php echo esc_html(dentcare_t('about.method.' . $item['key'])); ?></strong>
                    </article>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>
