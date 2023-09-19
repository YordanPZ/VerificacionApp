import { useEffect, useState } from 'react'
import axios from '../../../utils/axios'
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import LoggedUserCard from '../../components/LoggedUserCard/LoggedUserCard.component';

const AllUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/users')
      .then(res => setUsers(res.data));
  }, []);

  return (
    <div>

      <LoggedUserCard />

      <h3 className="mt-5">Other users</h3>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {users.map((user) => (
          <Col key={user.id}>
            <Card>
              <Card.Img variant="top" src={user.image} style={{ objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>{user.email}</ListGroup.Item>
                  <ListGroup.Item>{user.country}</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default AllUsers