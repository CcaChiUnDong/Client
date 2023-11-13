import React, { Component } from 'react';

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <footer className="footer">
                    <span className="text-muted">start 2023.10.25 </span>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;