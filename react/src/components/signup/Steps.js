
import React from 'react';

const Steps = ({currentstep}) => {
    return (

        <div className="step-container">
            <div className={currentstep===0?"step-item active":"step-item"}>
                AccountInfo
                    </div>
            <div className={currentstep===1?"step-item active":"step-item"}>
                PersonalInfo
                    </div>
            <div className={currentstep===2?"step-item active":"step-item"}>
                Identity
                    </div>
            <div className={currentstep===3?"step-item active":"step-item"}>
                Nominee
                    </div>
            <div className={currentstep===4?"step-item active":"step-item"}>
                Review
                    </div>
        </div>

    );
}

export default Steps;
