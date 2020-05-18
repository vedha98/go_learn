import React from 'react';

const Review = (props) => {
    return (
        <div className="form">
       <div className="form-input review-item review-image">
            <img width="100px" height="100px" src={props.imagePreviewUrl}></img>
        </div>
        <div className="form-input review-item">
            <div className="review-header">first name</div>
             <div className="review-desc">{props.firstname}</div>
        </div>
        <div className="form-input review-item">
            <div className="review-header">last name</div>
             <div className="review-desc">{props.lastname}</div>
        </div>
        <div className="form-input review-item">
            <div className="review-header">email</div>
             <div className="review-desc">{props.email}</div>
        </div>
        <div className="form-input review-item">
            <div className="review-header">Date of Birth</div>
             <div className="review-desc">{props.dob}</div>
        </div>
        <div className="form-input review-item">
            <div className="review-header">phone number</div>
             <div className="review-desc">{props.phone}</div>
        </div>
        <div className="form-input review-item">
            <div className="review-header">PAN number</div>
             <div className="review-desc">{props.panNo}</div>
        </div>
        <div className="form-input review-item">
            <div className="review-header">AADHAR number</div>
             <div className="review-desc">{props.aadharNo}</div>
        </div>
        <div className="form-input review-item">
            <div className="review-header">nominee first name</div>
             <div className="review-desc">{props.nfirstname}</div>
        </div>
        <div className="form-input review-item">
            <div className="review-header">nominee last name</div>
             <div className="review-desc">{props.nlastname}</div>
        </div>
        <div className="form-input review-item">
            <div className="review-header">nominee dob</div>
             <div className="review-desc">{props.ndob}</div>
        </div>
        <div className="form-action">
                    <button className="step-button" onClick={props.prevStep}>Prev Step</button>
                    <button className="step-button" onClick={props.nextStep}>Submit</button>
                </div>
    </div>
    );
}

export default Review;
