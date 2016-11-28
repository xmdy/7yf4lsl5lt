import React, {Component} from 'react';
import request from 'superagent';
function clog(i) {
    console.log(i);
}

const config = {
    listUrl: 'http://localhost:8000/files/list/'
};

class FilesListRow extends Component {
    render(){
        return (
            <tr key={this.props.file.id}>
                <td>{this.props.file.id}</td>
                <td>{this.props.file.created}</td>
                <td>{this.props.file.name}</td>
                <td>{this.props.file.size}</td>
                <td>{this.props.file.hash}</td>
            </tr>
        )
    }
}

class FilesListHeader extends Component {
    render(){
        return (
            <tr>
                <th>#</th>
                <th>DT</th>
                <th>Name</th>
                <th>size</th>
                <th>###</th>
            </tr>
        )
    }
}

class FilesList extends Component {
    files(){
        const files = this.props.files || [];
        clog(files);
        return files.map((f) => {
            return <FilesListRow file={f} />
        })
    }
    render(){
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <FilesListHeader />
                    </thead>
                    <tbody>
                        {this.files()}
                    </tbody>
                </table>
            </div>
        );
    }
}

class FilesListApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            files: []
        }
    }

    componentDidMount(){
        this.loadFiles();
    }

    loadFiles(){
        request
            .get(config.listUrl)
            .set('Accept', 'application/json')
            .end((err, res) => {
            if(res.ok){
                const result = res.body;
                this.setState({
                    files: result.files
                });
            }
        })
    }

    render() {
        return (
            <FilesList files={this.state.files} />
        );
    }
}

export default FilesListApp;
