<?php
/**
 * Legal information route template.
 *
 * @package DentCare
 */

$content = dentcare_legal_content();
get_header();
?>
<main class="legal-page">
    <div class="legal-page__inner">
        <h1><?php echo esc_html($content['title']); ?></h1>
        <p class="legal-page__intro"><?php echo esc_html($content['intro']); ?></p>
        <div class="legal-card">
            <ul>
                <?php foreach ($content['items'] as $item) : ?>
                    <li><?php echo esc_html($item); ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>
</main>
<?php
get_footer();

