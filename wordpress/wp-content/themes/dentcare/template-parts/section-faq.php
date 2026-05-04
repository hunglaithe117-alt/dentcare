<?php
/**
 * FAQ section.
 *
 * @package DentCare
 */

$items = dentcare_data_get('faq.items');
?>
<section id="faq" class="section section--white faq" data-faq>
    <div class="faq__decor faq__decor--top" aria-hidden="true"></div>
    <div class="faq__decor faq__decor--bottom" aria-hidden="true"></div>

    <div class="container container--narrow">
        <div class="section-heading">
            <span class="eyebrow"><?php echo esc_html(dentcare_t('faq.sectionTitle')); ?></span>
            <h2><?php echo esc_html(dentcare_t('faq.sectionSubtitle')); ?></h2>
        </div>

        <div class="faq-list">
            <?php foreach ($items as $index => $item) : ?>
                <article class="faq-item <?php echo $index === 0 ? 'is-open' : ''; ?>">
                    <button type="button" aria-expanded="<?php echo $index === 0 ? 'true' : 'false'; ?>">
                        <span><?php echo esc_html($item['question']); ?></span>
                        <div class="faq-item__icon" aria-hidden="true">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                    </button>
                    <div class="faq-item__answer">
                        <div class="faq-item__answer-inner">
                            <p><?php echo esc_html($item['answer']); ?></p>
                        </div>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
        <div class="faq-cta">
            <p><?php echo esc_html(dentcare_t('faq.additionalInfo')); ?></p>
            <a class="button button--gold" href="#contact">
                <?php echo esc_html(dentcare_t('faq.contactUs')); ?>
                <span class="icon-arrow">→</span>
            </a>
        </div>
    </div>
</section>

