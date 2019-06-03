import React from 'react';
import { Link } from 'react-router-dom';
import NotebookIndexContainer from './notebooks/NotebookIndexContainer';
import NotesIndexContainer from './notes/NotesIndexContainer';
import { ProtectRoute } from '../../util/route_util';


class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: false }
        this.toggleClass = this.toggleClass.bind(this);
    }

    toggleClass () {
        this.setState({ active: !this.state.active })
    }

    render () {


        return (
            <div className="main-content-container">
                <section className="main-left-menu">
                    <div onClick={this.toggleClass} className="user-dropdown">{this.props.user.email}</div>
                    <ul className={this.state.active ? "dropdown-shown" : "dropdown-hidden"}>
                        <li>
                            <h3>Account</h3>
                            <h2>{this.props.user.email}</h2>
                        </li>
                        <li><p>Settings</p></li>
                        <li><p>Help</p></li>
                        <li><p>What's new in Endeavornote</p></li>
                        <li onClick={this.props.logout}><p>Sign Out {this.props.user.email}</p></li>
                    </ul>
                    <div className="new-note-button"><i className="fas fa-plus-circle fa-2x"></i>New Note</div>
                    <ul className="main-left-links">
                        <li><Link to="/main/notes">All Notes</Link></li>
                        <li><Link to="/main/notebooks">Notebooks</Link></li>
                        <li>Tags</li>
                        <li>Trash</li>
                    </ul>
                </section>

                    {/* <NotebookIndex user={this.props.user} retreiveNotebooks={this.props.retreiveNotebooks} notebooks={this.props.notebooks}/> */}
               
                <ProtectRoute path='/main/notebooks' component={NotebookIndexContainer} />
                <ProtectRoute path='/main/notes' component={NotesIndexContainer} />


                <section className="main-third-panel">

                </section>
            </div>
        )
    }
}

export default MainContent;