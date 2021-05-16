contract certificate {

    address internal school;
    Profile public profile;

    struct Profile {
        string name;
        address account;
        string courseName;
        string schoolName;
        string courseDate;
        string certificateHash;
        string hashSignature;
        string createrId;
        string auditorId;
    }

    modifier onlySchool {
        require(msg.sender == school, "Permission denied. Please use school account.");
        _;
    }

    function add(string memory name, address account, string memory courseName, string memory schoolName, string memory courseDate, string memory certificateHash, string memory hashSignature, string memory createrId, string memory auditorId) public {
        school = msg.sender;

        profile = Profile({
            name: name,
            account: account,
            courseName: courseName,
            schoolName: schoolName,
            courseDate: courseDate,
            certificateHash:certificateHash,
            hashSignature: hashSignature,
            createrId:createrId,
            auditorId:auditorId
        });
    }  

}