<?php
/**
 * SMTP Settings Page for DentCare Theme.
 *
 * @package DentCare
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add settings page to the menu.
 */
function dentcare_add_smtp_settings_page(): void
{
    add_options_page(
        __('SMTP Configuration', 'dentcare'),
        __('SMTP Config', 'dentcare'),
        'manage_options',
        'dentcare-smtp-settings',
        'dentcare_render_smtp_settings_page'
    );
}
add_action('admin_menu', 'dentcare_add_smtp_settings_page');

/**
 * Initialize settings.
 */
function dentcare_smtp_settings_init(): void
{
    register_setting('dentcare_smtp_group', 'dentcare_smtp_host');
    register_setting('dentcare_smtp_group', 'dentcare_smtp_port');
    register_setting('dentcare_smtp_group', 'dentcare_smtp_user');
    register_setting('dentcare_smtp_group', 'dentcare_smtp_pass');
    register_setting('dentcare_smtp_group', 'dentcare_smtp_secure');
    register_setting('dentcare_smtp_group', 'dentcare_mail_from');
    register_setting('dentcare_smtp_group', 'dentcare_mail_from_name');
    register_setting('dentcare_smtp_group', 'dentcare_contact_to');

    add_settings_section(
        'dentcare_smtp_section',
        __('Mail Server Settings', 'dentcare'),
        null,
        'dentcare-smtp-settings'
    );

    add_settings_field('dentcare_smtp_host', __('SMTP Host', 'dentcare'), 'dentcare_render_text_field', 'dentcare-smtp-settings', 'dentcare_smtp_section', ['label_for' => 'dentcare_smtp_host']);
    add_settings_field('dentcare_smtp_port', __('SMTP Port', 'dentcare'), 'dentcare_render_text_field', 'dentcare-smtp-settings', 'dentcare_smtp_section', ['label_for' => 'dentcare_smtp_port', 'type' => 'number']);
    add_settings_field('dentcare_smtp_user', __('SMTP Username', 'dentcare'), 'dentcare_render_text_field', 'dentcare-smtp-settings', 'dentcare_smtp_section', ['label_for' => 'dentcare_smtp_user']);
    add_settings_field('dentcare_smtp_pass', __('SMTP Password', 'dentcare'), 'dentcare_render_text_field', 'dentcare-smtp-settings', 'dentcare_smtp_section', ['label_for' => 'dentcare_smtp_pass', 'type' => 'password']);
    add_settings_field('dentcare_smtp_secure', __('Encryption', 'dentcare'), 'dentcare_render_select_field', 'dentcare-smtp-settings', 'dentcare_smtp_section', [
        'label_for' => 'dentcare_smtp_secure',
        'options' => [
            '' => __('None', 'dentcare'),
            'ssl' => 'SSL',
            'tls' => 'TLS',
        ]
    ]);

    add_settings_section(
        'dentcare_mail_section',
        __('Sender & Recipient Settings', 'dentcare'),
        null,
        'dentcare-smtp-settings'
    );

    add_settings_field('dentcare_mail_from', __('Mail From Address', 'dentcare'), 'dentcare_render_text_field', 'dentcare-smtp-settings', 'dentcare_mail_section', ['label_for' => 'dentcare_mail_from']);
    add_settings_field('dentcare_mail_from_name', __('Mail From Name', 'dentcare'), 'dentcare_render_text_field', 'dentcare-smtp-settings', 'dentcare_mail_section', ['label_for' => 'dentcare_mail_from_name']);
    add_settings_field('dentcare_contact_to', __('Contact Recipient Email', 'dentcare'), 'dentcare_render_text_field', 'dentcare-smtp-settings', 'dentcare_mail_section', ['label_for' => 'dentcare_contact_to']);
}
add_action('admin_init', 'dentcare_smtp_settings_init');

/**
 * Render text field.
 */
function dentcare_render_text_field(array $args): void
{
    $id = $args['label_for'];
    $type = $args['type'] ?? 'text';
    $value = get_option($id);
    printf('<input type="%s" id="%s" name="%s" value="%s" class="regular-text">', esc_attr($type), esc_attr($id), esc_attr($id), esc_attr($value));
}

/**
 * Render select field.
 */
function dentcare_render_select_field(array $args): void
{
    $id = $args['label_for'];
    $options = $args['options'];
    $current = get_option($id);
    echo '<select id="' . esc_attr($id) . '" name="' . esc_attr($id) . '">';
    foreach ($options as $val => $label) {
        printf('<option value="%s" %s>%s</option>', esc_attr($val), selected($current, $val, false), esc_html($label));
    }
    echo '</select>';
}

/**
 * Render the settings page.
 */
function dentcare_render_smtp_settings_page(): void
{
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <form action="options.php" method="post">
            <?php
            settings_fields('dentcare_smtp_group');
            do_settings_sections('dentcare-smtp-settings');
            submit_button();
            ?>
        </form>
        <div class="notice notice-info">
            <p><?php _e('Note: Constants defined in wp-config.php will override these settings for better security.', 'dentcare'); ?></p>
        </div>
    </div>
    <?php
}
