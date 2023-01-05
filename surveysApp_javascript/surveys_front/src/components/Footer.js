import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

const Footer = () => {
    return (
        <Card bg="light" variant="dark" className="fixed-bottom">
            <Card.Body className="mx-1">
                <Card.Title style={{ fontSize: 15}}>SurveysApp!</Card.Title>
                <Card.Text style={{ fontSize: 10}}>
                    © 2022 Copyright: Liisa Törmäkangas & Tuomo Kurikka
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
export default Footer;