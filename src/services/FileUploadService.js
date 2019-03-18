class FileUploadServiceClass {
  constructor() {
    this.reader = new FileReader();
    this.result = {};
    this.onFileChange = this.onFileChange.bind(this);
    this.getFile = this.getFile.bind(this);
    // register FilerReader onload method
    this.reader.onload = this.onLoad.bind(this);
  }

  onFileChange(event) {
    this.reader.readAsText(event.target.files[0]);
  }

  onLoad(event) {
    this.result = event.target.result;
  }

  getFile() {
    return this.result;
  }
}

const FileUploadService = new FileUploadServiceClass();

export { FileUploadService };
