import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private messeges: IMessage[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.messeges.push({
      to,
      body,
    });
  }
}
