import Parser from './parser/parser';
import UrlReader from "./reader/url-reader";
import render from "./view/render";

const url = '/text0.mp4';

console.log('* MPiglet started');

function onArrayBufferReady(buffer) {
  const boxes = Parser.parse(buffer);

  render(boxes);
}

UrlReader.read(url, onArrayBufferReady);
