import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import './LoggedUserCard.styles.css';

const LoggedUserCard = () => {

    const { user: loggedUser } = useSelector(state => state.auth);
    const [flag, setFlag] = useState("");

    useEffect(() => {
        const country = loggedUser?.country;
        axios.get(`https://restcountries.com/v3.1/name/${country}`)
            .then(res => setFlag(res.data[0].flags.svg))
    })

    return (
        <Card className="logged-user-card">
            <Card.Body>
                <h1 className="mb-4">Logged user</h1>
                <div className="d-flex gap-5">
                    <img src={loggedUser?.image} alt="" className='user-image' />
                    <div>
                        <h3>{loggedUser?.firstName} {loggedUser?.lastName}</h3>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <b>Email: </b>{loggedUser?.email}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <b>Country: </b>{loggedUser?.country} 
                                <img src={flag} alt="" style={{width: '30px'}}/>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default LoggedUserCard;