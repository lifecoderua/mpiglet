const UrlReader = {
  /**
   * Read an MPEG-4 file by url and pass it to callback as ArrayBuffer
   *
   * @param url target url
   * @param callback handler function to pass received data to
   */
  read: function(url, callback) {
    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'arraybuffer';

    req.onload = function (event) {
      if (req.status !== 200) {
        throw new Error('Media load failed for url ' + url);
      }

      console.log('Succesfully loaded file %s', url);
      const arrayBuffer = req.response;
      callback(arrayBuffer);
    };

    req.send();
  }
};

export default UrlReader;
