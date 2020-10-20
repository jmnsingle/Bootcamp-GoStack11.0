import ISendMailDTO from '../dtos/ISendMailDTOs';

export default interface IStorageProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
