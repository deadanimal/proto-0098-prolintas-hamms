export class Comment {
  public id: string;
  public comment: string;
  public user_id: string;
  public project_id: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    comment: string,
    user_id: string,
    project_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.comment = comment;
    this.user_id = user_id;
    this.project_id = project_id;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
