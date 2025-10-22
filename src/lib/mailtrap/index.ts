// Looking to send emails in production? Check out our Email API/SMTP product!
import { html } from "./html";
import transport from "./transport";
export async function sendLoginAlertEmail(
  userEmail: string,
  ipAddress: string
) {
  await transport.sendMail({
    from: '"Hệ thống bảo mật" <no-reply@yourapp.com>',
    to: userEmail,
    subject: "Cảnh báo: đăng nhập từ IP mới",
    html: html(ipAddress), // chính là biến html ở trên
  });
}
