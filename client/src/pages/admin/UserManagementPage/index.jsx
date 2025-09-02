import React, { useState } from 'react';
import { Table, Button, Badge, Card, Row, Col, Form, Image } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { mockUsers } from '../../../data/mockData';

const UserManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayCount, setDisplayCount] = useState(5);

  const filteredUsers = mockUsers
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, displayCount);

  return (
    <Row>
      <Col xs={12}>
        <Card className="card-custom">
          <Card.Header>
            <Card.Title as="h4" className="mb-0">Quản lý người dùng</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <div className="input-group">
                    <Form.Control 
                      type="text" 
                      placeholder="Tìm theo tên hoặc email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="outline-secondary">
                      <FaSearch />
                    </Button>
                  </div>
                </Form.Group>
              </Col>
              <Col md={4} className="d-flex align-items-center">
                <Form.Label className="me-2 mb-0">Hiển thị</Form.Label>
                <Form.Select 
                  style={{ width: '80px' }}
                  value={displayCount}
                  onChange={(e) => setDisplayCount(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={mockUsers.length}>Tất cả</option>
                </Form.Select>
              </Col>
              <Col md={4} className="text-md-end">
                <Button variant="primary">
                  <FaPlus className="me-2" /> Thêm người dùng
                </Button>
              </Col>
            </Row>

            <Table striped bordered hover responsive className="table-custom align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  {/* ✨ THUỘC TÍNH MỚI ✨ */}
                  <th>Người dùng</th>
                  <th>Giới tính</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Vai trò</th>
                  <th>Ngày tham gia</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    {/* ✨ THUỘC TÍNH MỚI: Hiển thị ảnh, tên và email */}
                    <td>
                      <div className="d-flex align-items-center">
                        <Image src={user.avatar} roundedCircle width="40" height="40" className="me-3" />
                        <div>
                          <strong>{user.name}</strong>
                          <div className="text-muted">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.gender}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>
                      <Badge bg={user.role === 'Admin' ? 'info' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td>{user.joinDate}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2 btn-icon"><FaEdit /></Button>
                      <Button variant="danger" size="sm" className="btn-icon"><FaTrash /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default UserManagementPage;