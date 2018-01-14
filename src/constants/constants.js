import md5 from 'crypto-js/md5';

export const BASE_URL = 'https://gateway.marvel.com/';
export const AUTH_TOKEN = '6e503650cf3fde107a4a02415bbbcd37';
export const PRIVATE_TOKEN = 'f5cd80690d8e76d5136d647060fc846223f94762';
export const TS = Date.now();
export const HASH = md5(TS+PRIVATE_TOKEN+AUTH_TOKEN);
export const RESULTS_PER_PAGE = 12;