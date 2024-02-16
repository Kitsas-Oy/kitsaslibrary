/**
 * Certifate status
 */
export enum CertificateStatus {
  /**
   * Organization has no Business Identifier
   * Can't fetch certificate
   */
  NO_BID = 'NO_BID',
  /**
   * Certificate is deleted
   */
  DELETED = 'DELETED',
  /**
   * Certificate has never been fetched
   */
  MISSING = 'MISSING',
  /**
   *  Error fetching certificate
   */
  ERROR = 'ERROR',
  /**
   * Certificate is invalid
   */
  INVALID = 'INVALID',
  /**
   * Certificate has expired
   */
  EXPIRED = 'EXPIRED',
  /**
   * Certificate fetching process is pending
   */
  PENDING = 'PENDING',
  /**
   * Certificate is fetched successfully
   */
  VALID = 'VALID',
  /**
   * Office has no Suomi.fi authorization to organization
   */
  UNAUTHORIZED = 'UNAUTHORIZED',
  /**
   * Office has Suomi.fi authorization to organization
   */
  AUTHORIZED = 'AUTHORIZED',
  /**
   * Fetching VAT periods with office certificate successed
   */
  OFFICE_OK = 'OFFICE_OK',
  /**
   * Fetching VAT periods successed
   */
  OK = 'OK',
}
export interface CertificateFetchResult {
  status: CertificateStatus;
  error?: string;
}

export interface CertificateOwner {
  name: string;
  id: string;
  businessId: string;
  type: 'OFFICE' | 'ORGANIZATION';
}

export interface CertificateStatusInformation {
  /**
   * The status of the certificate.
   */
  status: CertificateStatus;
  /**
   * The date when the status was last updated.
   */
  date?: Date;
  /**
   * The error message if the status is ERROR.
   */
  error?: string;
  /**
   * The owner of the certificate.
   */
  owner?: CertificateOwner;
  /**
   * The date when the certificate was issued.
   */
  issued?: Date;
  /**
   * The date when the certificate expires.
   */
  expires?: Date;
}
