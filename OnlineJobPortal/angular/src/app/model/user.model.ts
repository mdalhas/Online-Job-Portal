// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   qualification?: string;
//   cellNo?: string;
//   gender?: string;
//   role?: string;
//   dob?: Date;
//   image?: string;
//   cvFileName?: string;
//   cvContentType?: string;
//   cvFile?: File; // Change type to File for handling file uploads
//   isEnable: boolean;
//   jobApplications: JobApplication[];
// }

// export interface JobApplication {
//   // Define properties of the JobApplication model if needed
// }

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  qualification?: string;
  cellNo?: string;
  gender?: string;
  role?: string;
  dob?: Date;
  image?: string;
  cvFileName?: string;
  cvContentType?: string;
  cvData?: string;
  isEnable: boolean;
  jobApplications: JobApplication[];

  // Index signature to allow indexing by string keys
  [key: string]: any;
}

export interface JobApplication {
  // Define properties of the JobApplication model if needed
}


// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   qualification?: string; // Marked as optional
//   cellNo?: string; // Marked as optional
//   gender?: string; // Marked as optional
//   role?: string; // Marked as optional
//   dob?: Date; // Marked as optional
//   image?: string; // Marked as optional
//   cvFileName?: string;
//   cvContentType?: string
//   cvFile?: File; 
//   isEnable: boolean;

//   jobApplications: JobApplication[];
// }

// export interface JobApplication {
//   // Define properties of the JobApplication model if needed
// }
