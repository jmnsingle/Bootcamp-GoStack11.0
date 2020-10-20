import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  private storageFiles: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storageFiles.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storageFiles.findIndex(
      storageFile => storageFile === file,
    );

    this.storageFiles.splice(findIndex, 1);
  }
}

export default DiskStorageProvider;
