import { Outlet } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar.component'
import { Container } from 'react-bootstrap'


const UsersLayout = () => {
  return (
    <div>
      <NavBar />

      <Container className="py-5" >
          <Outlet />
      </Container>
    </div>
  )
}

export default UsersLayout