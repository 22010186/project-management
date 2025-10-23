export const html = (ipaddress: string) => `

<!doctype html>

<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Cảnh báo đăng nhập</title>
  <style>
    body { background-color: #f4f6f8; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; color: #333; }
    .container { width: 100%; max-width: 680px; margin: 24px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 6px 18px rgba(0,0,0,0.06); }
    .header { padding: 20px 28px; background: linear-gradient(90deg,#2b6cdf,#00c6ff); color: #fff; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 600; }
    .content { padding: 24px 28px; }
    .lead { margin: 0 0 16px 0; font-size: 16px; line-height: 1.5; }
    .details { background: #f7f9fb; border: 1px solid #eef3f7; padding: 14px; border-radius: 6px; margin: 16px 0; }
    .detail-row { display:flex; justify-content:space-between; padding:6px 0; font-size: 14px; }
    .btn { display:inline-block; text-decoration:none; padding: 12px 18px; border-radius: 6px; background-color:#1d4ed8; color:#fff; font-weight:600; margin-top:12px; }
    .muted { color:#6b7280; font-size:13px; }
    .footer { padding:16px 28px; font-size:13px; color:#6b7280; background:#fafbfc; }
    .small { font-size:12px; color:#9ca3af; }
    @media (max-width:520px) {
      .container { margin:12px; }
      .header h1 { font-size:18px; }
    }
  </style>
</head>
<body>
  <center>
    <div class="container" role="article" aria-roledescription="email">
      <div class="header">
        <h1>Cảnh báo bảo mật: Đăng nhập từ IP mới</h1>
      </div>

  <div class="content">
    <p class="lead">Xin chào <strong>ProjectM</strong>,</p>

    <p class="lead">Chúng tôi phát hiện một lần đăng nhập mới vào tài khoản của bạn từ một địa chỉ IP chưa từng được sử dụng trước đây. Nếu đó là bạn, bạn có thể xác nhận để tiếp tục; nếu không, hãy thay đổi mật khẩu ngay lập tức.</p>

    <div class="details" role="list">
      <div class="detail-row"><span class="muted">Địa chỉ IP</span><span><strong>${ipaddress}</strong></span></div>
      <div class="detail-row"><span class="muted">Vị trí (ước lượng)</span><span><a href="https://www.iplocation.net/ip-lookup?ip=${ipaddress}" target="_blank" rel="noopener noreferrer">Xem vị trí</a></span></div>
    </div>

    <p style="margin:0;">
      <a class="btn" href="${"confirmUrl"}" target="_blank" rel="noopener noreferrer">Xác nhận đăng nhập</a>
    </p>

    <p class="muted" style="margin-top:14px;">
      Nếu bạn không thể xác nhận hoặc không phải là người đăng nhập này, hãy <strong>thay đổi mật khẩu</strong> ngay lập tức và liên hệ bộ phận hỗ trợ.
    </p>

    <hr style="border:none;border-top:1px solid #eef3f7;margin:18px 0;"/>

    <p class="small">
      Lưu ý: Nếu bạn muốn tắt thông báo này hoặc thay đổi cài đặt bảo mật, truy cập <a href="https://project-management-ten-phi.vercel.app/settings?ip=${ipaddress}" target="_blank" rel="noopener noreferrer">cài đặt tài khoản</a>.
    </p>
  </div>

  <div class="footer">
    <div style="margin-bottom:8px;">Trân trọng,<br/><strong>Đội hỗ trợ</strong></div>
    <div class="small">Nếu bạn không yêu cầu thông báo này, hãy bỏ qua email — đường link xác nhận sẽ hết hạn sau <strong>30 phút</strong>.</div>
  </div>
</div>

<div style="max-width:680px;margin:12px auto;color:#6b7280;font-size:13px;">
  <p style="margin:6px 0;"><strong>Plain text version</strong></p>
  <p style="margin:6px 0;">Xin chào ProjectM,</p>
  <p style="margin:6px 0;">Chúng tôi phát hiện đăng nhập từ IP mới: ${ipaddress} lúc ${"timestamp"}.</p>
  <p style="margin:6px 0;">Xác nhận: ${"confirmUrl"}</p>
  <p style="margin:6px 0;">Nếu không phải bạn, đổi mật khẩu ngay.</p>
</div>

  </center>
</body>
</html>
`;
