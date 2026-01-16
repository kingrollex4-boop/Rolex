<?php
// Configure your email settings
$to_email = "kingrollex4@gmail.com";
$company_phone = "+1 (305) 574-1900";
$company_name = "Rapid Credit";

// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type
header('Content-Type: application/json');

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to validate email
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Function to send email
function send_email($to, $subject, $message, $headers) {
    return mail($to, $subject, $message, $headers);
}

// Get form type
$form_type = isset($_POST['form_type']) ? sanitize_input($_POST['form_type']) : '';

// Initialize response
$response = array(
    'success' => false,
    'message' => 'An error occurred.'
);

try {
    if ($form_type === 'loan_application') {
        // Process loan application
        $name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
        $email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
        $phone = isset($_POST['phone']) ? sanitize_input($_POST['phone']) : '';
        $loan_amount = isset($_POST['loanAmount']) ? sanitize_input($_POST['loanAmount']) : '';
        $purpose = isset($_POST['purpose']) ? sanitize_input($_POST['purpose']) : '';
        $state = isset($_POST['state']) ? sanitize_input($_POST['state']) : '';
        
        // Validate required fields
        if (empty($name) || empty($email) || empty($phone) || empty($loan_amount)) {
            $response['message'] = 'Please fill in all required fields.';
            echo json_encode($response);
            exit;
        }
        
        if (!validate_email($email)) {
            $response['message'] = 'Please enter a valid email address.';
            echo json_encode($response);
            exit;
        }
        
        // Create email subject and message
        $subject = "New Loan Application - Rapid Credit";
        
        $message = "
        <html>
        <head>
            <title>New Loan Application</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #0066ff; color: white; padding: 20px; text-align: center; }
                .content { background: #f8f9fa; padding: 20px; border: 1px solid #ddd; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #333; }
                .value { color: #666; }
                .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>New Loan Application</h1>
                    <p>Rapid Credit Application Form</p>
                </div>
                <div class='content'>
                    <div class='field'>
                        <div class='label'>Applicant Name:</div>
                        <div class='value'>$name</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Email Address:</div>
                        <div class='value'>$email</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Phone Number:</div>
                        <div class='value'>$phone</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Loan Amount:</div>
                        <div class='value'>$$loan_amount</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Loan Purpose:</div>
                        <div class='value'>$purpose</div>
                    </div>
                    <div class='field'>
                        <div class='label'>State:</div>
                        <div class='value'>$state</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Submission Date:</div>
                        <div class='value'>" . date('Y-m-d H:i:s') . "</div>
                    </div>
                </div>
                <div class='footer'>
                    <p>This application was submitted through the Rapid Credit website.</p>
                    <p>Company Phone: $company_phone</p>
                </div>
            </div>
        </body>
        </html>
        ";
        
        // Headers for HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: Rapid Credit <noreply@rapidcredit.com>" . "\r\n";
        $headers .= "Reply-To: $email" . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        // Send email
        if (send_email($to_email, $subject, $message, $headers)) {
            $response['success'] = true;
            $response['message'] = 'Application submitted successfully!';
            
            // Send auto-reply to applicant
            $auto_subject = "Thank You for Your Application - Rapid Credit";
            $auto_message = "
            <html>
            <body>
                <h2>Thank You for Choosing Rapid Credit!</h2>
                <p>Dear $name,</p>
                <p>We have received your loan application for $$loan_amount.</p>
                <p>Our team will review your application and contact you within 24 hours at $phone.</p>
                <p>If you have any questions, please call us at $company_phone.</p>
                <br>
                <p>Best regards,<br>The Rapid Credit Team</p>
            </body>
            </html>
            ";
            
            $auto_headers = "MIME-Version: 1.0" . "\r\n";
            $auto_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $auto_headers .= "From: Rapid Credit <kingrollex4@gmail.com>" . "\r\n";
            
            send_email($email, $auto_subject, $auto_message, $auto_headers);
            
        } else {
            $response['message'] = 'Failed to send email. Please try again.';
        }
        
    } elseif ($form_type === 'contact') {
        // Process contact form
        $contact_name = isset($_POST['contactName']) ? sanitize_input($_POST['contactName']) : '';
        $contact_email = isset($_POST['contactEmail']) ? sanitize_input($_POST['contactEmail']) : '';
        $contact_subject = isset($_POST['contactSubject']) ? sanitize_input($_POST['contactSubject']) : '';
        $contact_message = isset($_POST['contactMessage']) ? sanitize_input($_POST['contactMessage']) : '';
        
        // Validate required fields
        if (empty($contact_name) || empty($contact_email) || empty($contact_subject) || empty($contact_message)) {
            $response['message'] = 'Please fill in all required fields.';
            echo json_encode($response);
            exit;
        }
        
        if (!validate_email($contact_email)) {
            $response['message'] = 'Please enter a valid email address.';
            echo json_encode($response);
            exit;
        }
        
        // Create email subject and message
        $subject = "New Contact Form Submission: $contact_subject";
        
        $message = "
        <html>
        <body>
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> $contact_name</p>
            <p><strong>Email:</strong> $contact_email</p>
            <p><strong>Subject:</strong> $contact_subject</p>
            <p><strong>Message:</strong></p>
            <p>$contact_message</p>
            <br>
            <p>Submitted on: " . date('Y-m-d H:i:s') . "</p>
        </body>
        </html>
        ";
        
        // Headers for HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: Rapid Credit Website <noreply@rapidcredit.com>" . "\r\n";
        $headers .= "Reply-To: $contact_email" . "\r\n";
        
        // Send email
        if (send_email($to_email, $subject, $message, $headers)) {
            $response['success'] = true;
            $response['message'] = 'Message sent successfully!';
            
            // Send auto-reply
            $auto_subject = "Thank You for Contacting Rapid Credit";
            $auto_message = "
            <html>
            <body>
                <h2>Thank You for Contacting Us!</h2>
                <p>Dear $contact_name,</p>
                <p>We have received your message and will respond within 24 hours.</p>
                <p>For immediate assistance, please call us at $company_phone.</p>
                <br>
                <p>Best regards,<br>The Rapid Credit Team</p>
            </body>
            </html>
            ";
            
            $auto_headers = "MIME-Version: 1.0" . "\r\n";
            $auto_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $auto_headers .= "From: Rapid Credit <kingrollex4@gmail.com>" . "\r\n";
            
            send_email($contact_email, $auto_subject, $auto_message, $auto_headers);
            
        } else {
            $response['message'] = 'Failed to send message. Please try again.';
        }
        
    } else {
        $response['message'] = 'Invalid form submission.';
    }
    
} catch (Exception $e) {
    $response['message'] = 'An error occurred: ' . $e->getMessage();
}

// Return JSON response
echo json_encode($response);
?>
