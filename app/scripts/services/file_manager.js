import Session from 'scripts/services/session';

export default class FileManager {
  constructor() {
    this.fileReader = new FileReader();
    this.fileTransfer = new FileTransfer();
    this.fileUploaderOptions = new FileUploadOptions();
    this.handlers();
  }

  handlers() {
    this.fileReader.onload = function(event) {
      console.log(event.target.result);
    };
    this.fileReader.onload = function(event) {
      console.error(event.target.error.code);
    };
  }

  setFileUploadOptions(options) {
    _.extend(this.fileUploaderOptions, options);

    if (options.headers) {
      this.fileUploaderOptions.headers.Authorization = `Token token=${Session.token}`;
    }
    else {
      this.fileUploaderOptions.headers = {
        Authorization: `Token token=${Session.token}`
      };
    }
  }

  fileUpload(fileURI, url, options, successCallback, errorCallback) {
    this.setFileUploadOptions(options);
    this.fileTransfer.upload(
      fileURI,
      url,
      successCallback,
      errorCallback,
      this.fileUploaderOptions
    );
  }

  fileDownload(fileURI, url, options, successCallback, errorCallback) {
    this.fileTransfer.download(
      url,
      fileURI,
      successCallback,
      errorCallback,
      false,
      options
    );
  }

  static exist() {
    if (FileReader && FileTransfer && FileUploadOptions) return true;
  }
}
