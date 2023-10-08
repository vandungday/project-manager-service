import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as path from 'path';
import * as fs from 'fs';
import { unlink } from '@/common/helpers/file';

@Injectable()
export class GoogleDriveService {
  private readonly SCOPES = ['https://www.googleapis.com/auth/drive.file'];
  private readonly drive: any;

  constructor() {
    const serviceAccountAuth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'google-service-account.json'),
      scopes: this.SCOPES,
    });

    this.drive = google.drive({
      version: 'v3',
      auth: serviceAccountAuth,
    });
  }

  async upload(file: Express.Multer.File, folderId: string) {
    const { originalname, mimetype, path } = file;
    console.log(
      '🚀 ~ file: google-drive.service.ts:26 ~ GoogleDriveService ~ upload ~ path:',
      path,
    );

    const response = await this.drive.files.create({
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

    await unlink(path, true);
  }
}
