export interface Inquiry {
  parentName: string;
  phoneNumber: string;
  grade: string;
  submittedAt: string;
}

export interface Appointment {
  parentName: string;
  phoneNumber: string;
  email: string;
  schoolName: string;
  grade: string;
  preferredDate: string;
  preferredTimeSlot: string;
  scheduledAt: string;
}

export interface SchoolCard {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

export interface ExhibitionHighlight {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface SchoolLogo {
  id: string;
  name: string;
  logoUrl: string;
}
