import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProviders/implementations/DiskStorageProvider';
import SESMailProvider from '@shared/container/providers/StorageProviders/implementations/S3StprageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: SESMailProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
