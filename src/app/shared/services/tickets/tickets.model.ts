export class Ticket {
  public id: string;
  public name: string;
  public description: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name: string,
    description: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
