export class Project {
  public id: string;
  public name: string;
  public start_date: string;
  public expected_completion_date: string;
  public project_timeframe: string;
  public department: string;
  public owner_project: string;
  public source_of_fund: string;
  public project_cost: string;
  public pic: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name: string,
    start_date: string,
    expected_completion_date: string,
    project_timeframe: string,
    department: string,
    owner_project: string,
    source_of_fund: string,
    project_cost: string,
    pic: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name = name;
    this.start_date = start_date;
    this.expected_completion_date = expected_completion_date;
    this.project_timeframe = project_timeframe;
    this.department = department;
    this.owner_project = owner_project;
    this.source_of_fund = source_of_fund;
    this.project_cost = project_cost;
    this.pic = pic;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
