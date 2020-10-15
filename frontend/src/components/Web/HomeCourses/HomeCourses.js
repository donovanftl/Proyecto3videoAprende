import React from 'react';
import { Row, Col, Card, Button } from 'antd';

import "./HomeCourses.scss"

export default function HomeCourses() {
  return (
   export default function HomeCourses() {
    return (
      <Row className="home-courses">
        <Col lg={24} className="home-courses__title">
          <h2>Aprende y mejora tus habilidades</h2>
        </Col>
        <Col lg={4} />
        <Col lg={16}>
          <Row className="row-courses">
            <Col md={6}>
              <CardCourse
              />
            </Col>
            <Col md={6}>
              <CardCourse
              />
            </Col>
            <Col md={6}>
              <CardCourse
              />
            </Col>
            <Col md={6}>
              <CardCourse
              />
            </Col>
          </Row>
          <Row className="row-courses">
            <Col md={6}>
              <CardCourse
              />
            </Col>
            <Col md={6} />
            <Col md={6} />
            <Col md={6}>
              <CardCourse
              />
            </Col>
          </Row>
        </Col>
        <Col lg={4} />
        <Col lg={24} className="home-courses__more">
          <Link to="/courses">
            <Button>Ver más</Button>
          </Link>
        </Col>
      </Row>
    );
  }
  
  function CardCourse(props) {
    const { image, title, subtitle, link } = props;
    const { Meta } = Card;
  
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <Card
          className="home-courses__card"
          cover={<img src={image} alt={title} />}
          actions={[<Button>INGRESAR</Button>]}
        >
          <Meta title={title} description={subtitle} />
        </Card>
      </a>
    );
  }
   
  );
}
