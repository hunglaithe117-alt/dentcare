<?php
/**
 * DentCare homepage.
 *
 * @package DentCare
 */

get_header();
?>
<main id="main">
    <?php
    get_template_part('template-parts/section', 'hero');
    get_template_part('template-parts/section', 'about');
    get_template_part('template-parts/section', 'products');
    get_template_part('template-parts/section', 'clinical');
    get_template_part('template-parts/section', 'organization');
    get_template_part('template-parts/section', 'faq');
    get_template_part('template-parts/section', 'contact');
    ?>
</main>
<?php
get_footer();

