import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import faaLogo from "./faa-logo.png"

export default function Footer(){

    return(
        <Container fluid style={{backgroundColor:"#F5F5F5",padding: '10px 10px'}}>
           <Row style={{ 
            backgroundColor: "#002663", 
            background: "linear-gradient(180deg, #002663 0%, #000933 100%)", 
            padding: '5px 5px',
            borderRadius: 15, 
            color: "#ffffff",
            fontSize: 10,
            // lineHeight: '30px',
            fontWeight: 'bold',
        }}>
            <Col xs="auto" style={{margin:"auto 0px"}}>
                <img
                    src={faaLogo}
                    alt="Federal Aviation Administration"
                    style={{height:"30%", width:"50%"}}
                />
            </Col>
            <Col xs={2} style={{}}>
                <h5>Federal Aviation Administration</h5>
            </Col>
        </Row>
        </Container>
    );
    
}