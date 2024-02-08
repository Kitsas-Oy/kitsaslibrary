export enum CertificateStatus {
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  VALID = 'VALID',
  INVALID = 'INVALID',
  MISSING = 'MISSING',
}

export interface CertificateFetchResult {
  status: CertificateStatus;
  error?: string;
}

interface CertificateOwner {
  name: string;
  id: string;
  businessId: string;
  type: 'OFFICE' | 'ORGANIZATION';
}

export interface CertificateStatusInformation {
  status: CertificateStatus;
  date?: Date;
  error?: string;
  owner?: CertificateOwner;
}
