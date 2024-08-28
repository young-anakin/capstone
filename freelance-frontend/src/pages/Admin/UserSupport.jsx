import React from 'react';
import SystemFeedbacks from '../../components/SystemFeedback';
import HelpReqeuest from '../../components/HelpRequests';


function UserSupport() {
  return (
        <div style={{marginLeft: '50px'}}>
            <h2 style={{ textAlign: 'center', margintop: '50px' }}>Help Requests</h2>
                <div style={{ display: 'flex'}}>
                    <HelpReqeuest/>
                    <HelpReqeuest/>
                    <HelpReqeuest/>
                    <HelpReqeuest/>
                </div>
                <div style={{ display: 'flex'}}>
                    <HelpReqeuest/>
                    <HelpReqeuest/>
                    <HelpReqeuest/>
                    <HelpReqeuest/>
                </div>
            <h2 style={{ textAlign: 'center', margintop: '50px' }}>Reviews and Comments to the System</h2>
            <div style={{ display: 'flex'}}>
                <SystemFeedbacks />
                <SystemFeedbacks />
                <SystemFeedbacks />
                <SystemFeedbacks />
            </div>
            <div style={{ display: 'flex'}}>
                <SystemFeedbacks />
                <SystemFeedbacks />
                <SystemFeedbacks />
                <SystemFeedbacks />
            </div>
        </div>
  );
}

export default UserSupport;
