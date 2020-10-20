import IParseMailtTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailtTemplateDTO): Promise<string>;
}
