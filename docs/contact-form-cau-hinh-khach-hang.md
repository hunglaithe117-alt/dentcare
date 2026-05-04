# Hướng dẫn cấu hình form liên hệ (dành cho khách hàng)

Tài liệu này giúp **DentCare** chuẩn bị thông tin để đội kỹ thuật bật form liên hệ trên website **dentcare-consultation.com**.  
Bạn không cần biết lập trình; chỉ cần làm theo các mục dưới và gửi lại những gì được yêu cầu (qua kênh bảo mật khi có mật khẩu).

---

## Form liên hệ cần gì?

Website gửi email **từ máy chủ** qua giao thức **SMTP** (giống cách Outlook hay Gmail gửi mail). Để hoạt động, cần:

1. **Một hộp thư nhận** — ví dụ `olivier@dentcare-consultation.com` (nơi nhận tin nhắn từ khách trên web).
2. **Một tài khoản cho phép gửi mail qua SMTP** — thường là cùng nhà cung cấp email của domain (OVH, Gandi, Google Workspace, Microsoft 365, v.v.).

Nếu domain **chưa** có email `@dentcare-consultation.com`, cần **tạo hộp thư hoặc dịch vụ email** trước (tại nơi quản lý domain/hosting hoặc nhà cung cấp email).

---

## Việc khách hàng cần xác nhận

### 1. Email nhận tin từ form

- Ghi rõ địa chỉ muốn nhận (ví dụ: `olivier@dentcare-consultation.com`).
- Đảm bảo hộp thư đó **đã tạo** và có thể đăng nhập webmail hoặc Outlook/Gmail nếu dùng chuyển tiếp.

### 2. Nơi quản lý email của domain

Ghi giúp một trong các trường hợp:

- Tên công ty / nơi mua domain (VD: OVH, Gandi, Ionos…).
- Hoặc đang dùng **Google Workspace** / **Microsoft 365** cho `@dentcare-consultation.com`.

Điều này giúp đội kỹ thuật tra đúng **máy chủ SMTP**, **cổng**, và cách bật gửi mail.

### 3. Thông tin SMTP (để đội kỹ thuật cấu hình server)

Yêu cầu nhà cung cấp email hoặc vào trang quản trị và **chụp màn hình / copy** các mục sau (trừ mật khẩu — xem mục bảo mật bên dưới):

| Thông tin | Ví dụ / ghi chú |
|-----------|-----------------|
| Máy chủ SMTP (host) | VD: `ssl0.ovh.net`, `smtp.gmail.com`, tùy nhà cung cấp |
| Cổng (port) | Thường **587** (STARTTLS) hoặc **465** (SSL) |
| Bảo mật | Có dùng SSL/TLS không (nhà cung cấp sẽ ghi trong tài liệu) |
| Tài khoản đăng nhập SMTP | Thường là **địa chỉ email đầy đủ** |
| Mật khẩu | Mật khẩu hộp thư hoặc **mật khẩu ứng dụng** nếu nhà cung cấp yêu cầu |

**Lưu ý:** Một số nhà cung cấp bắt bật **xác thực hai lớp (2FA)** rồi tạo **mật khẩu ứng dụng** riêng cho SMTP — làm theo hướng dẫn chính thức của họ.

### 4. Địa chỉ “gửi từ” (người gửi hiển thị)

Nên dùng một địa chỉ **cùng domain**, ví dụ:

- `noreply@dentcare-consultation.com`, hoặc  
- chính mailbox SMTP đang dùng để gửi.

Một số nhà cung cấp **bắt** địa chỉ gửi phải trùng với tài khoản SMTP — đội kỹ thuật sẽ điều chỉnh cho đúng.

---

## DNS (nếu mail mới hoặc chưa nhận được mail)

Nếu email `@dentcare-consultation.com` **chưa nhận được mail** hoặc **mới tạo**:

- Kiểm tra tại nơi quản lý **DNS** của domain có bản ghi **MX** đúng theo hướng dẫn nhà cung cấp email.
- Làm theo hướng dẫn thêm **SPF** (và nếu có **DKIM**) để mail ít bị vào thư mục spam.

Khách hàng có thể **chuyển tiếp** màn hình DNS hoặc nhờ IT/người quản lý domain xác nhận MX đã khớp dịch vụ email.

---

## Bảo mật khi gửi thông tin cho đội kỹ thuật

- **Không** gửi mật khẩu SMTP qua email thường hoặc chat công khai.
- Ưu tiên: **cổng bảo mật** do công ty cung cấp, **mật khẩu dùng một lần**, hoặc nhập trực tiếp vào bảng điều khiển hosting (Vercel / biến môi trường) do khách hoặc đội kỹ thuật có quyền.

---

## Checklist gửi lại cho đội phát triển

Khách hàng có thể copy và điền:

- [ ] Địa chỉ nhận form: `___________________________`
- [ ] Nhà cung cấp email / nơi quản lý domain: `___________________________`
- [ ] SMTP host: `___________________________`
- [ ] SMTP port: `___________________________`
- [ ] Dùng SSL cổng 465 hay STARTTLS cổng 587: `___________________________`
- [ ] Tài khoản SMTP (email đăng nhập): `___________________________`
- [ ] Mật khẩu / mật khẩu ứng dụng: gửi qua kênh bảo mật (không điền vào email thường)
- [ ] Địa chỉ gửi hiển thị mong muốn (FROM): `___________________________`
- [ ] Đã kiểm tra nhận mail bình thường tại hộp thư nhận? Có / Chưa

---

## Sau khi cấu hình xong

Đội kỹ thuật sẽ nhập các biến môi trường trên server (tên biến tham chiếu trong dự án: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `CONTACT_TO_EMAIL`).  
Sau đó nên **thử gửi một tin** từ form trên website và xác nhận email đến đúng hộp thư.

---

*Nếu khách hàng chỉ có domain mà chưa có email doanh nghiệp, bước đầu là đăng ký **email theo domain** tại cùng nơi mua domain hoặc dịch vụ email chuyên nghiệp, rồi làm theo tài liệu SMTP chính thức của họ.*
