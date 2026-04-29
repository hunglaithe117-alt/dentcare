<?php
/**
 * Generic page template.
 *
 * @package DentCare
 */

get_header();
?>
<main class="legal-page">
    <div class="legal-page__inner">
        <?php while (have_posts()) : the_post(); ?>
            <h1><?php the_title(); ?></h1>
            <div class="legal-page__content"><?php the_content(); ?></div>
        <?php endwhile; ?>
    </div>
</main>
<?php
get_footer();

