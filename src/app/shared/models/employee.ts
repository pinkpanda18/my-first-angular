export class Employee {
  firstname: string;
  lastname: string;
  position: string;
  yearhired: Number;
  dateofbirth: Date;

  getFullName(): string {
    return this.firstname + " " + this.lastname;
  }
  getAge(): number {
    const bdate = new Date(this.dateofbirth);
    const timeDiff = Math.abs(Date.now() - bdate.getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
  }
}
