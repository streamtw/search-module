export interface CharityOrganization {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface DonationProject {
  id: number;
  organization: string;
  title: string;
  tags: string[];
  image: string;
}

export interface CharityProduct {
  id: number;
  title: string;
  organization: string;
  price: string;
  image: string;
}
