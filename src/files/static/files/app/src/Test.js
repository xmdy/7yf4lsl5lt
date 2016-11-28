import React, {Component} from 'react';
function clog(i) {
    console.log(i);
}

class TestApp extends Component {
    render() {
        return (
            <div>
                {JSON.stringify(window.uploadedFiles)}
            </div>
        );
    }
}

export default TestApp;
