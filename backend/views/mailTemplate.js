const mailTemplate = (name, roomNo, guests, checkInDate, periodOfStay, message) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            .email-header {
                background: #0073e6;
                color: white;
                text-align: center;
                padding: 15px;
                font-size: 20px;
                border-radius: 10px 10px 0 0;
            }
            .email-content {
                padding: 20px;
                font-size: 16px;
                color: #333;
            }
            .email-footer {
                text-align: center;
                font-size: 14px;
                color: #666;
                padding: 15px;
                background: #f1f1f1;
                border-radius: 0 0 10px 10px;
            }
            .highlight {
                font-weight: bold;
                color: #0073e6;
            }
            .message-box {
                padding: 15px;
                background: #eef7ff;
                border-left: 5px solid #0073e6;
                margin-top: 15px;
                font-style: italic;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                Room Booking Confirmation
            </div>
            <div class="email-content">
                <p>Dear <span class="highlight">${name}</span>,</p>
                <p>Your room booking has been confirmed. Below are your booking details:</p>
                <ul>
                    <li><strong>Room No:</strong> ${roomNo}</li>
                    <li><strong>Guests:</strong> ${guests}</li>
                    <li><strong>Check-in Date:</strong> ${checkInDate}</li>
                    <li><strong>Period of Stay:</strong> ${periodOfStay} days</li>
                </ul>
                <div class="message-box">
                    <p><strong>Message:</strong> ${message}</p>
                </div>
                <p>We look forward to hosting you. If you have any special requests, feel free to contact us.</p>
            </div>
            <div class="email-footer">
                Thank you for choosing our service!<br>
                <strong>Room Management</strong>
            </div>
        </div>
    </body>
    </html>
    `;
  };
  
  module.exports = mailTemplate;
  