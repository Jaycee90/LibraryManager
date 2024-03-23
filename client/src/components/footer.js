import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import '../css/footer.css';

export default function Footer() {
    return (
        <div className="footer-wrapper"> {/* Add a wrapper div */}
            <div className="footer-container">
                
                <h1>Unlock worlds at Jayce's Library, your gateway to knowledge and inspiration!</h1>
                <div className="FooterContainer footer-content"> {/* Add footer-content class */}
                    <div className="FooterItem">
                        <p className="Heading">Leave Us a Message</p>
                        <form>
                            <button type="submit" className="btn btn-primary">Leave us a message</button>
                        </form>
                    </div>

                    <div className="FooterItem">
                        <p className="Heading">Contact</p>
                        <a href="/" className="FooterLink">
                            <FontAwesomeIcon icon={faPhone} style={{ marginRight: '5px' }} />Phone: (512) 771-1378</a>
                        <a href="/" className="FooterLink">
                            <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '5px' }} />Email: jnn56@txstate.edu</a>
                    </div>
                </div>
                
                <p className="Disclaimer">&copy; 2023 Jayce Turambe. All Rights Reserved.</p>
                <p className='FootDis'><small>Why did the web developer stay calm during the project? Because he knew how to handle exceptions!</small>
                    <small>Did you know that the first computer bug was a literal bug? In 1947, a moth caused a computer malfunction!</small></p>
            </div>
        </div>
    );
}
