const UrlReader = {
  /**
   * Read an MPEG-4 file by url and pass it to callback as ArrayBuffer
   *
   * @param url target url
   * @param callback handler function to pass received data to
   */
  read: function(url, callback) {
    const oReq = new XMLHttpRequest();
    oReq.open('GET', url, true);
    oReq.responseType = 'arraybuffer';

    oReq.onload = function (oEvent) {
      const arrayBuffer = oReq.response;
      callback(arrayBuffer);
    };

    oReq.send();
  }
};

export default UrlReader;
