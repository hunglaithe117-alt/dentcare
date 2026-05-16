<?php
/**
 * Mail handling and SMTP configuration.
 *
 * @package DentCare
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Get mail setting with constant override.
 */
function dentcare_get_mail_setting(string $key): string
{
    $constant_name = strtoupper($key);
    if (defined($constant_name)) {
        return (string) constant($constant_name);
    }
    
    // Mapping keys to option names
    $option_map = [
        'SMTP_HOST' => 'dentcare_smtp_host',
        'SMTP_PORT' => 'dentcare_smtp_port',
        'SMTP_USER' => 'dentcare_smtp_user',
        'SMTP_PASS' => 'dentcare_smtp_pass',
        'SMTP_SECURE' => 'dentcare_smtp_secure',
        'MAIL_FROM' => 'dentcare_mail_from',
        'MAIL_FROM_NAME' => 'dentcare_mail_from_name',
        'CONTACT_TO_EMAIL' => 'dentcare_contact_to',
    ];

    return (string) get_option($option_map[$constant_name] ?? '', '');
}

/**
 * Configure PHPMailer to use SMTP.
 */
function dentcare_phpmailer_init($phpmailer): void
{
    $host = dentcare_get_mail_setting('SMTP_HOST');
    $user = dentcare_get_mail_setting('SMTP_USER');
    $pass = dentcare_get_mail_setting('SMTP_PASS');

    if (empty($host) || empty($user) || empty($pass)) {
        return;
    }

    $phpmailer->isSMTP();
    $phpmailer->Host = $host;
    $phpmailer->SMTPAuth = true;
    $phpmailer->Port = (int) (dentcare_get_mail_setting('SMTP_PORT') ?: 587);
    $phpmailer->Username = $user;
    $phpmailer->Password = $pass;
    
    $secure = dentcare_get_mail_setting('SMTP_SECURE');
    if ($secure === 'ssl' || $secure === 'tls') {
        $phpmailer->SMTPSecure = $secure;
    } else {
        $phpmailer->SMTPSecure = '';
    }

    // Set From Address
    $from_email = dentcare_get_mail_setting('MAIL_FROM');
    $from_name = dentcare_get_mail_setting('MAIL_FROM_NAME');
    if (!empty($from_email)) {
        $phpmailer->From = $from_email;
        $phpmailer->FromName = !empty($from_name) ? $from_name : get_bloginfo('name');
    }
}
add_action('phpmailer_init', 'dentcare_phpmailer_init');

/**
 * Set default mail content type to HTML.
 */
function dentcare_set_mail_content_type(): string
{
    return 'text/html';
}

/**
 * Handle contact form submission.
 */
function dentcare_handle_contact(): void
{
    if (!isset($_POST['dentcare_contact_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['dentcare_contact_nonce'])), 'dentcare_contact')) {
        wp_safe_redirect(add_query_arg('contact_status', 'error', wp_get_referer() ?: dentcare_url()));
        exit;
    }

    $name = sanitize_text_field(wp_unslash($_POST['name'] ?? ''));
    $email = sanitize_email(wp_unslash($_POST['email'] ?? ''));
    $phone = sanitize_text_field(wp_unslash($_POST['phone'] ?? ''));
    $message = sanitize_textarea_field(wp_unslash($_POST['message'] ?? ''));

    if ($name === '' || $email === '' || !is_email($email) || $message === '') {
        wp_safe_redirect(add_query_arg('contact_status', 'error', wp_get_referer() ?: dentcare_url()));
        exit;
    }

    $to = dentcare_get_mail_setting('CONTACT_TO_EMAIL') ?: (string) get_option('admin_email');
    $subject = 'New contact from DentCare Website';

    // Construct Text version
    $text_lines = [
        'Name: ' . $name,
        'Email: ' . $email,
        $phone !== '' ? 'Phone: ' . $phone : null,
        '',
        'Message:',
        $message,
    ];
    $body_text = implode("\n", array_filter($text_lines));

    // Construct HTML version
    $body_html = sprintf(
        '<p><strong>Name:</strong> %s</p>' .
        '<p><strong>Email:</strong> %s</p>' .
        '%s' .
        '<p><strong>Message:</strong></p>' .
        '<p>%s</p>',
        esc_html($name),
        esc_html($email),
        $phone !== '' ? sprintf('<p><strong>Phone:</strong> %s</p>', esc_html($phone)) : '',
        nl2br(esc_html($message))
    );

    $headers = [
        'Reply-To: ' . $name . ' <' . $email . '>',
    ];

    // Temporarily set content type to HTML
    add_filter('wp_mail_content_type', 'dentcare_set_mail_content_type');
    
    $sent = wp_mail($to, $subject, $body_html, $headers);
    
    // Reset content type
    remove_filter('wp_mail_content_type', 'dentcare_set_mail_content_type');

    wp_safe_redirect(add_query_arg('contact_status', $sent ? 'success' : 'error', wp_get_referer() ?: dentcare_url()));
    exit;
}
add_action('admin_post_nopriv_dentcare_contact', 'dentcare_handle_contact');
add_action('admin_post_dentcare_contact', 'dentcare_handle_contact');
