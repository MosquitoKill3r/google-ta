export class TypeaheadAddressResult {
  constructor(
    public address?: string,
    public addressLine1?: string,
    public addressLine2?: string,
    public city?: string,
    public state?: string,
    public zip?: string,
  ) {
  }
}
