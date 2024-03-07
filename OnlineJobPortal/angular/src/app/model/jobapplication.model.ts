import { Jobs } from "./jobs.model";
import { User } from "./user.model";


export class JobApplication {
  id!: number;
  user!: User;
  job!: Jobs;
}


  