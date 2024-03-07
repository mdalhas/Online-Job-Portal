export class Jobs {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  location: string;
  pdate: Date;
  deadlinedate: Date;
  jobApplications: JobApplication[];

  constructor(
    id: number = 0,
    title: string = '',
    description: string = '',
    category: string = '',
    status: string = '',
    location: string = '',
    pdate: Date = new Date(),
    deadlinedate= new Date(),
    jobApplications: JobApplication[] = []
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.status = status;
    this.location = location;
    this.pdate = pdate;
    this.deadlinedate=deadlinedate;
    this.jobApplications = jobApplications;
  }
}

export class JobApplication {
  // Define the properties for JobApplication if needed
}
