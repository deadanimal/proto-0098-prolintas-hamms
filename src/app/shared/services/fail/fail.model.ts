export class Fail {
  public id: string;
  public name: string;
  public image: string;
  public document: string;
  public project_id: string;
  public modified_date: string;
  public account_created: string;

  constructor(
    id: string,
    name: string,
    image: string,
    document: string,
    project_id: string,
    modified_date: string,
    account_created: string
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.document = document;
    this.project_id = project_id;
    this.modified_date = modified_date;
    this.account_created = account_created;
  }
}
