export class CompanyInfoForm {

    constructor (
        public CIdescription : string,
        public CIname : string,
        public CIDBA : string,
        public CIphone : string,
        public CIwebsite : string,
        public CIaddress = {
          line1 : "",
          line2 : "",
          city : "",
          state : "",
          zip : "",
          country : "",
        },
        public CIlogo : ImageBitmap, //TODO change type later
        public CIPrimaryPoC : string,
        public CISBAcertified,
        public CIbusinessType,
        public CItechPoCInfo,
        public CIDUNSnumber,
        public CICAGEcode,
        public CIcmmcAuditAgency, CIcmmcAuditInfo, CIcmmcAuditDate : string,
        public CINISTAuditAgency, CINISTAuditInfo, CINISTAuditDate : string,
        public CInumber
    ){
        
    }


}