class FileUploadServiceClass {
  constructor() {
    this.reader = new FileReader();
    this.onFileChange = this.onFileChange.bind(this);
    // register FilerReader onload method 
    this.reader.onload = this.onLoad.bind(this);
  }

  onFileChange(event) {
    this.reader.readAsText(event.target.files[0]);
  }

  onLoad(event) {
    console.log(JSON.parse(event.target.result));
  }
}

const FileUploadService = new FileUploadServiceClass();

export { FileUploadService };