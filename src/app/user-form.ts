export class UserForm {

    constructor (
        public UfirstName,
        public UlastName,
        public UemployeeNumber,
        public UemployeeType,
        public UjobTitle,
        public UjobRole,
        public UhireDate,
        public UlogonHours,
        public UdocUpload,
        public UemailAddress,
        public Uphone,
        public Uaddress = {
            line1 : "",
            line2 : "",
            city : "",
            state : "",
            zip : "",
            country : "",
          },

        public UcompanyName,
        public UuserId,
        public UCUIdata,
        public UremoteUser,
        public Ugroups,
        public URoles,
        public UAssetIdentifier 
        
    ){
        
    }


}