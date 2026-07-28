<!DOCTYPE html>
<html>
<head>
    <title>Password Reset Verification</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #2563eb;">Password Reset Requested</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password. Please use the 6-digit PIN code below to securely reset your password.</p>
        
        <div style="margin: 30px 0; padding: 20px; background-color: #f3f4f6; text-align: center; border-radius: 6px;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #111827;">{{ $pin }}</span>
        </div>

        <p style="color: #6b7280; font-size: 14px;">This code will expire in 15 minutes. If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
        
        <p style="margin-top: 40px; font-size: 14px; color: #9ca3af;">Thank you,<br>The MVM Logistics Team</p>
    </div>
</body>
</html>
