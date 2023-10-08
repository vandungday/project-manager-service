import * as fs from 'fs';
import tmp from 'tmpfile';

export const unlink = (path: string, clean = false) => {
  if (!clean) return true;

  return new Promise((resolve, reject) => {
    fs.unlink(path, (error: any) => {
      if (error) return reject(error);
      console.log(`File ${path} deleted!`);

      resolve(true);
    });
  });
};

export const createTmpPath = () => tmp();

export const existsFile = (filePath: string) => {
  return fs.existsSync(filePath);
};

export const getFileSize = (path: string) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (error: any, result: any) => {
      return error ? reject(error) : resolve(result.size / 1024 / 1024); // MB
    });
  });
};

export const getFileInfo = (path: string) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (error: any, result: any) => {
      return error ? reject(error) : resolve(result);
    });
  });
};
