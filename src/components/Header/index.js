import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./index.css"
import { getUserEmail } from "../../store/selectors/authSelector";

const topHeader={
    backgroundColor:"#0076CE", 
    padding:"5px 10px",
    // width:"100%",
    color:"white",
    fontFamily:'"Helvetica Neue", Arial, sans-serif',
    fontSize:"1rem"}
    
const middleHeader={
    // backgroundColor:"red",
    padding:"15px 0px",
    fontFamily:'"Helvetica Neue", Arial, sans-serif',
}

const lowerHeader = {
    //"#FAF9F6"
    backgroundColor:"#F5F5F5", 
    padding:"10px 10px",
    fontFamily:'"Helvetica Neue", Arial, sans-serif',
}

export default function Header(){
    //const userEmail = getUserEmail();
    //console.log('userEmail: ' + userEmail);
    return (<Container fluid className="position-sticky">
        <Row >
            <span style={topHeader}>
                My<strong>FAA</strong>
            </span>
        </Row>
        <Row className="justify-content-end" style={middleHeader}>
            <Col >
                <h4 style={{color:"darkblue"}}>TRUST</h4>
            </Col>
            <Col style={{}}>
                Welcome Srikanth
            </Col>
        </Row>
        <Row className="justify-content-around" style={lowerHeader}>
           <Col><a href="#" >Reports</a></Col>
           <Col><a href="#">Account Administration</a></Col>
           <Col><a href="#">User Administration</a></Col>
           <Col><a href="#">Check for token</a></Col>
        </Row>
    </Container>);

}