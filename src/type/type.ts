export type admin = {
    username: string;
    password: string;
};

export type renter = {
  renterUsername: string;
  renterName: string;
  renterPhone: string;
  renterEmail: string;
  renterFbUrl: string;
  renterPassword: string;
  accountStatus: number;
  renterDateRegister: string;
};

export type Owner = {
  ownerUsername: string;
  ownerName: string;
  ownerPassword: string;
  ownerPhone: string;
  ownerFbUrl: string;
  ownerAddress: string;
  accountStatus: number;
  ownerDateRegister: string;
};