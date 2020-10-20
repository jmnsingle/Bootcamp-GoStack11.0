import IParseMailTenplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  // to: {
  //   name: string;
  //   email: string;
  // }
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTenplateDTO;
}
