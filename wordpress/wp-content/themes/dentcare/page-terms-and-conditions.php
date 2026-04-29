<?php
/**
 * Terms route template.
 *
 * @package DentCare
 */

$content = dentcare_terms_content();
get_header();
?>
<main class="legal-page">
    <div class="legal-page__inner">
        <h1><?php echo esc_html($content['title']); ?></h1>
        <p class="legal-page__intro"><?php echo esc_html($content['intro']); ?></p>
        <div class="legal-page__sections">
            <?php foreach ($content['sections'] as $section) : ?>
                <section class="legal-card">
                    <h2><?php echo esc_html($section['title']); ?></h2>
                    <p><?php echo nl2br(esc_html($section['body'])); ?></p>
                </section>
            <?php endforeach; ?>
        </div>
    </div>
</main>
<?php
get_footer();

