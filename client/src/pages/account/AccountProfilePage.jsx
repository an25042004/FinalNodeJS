import React, { useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
  Image,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import {
  Bell,
  Person,
  CreditCard,
  GeoAlt,
  Lock,
  Gear,
  Shield,
  InfoCircle,
  Bag,
  Ticket,
  Coin,
  Stars,
} from "react-bootstrap-icons";

function AccountProfilePage() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const [editing, setEditing] = useState({
    email: false,
    phone: false,
    dob: false,
  });
  const [form, setForm] = useState({
    username: "cngtun560",
    name: "Công Tuấn",
    email: "bi******@gmail.com",
    phone: "********01",
    gender: "Nam",
    dob: "**/**/2004",
  });

  const masked = useMemo(
    () => ({
      email: "bi******@gmail.com",
      phone: "********01",
      dob: "**/**/2004",
    }),
    []
  );

  const leftNav = [
    { label: "Thông Báo", icon: Bell },
    { label: "Tài Khoản Của Tôi", icon: Person },
    { label: "Hồ Sơ", icon: InfoCircle, active: true },
    { label: "Ngân Hàng", icon: CreditCard },
    { label: "Địa Chỉ", icon: GeoAlt },
    { label: "Đổi Mật Khẩu", icon: Lock },
    { label: "Cài Đặt Thông Báo", icon: Gear },
    { label: "Những Thiết Lập Riêng Tư", icon: Shield },
    { label: "Thông Tin Cá Nhân", icon: InfoCircle },
    { label: "Đơn Mua", icon: Bag },
    { label: "Kho Voucher", icon: Ticket },
    { label: "Shopee Xu", icon: Coin },
    { label: "9.9 Ngày Siêu Mua Sắm", icon: Stars },
  ];

  const onAvatarChange = (e) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;
    const valid = ["image/jpeg", "image/png"].includes(file.type);
    if (!valid) {
      setError("Chỉ nhận JPEG hoặc PNG.");
      return;
    }
    if (file.size > 1024 * 1024) {
      setError("Dung lượng ảnh tối đa 1MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setToast("Đã lưu thay đổi hồ sơ.");
    setTimeout(() => setToast(""), 1800);

    // reset toggles + trả mask nếu chưa sửa
    setEditing({ email: false, phone: false, dob: false });
    setForm((prev) => ({
      ...prev,
      email: editing.email ? prev.email : masked.email,
      phone: editing.phone ? prev.phone : masked.phone,
      dob: editing.dob ? prev.dob : masked.dob,
    }));

    // TODO: gọi API PUT /api/account/profile với dữ liệu 'form'
  };

  return (
    <Container fluid className="bg-light min-vh-100 py-4">
      <Row className="g-3">
        {/* Sidebar */}
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                  style={{ width: 48, height: 48 }}
                >
                  <Person size={22} className="text-secondary" />
                </div>
                <div className="ms-3">
                  <div className="fw-semibold">cngtun560</div>
                  <Button variant="link" size="sm" className="p-0">
                    Sửa Hồ Sơ
                  </Button>
                </div>
              </div>

              <ListGroup variant="flush">
                {leftNav.map(({ label, icon: Icon, active }) => (
                  <ListGroup.Item
                    key={label}
                    action
                    className={
                      active ? "bg-warning-subtle text-warning-emphasis" : ""
                    }
                  >
                    <div className="d-flex align-items-center">
                      <Icon
                        size={18}
                        className={active ? "me-2" : "me-2 text-secondary"}
                      />{" "}
                      {label}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Main */}
        <Col md={9}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <div className="fw-semibold">Hồ Sơ Của Tôi</div>
              <small className="text-muted">
                Quản lý thông tin hồ sơ để bảo mật tài khoản
              </small>
            </Card.Header>

            <Card.Body>
              <Form onSubmit={handleSave}>
                <Row className="g-4">
                  {/* Left form */}
                  <Col lg={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tên đăng nhập</Form.Label>
                      <Form.Control value={form.username} disabled />
                      <Form.Text className="text-muted">
                        Tên Đăng nhập chỉ có thể thay đổi một lần.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Tên</Form.Label>
                      <Form.Control
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <div className="d-flex align-items-center gap-2">
                        {editing.email ? (
                          <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                            value={
                              form.email === masked.email ? "" : form.email
                            }
                            onChange={(e) =>
                              setForm({ ...form, email: e.target.value })
                            }
                          />
                        ) : (
                          <Form.Control value={form.email} disabled />
                        )}
                        <Button
                          variant="link"
                          onClick={() =>
                            setEditing((s) => ({ ...s, email: !s.email }))
                          }
                        >
                          {editing.email ? "Hủy" : "Thay Đổi"}
                        </Button>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Số điện thoại</Form.Label>
                      <div className="d-flex align-items-center gap-2">
                        {editing.phone ? (
                          <Form.Control
                            type="tel"
                            placeholder="0987654321"
                            value={
                              form.phone === masked.phone ? "" : form.phone
                            }
                            onChange={(e) =>
                              setForm({ ...form, phone: e.target.value })
                            }
                          />
                        ) : (
                          <Form.Control value={form.phone} disabled />
                        )}
                        <Button
                          variant="link"
                          onClick={() =>
                            setEditing((s) => ({ ...s, phone: !s.phone }))
                          }
                        >
                          {editing.phone ? "Hủy" : "Thay Đổi"}
                        </Button>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Giới tính</Form.Label>
                      <div>
                        {["Nam", "Nữ", "Khác"].map((g) => (
                          <Form.Check
                            inline
                            type="radio"
                            key={g}
                            label={g}
                            name="gender"
                            checked={form.gender === g}
                            onChange={() => setForm({ ...form, gender: g })}
                          />
                        ))}
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Ngày sinh</Form.Label>
                      <div className="d-flex align-items-center gap-2">
                        {editing.dob ? (
                          <Form.Control
                            type="date"
                            value={
                              /\n?\d{4}-\d{2}-\d{2}/.test(form.dob)
                                ? form.dob
                                : ""
                            }
                            onChange={(e) =>
                              setForm({ ...form, dob: e.target.value })
                            }
                          />
                        ) : (
                          <Form.Control value={form.dob} disabled />
                        )}
                        <Button
                          variant="link"
                          onClick={() =>
                            setEditing((s) => ({ ...s, dob: !s.dob }))
                          }
                        >
                          {editing.dob ? "Hủy" : "Thay Đổi"}
                        </Button>
                      </div>
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="warning"
                      className="text-white px-4"
                    >
                      Lưu
                    </Button>
                  </Col>

                  {/* Right: avatar */}
                  <Col lg={4}>
                    <Card className="h-100">
                      <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center">
                        <div
                          className="rounded-circle bg-light overflow-hidden d-flex align-items-center justify-content-center"
                          style={{ width: 160, height: 160 }}
                        >
                          {avatarUrl ? (
                            <Image
                              src={avatarUrl}
                              alt="avatar"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <Person size={64} className="text-secondary" />
                          )}
                        </div>

                        <Form.Label className="btn btn-outline-secondary mt-3 mb-1">
                          Chọn Ảnh
                          <Form.Control
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={onAvatarChange}
                            hidden
                          />
                        </Form.Label>

                        {error && (
                          <div className="text-danger small">{error}</div>
                        )}
                        <div className="text-muted small">
                          <div>Dung lượng file tối đa 1 MB</div>
                          <div>Định dạng: JPEG, PNG</div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="dark"
          show={!!toast}
          onClose={() => setToast("")}
          delay={1500}
          autohide
        >
          <Toast.Body className="text-white">{toast}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default AccountProfilePage;
