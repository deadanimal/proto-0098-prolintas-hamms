export class User {
  public name: string;
  public profile_picture: string;
  public home_number: string;
  public office_number: string;
  public mobile_number: string;
  public birth_date: string;
  public nric: string;
  public username: string;
  public is_active: string;

  constructor(
    mobile_number: string,
    name: string,
    is_active: string,
    profile_picture: string,
    home_number: string,
    office_number: string,
    birth_date: string,
    nric: string
  ) {
    this.mobile_number = mobile_number;
    this.name = name;
    this.is_active = is_active;
    this.profile_picture = profile_picture;
    this.home_number = home_number;
    this.office_number = office_number;
    this.birth_date = birth_date;
    this.nric = nric;
  }
}
