
import { Toast } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import './Notification.styles.css';
import { closeNotification } from './notificationSlice';

const Notification = () => {

    const { show, variant, message, header } = useSelector(state => state.notification);

    const dispatch = useDispatch();

    const close = () => dispatch(closeNotification())


    return (
        <div className="notification-container">
            <Toast
                show={show}
                onClose={close}
                delay={3000}
                autohide
                bg={variant}

            >
                {header && (
                    <Toast.Header>
                        <strong className="me-auto">{header}</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                )}
                <Toast.Body>
                    <strong className="me-auto block">{message}</strong>
                </Toast.Body>
            </Toast>
        </div>
    )
}

export default Notification