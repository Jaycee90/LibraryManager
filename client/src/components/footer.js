import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import '../css/footer.css';

export default function Footer() {
    return (
        <div className="footer-component">
            
		<div className="Box">
			<h1 style={{textAlign: "center",paddingBottom: "20px"}}>Unlock worlds at Jayce's Library, your gateway to knowledge and inspiration!</h1>
			<div className="FooterContainer">
				<div className="Row">
					<div className="Column">
						<p className="Heading">Leave Us a Message </p>
                        <form className="media-centered">
                        <button type="submit" className="btn btn-primary" style={{fontSize:'12px', backgroundColor: "#e24e99 ", borderRadius:'15px',}}>Leave us a message</button>
                        </form>
					</div>

					<div className="Column">
						<p className="Heading">About Us</p>
						<a href="/" className="FooterLink">Our vision</a>
						<a href="/" className="FooterLink">Help & FAQ</a>
					</div>

					<div className="Column">
						<p className="Heading">Contact</p>
						<a href="/" className="FooterLink">
                        <FontAwesomeIcon icon={faPhone} size="1x" style={{paddingRight:'5px'}}/>Phone: (512) 771-1378</a>
						<a href="/" className="FooterLink">
                        <FontAwesomeIcon icon={faEnvelope} size="1x" style={{paddingRight:'5px'}}/>Email: jnn56@txstate.edu</a>
					</div>

					<div className="Column">
						<p className="Heading">Rate our Service</p>
						<a href="/" className="FooterLink">Leave a Review</a>
					</div>
				</div>
			</div>
            <p className="Disclaimer">&copy; 2023 Jayce Turambe. All Rights Reserved.</p>
            <p className='FootDis'><small>Why did the web developer stay calm during the project? Because he knew how to handle exceptions!</small>
            <small>Did you know that the first computer bug was a literal bug? In 1947, a moth caused a computer malfunction!</small></p>
		</div>
        </div>
	);
}
