<?php
/**
 * FAQ section.
 *
 * @package DentCare
 */

$items = dentcare_data_get('faq.items');
?>
<section id="faq" class="section section--white faq" data-faq>
    <div class="container container--narrow">
        <div class="section-heading">
            <span><?php echo esc_html(dentcare_t('faq.sectionTitle')); ?></span>
            <h2><?php echo esc_html(dentcare_t('faq.sectionSubtitle')); ?></h2>
        </div>

        <div class="faq-list">
            <?php foreach ($items as $index => $item) : ?>
                <article class="faq-item <?php echo $index === 0 ? 'is-open' : ''; ?>">
                    <button type="button" aria-expanded="<?php echo $index === 0 ? 'true' : 'false'; ?>">
                        <span><?php echo esc_html($item['question']); ?></span>
                        <span aria-hidden="true">⌄</span>
                    </button>
                    <div class="faq-item__answer">
                        <p><?php echo esc_html($item['answer']); ?></p>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
        <div class="faq-cta">
            <p><?php echo esc_html(dentcare_t('faq.additionalInfo')); ?></p>
            <a class="button button--gold" href="#contact"><?php echo esc_html(dentcare_t('faq.contactUs')); ?></a>
        </div>
    </div>
</section>

