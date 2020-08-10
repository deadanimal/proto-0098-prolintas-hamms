export class Activity {
  public id: string;
  public name: string;
  public activity_desc: string;
  public location: string;
  public activity_level: string;
  public created_date: string;
  public modified_date: string;
  public start_date: string;
  public expected_completion_date: string;
  public project_timeframe: string;
  public activity_cost: string;
  public progress_level: string;
  public pic: string;

  constructor(
    id: string,
    name: string,
    activity_desc: string,
    location: string,
    activity_level: string,
    start_date: string,
    created_date: string,
    modified_date: string,
    expected_completion_date: string,
    project_timeframe: string,
    activity_cost: string,
    progress_level: string,
    pic: string
  ) {
    this.id = id;
    this.name = name;
    this.activity_desc = activity_desc;
    this.location = location;
    this.activity_level = activity_level;
    this.start_date = start_date;
    this.expected_completion_date = expected_completion_date;
    this.project_timeframe = project_timeframe;
    this.created_date = created_date;
    this.modified_date = modified_date;
    this.activity_cost = activity_cost;
    this.progress_level = progress_level;
    this.pic = pic;
  }
}
