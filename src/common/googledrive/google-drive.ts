import { google } from 'googleapis';
import * as path from 'path';
import { unlink } from '../helpers/file';
import * as fs from 'fs';

const KEY_FILE_PATH = path.join(__dirname, 'google-service-account.json');

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const serviceAccountAuth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: SCOPES,
});

const drive = google.drive({
  version: 'v3',
  auth: serviceAccountAuth,
});

export const getClient = () => drive;

export const getFileId = (url: string) => {
  if (url.includes('drive.google.com/uc?')) {
    try {
      const urlObj = new URL(url);
      return urlObj.searchParams.get('id') || null;
    } catch (e) {
      return null;
    }
  }

  const patterns = [
    /drive\.google\.com\/open\?id=([^\/]+)/gi,
    /drive\.google\.com\/file\/d\/([^\/]+)\//gi,
  ];

  for (let i = 0; i < patterns.length; i++) {
    const parsed = patterns[i].exec(url);

    if (parsed && parsed.length === 2 && parsed[1]) {
      return parsed[1];
    }
  }

  return null;
};

export const getDownloadableLink = (fileId: string) => {
  return `https://drive.google.com/uc?id=${fileId}&export=download`;
};

// upload file to google drive
export const upload = async (file: Express.Multer.File, folderId: string) => {
  const { originalname, mimetype, path } = file;
  console.log('🚀 ~ file: google-drive.ts:7 ~ KEY_FILE_PATH:', KEY_FILE_PATH);

  const response = await drive.files.create({
    requestBody: {
      name: originalname,
      mimeType: mimetype,
      parents: folderId ? [folderId] : [],
    },
    media: {
      mimeType: mimetype,
      body: fs.createReadStream(path),
    },
  });
  console.log('🚀 ~ file: google-drive.ts:93 ~ upload ~ response:', response);

  await unlink(path);
};
