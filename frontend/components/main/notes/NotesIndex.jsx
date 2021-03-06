import React from 'react';
import formatDate from '../../../util/date_util';
import { Link } from 'react-router-dom';


class NotesIndex extends React.Component {
    constructor(props){
        super(props);
        this.state = { mounted: false }
    }

    componentDidMount () {
        this.props.retrieveNotes(this.props.user).then(()=> {
            this.props.retrieveTags().then(()=> {
                this.props.retrieveTaggings().then(()=> {
                    this.setState({ mounted: true });
                })
            });
        });   
    }


    render () {
        // debugger
        let allNotes;
        let linkToPath;
        let numNotes = 0;
        let tagFilter;
        // debugger

        if (this.state.mounted) {
            if (this.props.match.params.tagMatch) tagFilter = 
            <div id="tag-filter">
                <h3 >{this.props.match.params.tagMatch}</h3>
                &nbsp;
                &nbsp;
                <Link to="/main/notes/all">x</Link>
            </div>
            

            allNotes = this.props.notes.map((note)=>{
                // debugger
                if (note) {
                    numNotes += 1;

                    if (this.props.match.params.notebookId && this.props.match.params.noteId) {
                        // debugger
                        linkToPath = `/main/notes/all/${note.notebook_id}/${note.id}`
                    } else if (this.props.match.params.notebookId) {
                        linkToPath = `${this.props.match.url}` + `/${note.id}`
                    } else if (this.props.match.params.tagMatch) {
                        linkToPath = `/main/notebooks/${note.notebook_id}/${note.id}`
                    } else {
                        linkToPath = `${this.props.match.url}` + `/${note.notebook_id}` + `/${note.id}`
                    }



                return( 
                    <li key={note.id}>
                        <Link to={linkToPath}>
                            <h2>{note.title}</h2>
                            <p>{note.body.replace(/(<([^>]+)>)/ig, "")} ...</p>
                            <div>{formatDate(note.updated_at)}</div>
                        </Link>
                    </li>
                )
                }
            })
            
        }
        

        
        return (
            <div className="notes-index-container">
                <div className="notes-index-header">
                    <h1>All Notes</h1>
                    <div className="notes-info">
                        <h3>{numNotes} notes</h3>
                        {tagFilter}
                    </div>
                </div>
                <div className="notes-index-list-container">
                    <ul>
                        {allNotes}
                    </ul>
                </div>
            </div>
        )
    }
}

export default NotesIndex;