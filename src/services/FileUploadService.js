class FileUploadServiceClass {
  constructor() {
    this.fileReader = new FileReader();
    this.result = {};
    this.isError = false;
    this.isLoaded = false;
    this.onFileChange = this.onFileChange.bind(this);
    this.getFile = this.getFile.bind(this);
    // register FilerReader onload method
    this.fileReader.onload = this.onLoad.bind(this);
    this.fileReader.onerror = this.onError.bind(this);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileReader.readAsText(event.target.files[0]);
    }
  }

  onError(event) {
    console.log('File reader error:', event);
  }

  onLoad(event) {
    if (event.target.result === undefined) {
      this.isError = true;
      return;
    }

    this.isLoaded = true;
    this.result = JSON.parse(event.target.result);
  }

  getFile() {
    return this.result;
  }
}

const FileUploadService = new FileUploadServiceClass();

export { FileUploadService };
