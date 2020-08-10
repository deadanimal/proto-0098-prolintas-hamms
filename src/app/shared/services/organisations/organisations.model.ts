export class Organisation {
  public id: string;
  public Surveyanswer: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    Surveyanswer: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.Surveyanswer = Surveyanswer;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
