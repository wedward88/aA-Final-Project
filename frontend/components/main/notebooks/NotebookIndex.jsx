import React from 'react';
import NotebookFormContainer from './NotebookFormContainer';

class NotebookIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            mounted: false, 
            modalOpen: false, 
            active: 0,
            rowOpen: 0, 
            formType: "newNotebook", 
            currentNotebook: null 
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.removeClass = this.removeClass.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.toggleRow = this.toggleRow.bind(this);
    }
    
    componentDidMount() {
        this.props.retrieveNotebooks(this.props.user).then(
            this.props.retrieveNotes(this.props.user).then(
                this.setState({ mounted: true })
            ));   
    }

    toggleModal(formTypeText, notebook) {
    
        if (formTypeText === 'editForm') {
            this.setState({ 
                ['formType']: formTypeText, 
                ['modalOpen']: !this.state.modalOpen, 
                ['currentNotebook']: notebook,
                ['active']: 0
            });
        } else {
            this.setState({ 
                ['formType']: 'newNotebook', 
                ['modalOpen']: !this.state.modalOpen, 
                ['currentNotebook']: null,
                ['active']: 0
            });
        }
    }

    closeModal() {
        this.setState({ ['modalOpen']: false })
    }

    removeClass() {
        this.setState({ ['active']: 0 })
    }

    addClass(id) {
        this.setState({ ['active']: id})
    }
    
    toggleRow(id) {
        if (id === this.state.rowOpen) {
            this.setState({ ['rowOpen']: 0 })
        } else {
            this.setState({ ['rowOpen']: id })
        }
    }

    render () {
        
        let tableData;
        let modalForm;

        if (this.state.mounted) {
            let notesArr = this.props.notes;
            
            tableData = this.props.notebooks.map((notebook)=> {
                let noteCount = 0
                let notebookNotes = notesArr.map((note)=>{
                    if (note.notebook_id === notebook.id){
                        noteCount += 1;
                        return (
                            <div className={this.state.rowOpen === notebook.id ? "notebook-notes-row notebook-table-row" : "notebook-notes-row-hide"} 
                                key={note.id} 
                                id={`notes-row-${note.id}`}
                            >
                                <div className="notebook-table-data notes-data notes-title">{note.title.length < 40 ? note.title : note.title.substring(0, 37) + "..."}</div>
                                <div className="notebook-table-data notes-data">{this.props.user.email}</div>
                                <div className="notebook-table-data notes-data">{note.updated_at}</div>
                                <div className="notebook-table-data notes-data"></div>
                            </div>
                        ) 
                    }
                })
    
                return (
                        <div className="notebook-table-row-container" key={notebook.id}>
                            <div className="notebook-table-row">
                            <div onClick={() => this.toggleRow(notebook.id)} className="notebook-table-data notebook-title">
                                <h3>{notebook.name.length < 40 ? notebook.name : notebook.name.substring(0, 37) + "..."}</h3>
                                <p className="noteCount">&nbsp;({noteCount})</p>
                                </div>
                                <div className="notebook-table-data">{this.props.user.email}</div>
                                <div className="notebook-table-data">{notebook.updated_at}</div>
                                <div className="notebook-table-action-item notebook-table-data">
                                <div tabIndex="1" 
                                    onBlur={() => this.removeClass(notebook.id)} 
                                    onFocus={() => this.addClass(notebook.id)} 
                                    className="notebook-table-actions notebook-table-data" 
                                >...
                                    <ul className={this.state.active === notebook.id ? "notebook-actions-show" : "notebook-actions-hidden"}>
                                        <li onClick={()=>this.toggleModal('editForm', notebook)}>Rename Notebook</li>
                                        <li onClick={()=> this.props.deleteNotebook(notebook)}>Delete Notebook</li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            { notebookNotes }
                        </div>
                        
                )
            });
        }

        if (this.state.modalOpen) {
            modalForm = <NotebookFormContainer 
                            formType={this.state.formType} 
                            closeModal={this.closeModal} 
                            toggleModal={this.toggleModal} 
                            currentNotebook={this.state.currentNotebook}
                        />
        }

        return (
            <section className="notebooks-index" >
                {modalForm}
                <h1>Notebooks</h1>

                <div className="index-sub-header">
                    <h2>My notebook list</h2>
                    <h2 onClick={this.toggleModal}>New Notebook</h2>
                </div>
                
                <div className="notebook-table">
                    <div className="notebook-table-row">
                        <div className="notebook-table-header">Title</div>
                        <div className="notebook-table-header">Created By</div>
                        <div className="notebook-table-header">Updated</div>
                        <div className="notebook-table-header">Actions</div>
                    </div>
                    <div className="notebook-table-body">
                        {tableData}
                    </div>
                    
                </div>
            </section>
        )
    }
}

export default NotebookIndex;