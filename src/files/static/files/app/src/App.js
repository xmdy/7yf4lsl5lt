import React, {Component} from 'react';
import request from 'superagent';
import './App.css';
function clog(i) {
    console.log(i);
}
const styles = {
    progressBar: {
        width: '0%',
    }
};

const config = {
    uploadUrl: 'http://localhost:8000/files/upload/'
};

class Button extends Component {
    render() {
        const type = this.props.type || 'default';
        const href = this.props.href ? this.props.href : '#';
        return (
            <a className={'btn btn-' + type} href={href} onClick={this.props.onClick}>{this.props.text}</a>
        );
    }
}

class ProgressBar extends Component {
    render() {
        return (
            <div className="progress">
                <div
                    className={'progress-bar progress-bar-' + this.props.type + (this.props.progress < 100 ? ' progress-bar-striped active' : '')}
                    role="progressbar" aria-valuenow={this.props.progress} aria-valuemin="0" aria-valuemax="100"
                    style={{width: this.props.progress + '%'}}>
                    <span className="sr-only">{this.props.progress}% Complete</span>
                </div>
            </div>
        );
    }
}

class FileItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            hasError: false,
            error: '',
            uploading: false,
            file: null
        };
        this.onChange = this.onChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
    }

    componentDidMount() {
        if (this.props.file) {
            this.setState({
                file: this.props.file
            }, this.handleUpload);
        }
    }

    onChange(e) {
        e.preventDefault();
        const droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        this.setState({file: droppedFiles[0]}, this.handleUpload);
    }

    handleProgress(e) {
        this.setState({
            progress: e.percent
        });
    }

    handleUpload() {
        this.setState({
            uploading: true
        });
        const file = this.state.file;
        request
            .post(config.uploadUrl)
            .set('Accept', 'application/json')
            .field('mtime', file.lastModified)
            .field('size', file.size)
            .field('name', file.name)
            .attach('file', file)
            .on('progress', this.handleProgress)
            .end((err, res) => {
                if (res.ok) {
                    const result = res.body;
                    if (result.status && result.status == 'ok') {
                        if (this.props.onUploadComplete) {
                            this.props.onUploadComplete(result.file);
                        }
                    } else {
                        this.setState({
                            hasError: true
                        });
                    }
                } else {
                    this.setState({
                        hasError: true
                    });
                }
            });
    }

    render() {
        const progressBarType = this.state.hasError ? 'danger' : 'success';
        return (
            <div className="b-file-item">
                {!this.state.uploading && <input type="file" onChange={this.onChange}/>}
                {this.state.uploading && <span>{this.state.file.name}</span>}
                {this.state.uploading && <ProgressBar progress={this.state.progress} type={progressBarType}/>}
                {this.props.children}
            </div>
        );
    }
}

class DropUpload extends Component {
    constructor(props) {
        super(props);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.state = {
            files: []
        };
        window.uploadedFiles = []; // save state global
    }

    componentDidMount() {
        this.files = [];
        this.handleAddFile();
    }

    fileList() {
        return this.state.files.map((file) => {
            return <li key={file.key}>{file.file}</li>
        });
    }

    createFileItem(key, file) {
        return (
            <FileItem onChange={this.onDrop} onUploadComplete={this.onUploadComplete} file={file}>
                <Button onClick={this.handleAddFile.bind(this)} type={'default btn-xs'} text="+"/>
                <Button onClick={() => this.handleRemoveFile(key)} type={'default btn-xs'} text="-"/>
            </FileItem>
        );
    }

    handleAddFile(file) {
        const key = Math.random();
        const fileItem = this.createFileItem(key, file);
        this.files.push({key: key, file: fileItem});
        this.setState({files: this.files});
        return fileItem;
    }

    handleRemoveFile(key) {
        if (this.files.length == 1) {
            return;
        }
        this.files = this.files.filter((fileRow) => {
            return fileRow.key != key;
        });
        this.setState({
            files: this.files
        });
    }

    onDragStart(e) {
    }

    onDragEnter(e) {
        this.setState({
            stateClass: 'm-drag-enter'
        });
    }

    onDragOver(e) {
        e.preventDefault();
        this.setState({
            stateClass: 'm-drag-enter'
        });
    }

    onDragLeave(e) {
        this.setState({
            stateClass: ''
        });
    }

    onDrop(e) {
        e.preventDefault();
        this.setState({
            stateClass: ''
        });
        const droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        for (let i = 0; i < droppedFiles.length; i++) {
            const file = droppedFiles[i];
            this.handleAddFile(file);
        }
    }

    onUploadComplete(data) {
        clog(data);
        window.uploadedFiles.push(data);
    }

    onTestClick(){
        document.location.hash = '/test/'
    }

    render() {
        const classesList = [];
        classesList.push(this.state.stateClass || '');
        const classes = classesList.join(' ');
        return (
            <div
                onDragStart={this.onDragStart}
                onDragEnter={this.onDragEnter}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                className={'b-dropzone ' + classes}>
                <h2>Drop files here</h2>
                <ul className={'b-filelist'}>
                    {this.fileList()}
                </ul>
                <Button text="Test" type="info" href="/#/test/" onClick={()=>{}} />
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (<DropUpload></DropUpload>);
    }
}

export default App;
