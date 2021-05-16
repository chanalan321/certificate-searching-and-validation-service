var express = require('express');
var bodyParser = require('body-parser');
const cryptoJS = require('crypto-js');
const jsrsasign = require('jsrsasign');
const web3 = require('web3');
var eth = require('ethers');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const Certificate = require('./models/certificate');
const User = require('./models/user');
const Account = require('./models/account');
const School = require('./models/school');
const Worker_admin = require('./models/worker_admin');

// 公钥
let pk="-----BEGIN PUBLIC KEY-----\n" +
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD3XSdz1MnzazBEN5KOfTx0IyVJ\n" +
  "Z5wb57isrCuHDhnYXwtmdhQalgII0fozeeFpMpAvlnmHC1kpW7XVGvZnLx3bWbCE\n" +
  "bf+pMSW4kmQuI+5cxRUJbCl7sdaODBrINgERHPICVC18AJLThEVMHyjuR6Jn4zQm\n" +
  "yYNbReSktY/BrFTvMQIDAQAB\n" +
  "-----END PUBLIC KEY-----";
// 私钥
let priK = "-----BEGIN PRIVATE KEY-----\n" +
  "MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAPddJ3PUyfNrMEQ3\n" +
  "ko59PHQjJUlnnBvnuKysK4cOGdhfC2Z2FBqWAgjR+jN54WkykC+WeYcLWSlbtdUa\n" +
  "9mcvHdtZsIRt/6kxJbiSZC4j7lzFFQlsKXux1o4MGsg2AREc8gJULXwAktOERUwf\n" +
  "KO5HomfjNCbJg1tF5KS1j8GsVO8xAgMBAAECgYEA6eG1JMrj63jEmStmMb1txG1a\n" +
  "mu4Q5z2QGgtr2HVXsIIlGEq6tWxyHf7TL4qkuz9onuYKn8n2Eqm44fZtVaBx+5ES\n" +
  "zRpIvlTvaxmVu0HZ1hYAzUw1XyRnXNMKpL5tT4GCjm8+QGPzlGxgXI1sNg8r9Jaw\n" +
  "9zRUYeA6LQR9RIMkHWUCQQD8QojjVoGjtiunoh/N8iplhUszZIavAEvmDIE+kVy+\n" +
  "pA7hvlukLw6JMc7cfTcnHyxDo9iHVIzrWlTuKRq9KWVLAkEA+wgJS2sgtldnCVn6\n" +
  "tJKFVwsHrWhMIU29msPPbNuWUD23BcKE/vehIyFu1ahNA/TiM40PEnzprQ5JfPxU\n" +
  "16S78wJANTfMLTnYy7Lo7sqTLx2BuD0wqjzw9QZ4/KVytsJv8IAn65P/PVn4FRV+\n" +
  "8KEx+3zmF7b/PT2nJRe/hycAzxtmlQJBAMrFwQxEqpXfoAEzx4lY2ZBn/nmaR/SW\n" +
  "4VNEXCbocVC7qT1j1R5HVMgV13uKiTtq8dUGWmhqsi7x3XayNK5ECPUCQQDZaAN6\n" +
  "tvIHApz9OLsXSw0jZirQ6KEYdharXbIVDy1W1sVE3lzLbqLdFp1bxAHQIvsYS5PM\n" +
  "A9veSJh372RLJKkj\n" +
  "-----END PRIVATE KEY-----";


mongoose.connect('mongodb://localhost:27017/FYP');
const db = mongoose.connection;
db.on('error', err => {
  console.error(err);
});
db.once('open', db => {
  console.log('Connected to MongoDB');
});

app.post('/api', function (req, res) {
    res.send("okkkkkk")
  });

app.get('/createUser', (req, res, next) => {
  
    // 資料無誤，將使用者填寫的內容存成物件
    const accountData1 = {
      userNumber: "abc",
      password: "abc",
      userId: "1"      
    };

    var hash_passwod = cryptoJS.MD5(JSON.stringify(accountData1.password));
    hash_passwod = hash_passwod.toString();
    accountData1.password = hash_passwod;

    const userData1 = {
      userId: "1",
      userName: "Tom",
      typeOfUser: "admin",
      schoolId:"1"
    };
  
    User.create(userData1, (err, user) => {
      if (err) {
        return next(err);
      }      
    });
    
    // 使用 Create 將資料寫入 DB
    Account.create(accountData1, (err, account) => {
      if (err) {
        return next(err);
      }
      
    });

    

    return res.send('userData1');
});

app.get('/createUser2', (req, res, next) => {
  
  // 資料無誤，將使用者填寫的內容存成物件
  const accountData1 = {
    userNumber: "abc1",
    password: "abc1",
    userId: "2"
    
  };

  var hash_passwod = cryptoJS.MD5(JSON.stringify(accountData1.password));
  hash_passwod = hash_passwod.toString();
  accountData1.password = hash_passwod;

  const userData1 = {
    userId: "2",
    userName: "Peter",
    typeOfUser: "Worker",
    schoolId:"1"
  };

  User.create(userData1, (err, user) => {
    if (err) {
      return next(err);
    }      
  });
  
  // 使用 Create 將資料寫入 DB
  Account.create(accountData1, (err, account) => {
    if (err) {
      return next(err);
    }
    
  });

  

  return res.send('userData1');
});

app.get('/createUser3', (req, res, next) => {
  
  // 資料無誤，將使用者填寫的內容存成物件
  const accountData1 = {
    userNumber: "abc2",
    password: "abc2",
    userId: "3"    
  };

  var hash_passwod = cryptoJS.MD5(JSON.stringify(accountData1.password));
  hash_passwod = hash_passwod.toString();
  accountData1.password = hash_passwod;

  const userData1 = {
    userId: "3",
    userName: "Alex",
    typeOfUser: "student",
    schoolId:"1"
  };

  User.create(userData1, (err, user) => {
    if (err) {
      return next(err);
    }      
  });
  
  // 使用 Create 將資料寫入 DB
  Account.create(accountData1, (err, account) => {
    if (err) {
      return next(err);
    }
    
  });

  

  return res.send('userData1');
});

app.get('/createSchool', (req, res, next) => {
  
  // 資料無誤，將使用者填寫的內容存成物件
  const schoolData = {
    schoolId: "1",
    schoolName: "ABC university",
    schoolPrik: "-----BEGIN PRIVATE KEY-----\n" +
    "MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAPddJ3PUyfNrMEQ3\n" +
    "ko59PHQjJUlnnBvnuKysK4cOGdhfC2Z2FBqWAgjR+jN54WkykC+WeYcLWSlbtdUa\n" +
    "9mcvHdtZsIRt/6kxJbiSZC4j7lzFFQlsKXux1o4MGsg2AREc8gJULXwAktOERUwf\n" +
    "KO5HomfjNCbJg1tF5KS1j8GsVO8xAgMBAAECgYEA6eG1JMrj63jEmStmMb1txG1a\n" +
    "mu4Q5z2QGgtr2HVXsIIlGEq6tWxyHf7TL4qkuz9onuYKn8n2Eqm44fZtVaBx+5ES\n" +
    "zRpIvlTvaxmVu0HZ1hYAzUw1XyRnXNMKpL5tT4GCjm8+QGPzlGxgXI1sNg8r9Jaw\n" +
    "9zRUYeA6LQR9RIMkHWUCQQD8QojjVoGjtiunoh/N8iplhUszZIavAEvmDIE+kVy+\n" +
    "pA7hvlukLw6JMc7cfTcnHyxDo9iHVIzrWlTuKRq9KWVLAkEA+wgJS2sgtldnCVn6\n" +
    "tJKFVwsHrWhMIU29msPPbNuWUD23BcKE/vehIyFu1ahNA/TiM40PEnzprQ5JfPxU\n" +
    "16S78wJANTfMLTnYy7Lo7sqTLx2BuD0wqjzw9QZ4/KVytsJv8IAn65P/PVn4FRV+\n" +
    "8KEx+3zmF7b/PT2nJRe/hycAzxtmlQJBAMrFwQxEqpXfoAEzx4lY2ZBn/nmaR/SW\n" +
    "4VNEXCbocVC7qT1j1R5HVMgV13uKiTtq8dUGWmhqsi7x3XayNK5ECPUCQQDZaAN6\n" +
    "tvIHApz9OLsXSw0jZirQ6KEYdharXbIVDy1W1sVE3lzLbqLdFp1bxAHQIvsYS5PM\n" +
    "A9veSJh372RLJKkj\n" +
    "-----END PRIVATE KEY-----",
    schoolPk: "-----BEGIN PUBLIC KEY-----\n" +
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD3XSdz1MnzazBEN5KOfTx0IyVJ\n" +
    "Z5wb57isrCuHDhnYXwtmdhQalgII0fozeeFpMpAvlnmHC1kpW7XVGvZnLx3bWbCE\n" +
    "bf+pMSW4kmQuI+5cxRUJbCl7sdaODBrINgERHPICVC18AJLThEVMHyjuR6Jn4zQm\n" +
    "yYNbReSktY/BrFTvMQIDAQAB\n" +
    "-----END PUBLIC KEY-----",
    schoolEthAccount: "0x1A207F0Fb911B6ce9B453A2A1925504959ae2dE2",
    schoolEthPrik: "bab6b91c92e0d9ed995ec365a0892522a1f8930fd575a72e623f08113182275f"
  };  
  
  // 使用 Create 將資料寫入 DB
  School.create(schoolData, (err, schoolData) => {
    if (err) {
      return next(err);
    }    
  });

  

  return res.send('userData1');
});

app.get('/createWorker_admin', (req, res, next) => {
  
  // 資料無誤，將使用者填寫的內容存成物件
  const worker_adminData = {
    workerId: "2",
    adminId: "1"
  };  
  
  // 使用 Create 將資料寫入 DB
  Worker_admin.create(worker_adminData, (err, worker_adminData) => {
    if (err) {
      return next(err);
    }    
  });

  

  return res.send('createWorker_admin');
});

app.get('/createCertificate123', (req, res, next) => {
  
  // 資料無誤，將使用者填寫的內容存成物件
  const certificateData = {
    studentName : "William",
    courseName : "The course of ABC",
    schoolName : "ABC university",
    courseDate : "1/1/2018",
    hash : "4e3b8484dc210f433f3051de909ace7c",
    transationId : "0x5fbfdf09e5a9e184e12662e096cf4e0977407e730b8dd52b72acd1b4a0d007dc",
    publishDate : "2021-01-05T11:03:44.478Z",
    hashSignature: "0JHt/2nIxplef46q+riB4I6EuTNlncWwV6w6KuYoWAjAiIhh5CVE5HyLyG8lVvz1a6J7qUo9Z9r9DKBgWOBH7ZFXlI1ygpjeDHUPsLFyLWoui30G1gnSWiMcHg+uLwVUYrmkGd04FcFPNGVINp9y+D93OUMGLmKET8LZqBiS4eI=",
    schoolId: "1",
    createrId: "2",
    auditorId: "1",
    publish: true,
    modify: false,
    modifyComment: ""
  }

  const certificateData2 = {
    studentName : "Amy",
    courseName : "The course of DEF",
    schoolName : "ABC university",
    courseDate : "3/3/2018",
    hash : "64fd209c704090cd342ba25bb0b39a6e",
    transationId : "0xe79dc41f9bc26d21025f8050dfa05709421103f7df5c1e829fad588b5aebe728",
    publishDate : "2021-01-05T11:04:23.129Z",
    hashSignature : "rcIeoZmg5Wa5re6O0+SGUCDTLoTlz2ayuBuY6WkWIyBq8SnWBPiFt98kM4F3g4ZqECshE7LTo5YSZuXNDgshbDA6evSDA2RrkIWbJM2pmomb8ko5E3nRysmSF5j+HI4aFxFShModULQKNrvOCiMeGrSnPLh6v2erY2SqWlAFzGc=",
    schoolId: "1",
    createrId: "2",
    auditorId: "1",
    publish: true,
    modify: false,
    modifyComment: ""
  }

  const certificateData3 = {
    studentName : "Tom",
    courseName : "The course of HIJ",
    schoolName : "ABC university",
    courseDate : "5/5/2018",
    hash : "41abbd594b1f5cd02c14bc5d58f84d08",
    transationId : "0xa585e49a99e51c09ef0dd03098a10d752a60954155ca3e748be10d7e130aa15b",
    publishDate : "2021-01-05T11:05:02.618Z",
    hashSignature : "NHeq3aAE9tI2lhH5Y1QIlMSYPTjhgrW3wy75ghgkV/fErPEddsIiPRzlA6HhfoMgGYO29vUZhuJ3ZfmBSVEElkJCfoH7P1IEfbeoY01tt6AW+Eqy8IvWopxIVqIpT2qJ80ilv+yaORdR/0V8MoSkd7QizZaUcfFHZGuzihWti5g=",
    schoolId: "1",
    createrId: "2",
    auditorId: "1",
    publish: true,
    modify: false,
    modifyComment: ""
  }

  const certificateData4 = {
    studentName : "Tom",
    courseName : "The course of 123",
    schoolName : "ABC university",
    courseDate : "8/8/2018",
    hash : "5299c9b312918c62f8d8c4a008201bec",
    transationId : "0x40e6e0adee55f7e1f210ac9f2178f13f54207725cb473716a1529d4abb5798cd",
    publishDate : "2021-01-05T11:14:47.877Z",
    hashSignature : "HufmQQws/aj415Rao7hn3QrX+zzf2EOrV9jF42kQVorsy+R8lXJLLJsEZ0WqD3CG2zqs8dsj4Asz3zhw6r0JYZHMeWppiWVjWpFqEoWpuNCl55XeUOnaA2IoML4fPGm9E6PhOVnf/sontJ4zKFb49Bb4FLNJTbIq4StAyjbYvSM=",
    schoolId: "1",
    createrId: "2",
    auditorId: "1",
    publish: true,
    modify: false,
    modifyComment: ""
  }

  // 使用 Create 將資料寫入 DB
  Certificate.create(certificateData, (err, certificate) => {
    if (err) {
      return next(err);
    }
  });
  Certificate.create(certificateData2, (err, certificate) => {
    if (err) {
      return next(err);
    }
  });
  Certificate.create(certificateData3, (err, certificate) => {
    if (err) {
      return next(err);
    }
  });
  Certificate.create(certificateData4, (err, certificate) => {
    if (err) {
      return next(err);
    }
  });
});

app.post('/initialCertificate', (req, res, next) => {
  
  var studentLName = req.body.studentLName
  var studentFName = req.body.studentFName
  var schoolName = req.body.schoolName
  var studentID = req.body.studentID
  var courseName = req.body.courseName
  var courseDate = req.body.finishDate
  var schoolId = req.body.schoolId
  var createrId = req.body.createrId
  var publish = false
  var hash = ""
  var transationId = ""
  var publishDate = ""
  var hashSignature = ""
  var auditorId = "1"
  var modify = false
  var modified = false
  var modifyComment = ""

  console.log(courseDate)
  
  const initialData = {
    studentName: studentLName + " " + studentFName,
    studentID: studentID,
    studentLName: studentLName,
    studentFName: studentFName,
    schoolName: schoolName,
    courseName: courseName,
    courseDate: courseDate,
    schoolId: schoolId,
    createrId: createrId,
    publish: publish,
    hash: hash,
    transationId: transationId,
    publishDate: publishDate,
    hashSignature: hashSignature,
    auditorId: auditorId,
    modify: modify,
    modified:modified,
    modifyComment: modifyComment    
  }

  // 使用 Create 將資料寫入 DB
  
  Certificate.create(initialData, (err, initialData) => {
    if (err) {
      return next(err);
    }
    return res.send('input initialData successfully');
  });
});

app.post('/addModifyComment', (req, res, next) => {
  var _id = req.body._id
  var modifyComment = req.body.modifyComment
  var modify = true


  // 使用 Create 將資料寫入 DB
  
  Certificate.updateOne({ '_id': _id }, { modifyComment: modifyComment, modify: modify}, function (err, athletes) {
    if (err) {
        return next(err);
      }
      return res.send('certificateData');
  }); 
});

app.post('/modifyCertificate', (req, res, next) => {
  var textData = req.body.textData
  var studentID = req.body.studentID
  var studentLName = req.body.studentLName
  var studentFName = req.body.studentFName
  var courseName = req.body.courseName
  var courseDate = req.body.courseDate
  var modified = true


  // 使用 Create 將資料寫入 DB
  
  Certificate.updateOne({ '_id': textData }, { studentLName: studentLName, studentFName: studentFName,courseName:courseName ,courseDate:courseDate,modified:modified,studentName:studentLName+" "+studentFName  }, function (err, athletes) {
    if (err) {
        return next(err);
      }
      //return res.redirect('/profile');
      return res.send('certificateData');
  }); 
});

app.post('/registerCertificate', (req, res, next) => {
  var _id = req.body.textData
  var projectApiKey = "7b138d8b07c34ee59e2e90f529c1517c"
  var Web3 = require('web3');
  var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/"+projectApiKey));
  var contractABI = [ { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "bytes32", "name": "hash", "type": "bytes32" } ], "name": "Posted", "type": "event" }, { "inputs": [ { "internalType": "bytes32", "name": "hash", "type": "bytes32" } ], "name": "Post", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ];
  // contract address
  var contractAddress = "0x7329360E267fFCe63fE64eEcf018c6A52469dD8F";
  var Contract = new web3.eth.Contract(contractABI,contractAddress);
  var accountsPrivateKey = ""
  var accountsAddress = ""

  const certificate = {
    studentName: "",
    schoolName: "",
    courseName: "",
    courseDate: ""
  }

  var json_certificate
  
      Certificate.find({ '_id': _id }, 'studentName courseName schoolName courseDate schoolId', function (err, athletes) {
        if (err) {
            return next(err);
          }

        
        certificate.studentName= athletes[0]["studentName"]
        certificate.schoolName= athletes[0]["schoolName"]
        certificate.courseName= athletes[0]["courseName"]
        certificate.courseDate= athletes[0]["courseDate"]

        json_certificate = JSON.stringify(certificate)

        var md5Hash_certificate = cryptoJS.MD5(JSON.stringify(json_certificate));
        md5Hash_certificate = md5Hash_certificate.toString();
        
        School.find({ 'schoolId': athletes[0]["schoolId"] }, 'schoolPrik schoolEthAccount schoolEthPrik', function (err, athletes2) {
          if (err) {
              return next(err);
            }
        //sign with private key
        let signature=new jsrsasign.crypto.Signature({alg:"SHA256withRSA",prvkeypem:athletes2[0]["schoolPrik"]});
        signature.updateString(md5Hash_certificate);
        let a = signature.sign();
        let sign = jsrsasign.hextob64(a);

        accountsPrivateKey = athletes2[0]["schoolEthPrik"]
        accountsAddress = athletes2[0]["schoolEthAccount"]      
        bytes32_certificateHash = web3.utils.asciiToHex(md5Hash_certificate)

        const tx = {
          // this could be provider.addresses[0] if it exists
          from: accountsAddress,
          gasPrice: '0x3B9ACA00', 
          gasLimit: '0xC20A',
          // target address, this could be a smart contract address
          to: contractAddress, 
          // this encodes the ABI of the method and the arguements
          data: Contract.methods.Post(bytes32_certificateHash).encodeABI() 
        };

        const signPromise = web3.eth.accounts.signTransaction(tx, accountsPrivateKey);

        signPromise.then((signedTx) => {  
          console.log("hello i am working!!!  2")

          // raw transaction string may be available in .raw or 
          // .rawTransaction depending on which signTransaction
          // function was called
          const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);  
          

          sentTx.on("transactionHash", transactionHash => {
            console.log("transactionHash:")
            console.log(transactionHash)
            Certificate.  updateOne({ '_id': _id }, { hash: md5Hash_certificate, hashSignature: sign,transationId:transactionHash,publishDate:Date.now(),modify:false,modified:false,publish:true }, function (err, athletes) {
              if (err) {
                  return next(err);
                }
                //return res.redirect('/profile');
                console.log("athletes")
                return res.send('certificateData');
              
            });

          });

          sentTx.on("receipt", receipt => {
            console.log("receipt:")
            console.log(receipt)
          });
          
          sentTx.on("error", err => {
            // do something on transaction error
            console.log("error:")
            console.log(err)
          });
          
          }).catch((err) => {
            console.log("error2:")
            console.log(err)
          // do something when promise fails
          
        });
        

        
    });
    });
});

app.post('/getTransactionReceipt', (req, res) => {
  let defaultProvider = eth.getDefaultProvider('ropsten');
  let transactionHash = req.body.transactionHash

  defaultProvider.getTransactionReceipt(transactionHash).then((receipt) => {
    console.log(receipt.logs);
    return res.send(receipt);   
  });
});

app.post('/getHash', (req, res) => {
  searchType = req.body.searchType
  textData = req.body.textData

  const certificate = {
    studentName: "",
    schoolName: "",
    courseName: "",
    courseDate: ""
  }

  var json_certificate

  certificate.studentName= textData[0]["studentName"]
  certificate.schoolName= textData[0]["schoolName"]
  certificate.courseName= textData[0]["courseName"]
  certificate.courseDate= textData[0]["courseDate"]

  json_certificate = JSON.stringify(certificate)

  var md5Hash_certificate = cryptoJS.MD5(JSON.stringify(json_certificate));
  md5Hash_certificate = md5Hash_certificate.toString();
  return res.send(md5Hash_certificate);
     
});

app.post('/verifyHash', (req, res) => {
  schoolId = req.body.schoolId
  textData = req.body.textData
  signature = req.body.signature

  School.find({ 'schoolId': schoolId }, 'schoolPk', function (err, athletes) {
    if (err) {
        return next(err);
      }

    // sign with public key
    let signatureVf = new jsrsasign.crypto.Signature({alg:"SHA256withRSA",prvkeypem:athletes[0]["schoolPk"]});
    signatureVf.updateString(textData);
    let result = signatureVf.verify(jsrsasign.b64tohex(signature));
    return res.send(result);
  })
     
});

app.post('/checkAccount', (req, res) => {
  textData = req.body.textData
  schoolId = req.body.schoolId

  School.find({ 'schoolId': schoolId }, 'schoolEthAccount', function (err, athletes) {
    if (err) {
        return next(err);
      }

    // 验签
    if(textData == athletes[0]["schoolEthAccount"]){
      return res.send("true");
    }else{
      return res.send("false");
    }
  })

  
     
});

app.post('/searchDB', function(req, res) {
  searchType = req.body.searchType
  textData = req.body.textData
  if (searchType=="0"){
    Certificate.find({ 'studentName': {$regex: '.*' + textData + '.*' }}, function (err, athletes) {
      if (err) {
          return next(err);
        }
        console.log(athletes);
        return res.send(athletes);   
    });
  }else if (searchType=="1"){
    Certificate.find({ 'hash': textData }, function (err, athletes) {
      if (err) {
          return next(err);
        }
        console.log(athletes);
        return res.send(athletes);   
    });
  }else if (searchType=="3"){
    Certificate.find({ '_id': textData }, function (err, athletes) {
      if (err) {
          return next(err);
        }
        console.log(athletes);
        return res.send(athletes);   
    });
  }else if (searchType=="4"){ //get hash json
    Certificate.find({ '_id': textData }, 'studentName courseName schoolName courseDate', function (err, athletes) {
      if (err) {
          return next(err);
        }
        console.log(athletes);
        return res.send(athletes);   
    });
  }else if (searchType=="5"){ //search by workerid
    let query = Certificate
      .find({ 'createrId': textData })
      .where('publish').equals(false)
      .where('modified').equals(false)
      .select('_id studentName courseName schoolName courseDate createdAt modified');

    query.exec((err, athletes)=> {
      if (err) return handleError(err);
      return res.send(athletes); 
    });
  }else if (searchType=="6"){ //search by workerid
    let query = Certificate
      .find({ 'createrId': textData })
      .where('publish').equals(false)
      .where('modify').equals(true)
      .select('_id studentName courseName schoolName courseDate createdAt modified');

    query.exec((err, athletes)=> {
      if (err) return handleError(err);
      return res.send(athletes); 
    });
  }else if (searchType=="7"){ //get hash json
    let query = Certificate
      .find({ '_id': textData })
      .select('studentLName studentFName studentID courseName schoolName courseDate schoolId modifyComment createrId auditorId hash transationId');

    query.exec((err, athletes)=> {
      if (err) return handleError(err);
      console.log(athletes)
      return res.send(athletes); 
    });
  }else if (searchType=="8"){ //get hash json
    let query = Worker_admin
      .find({ 'adminId': textData })
      .select('workerId');   

    let result = []

    query.exec((err, athletes)=> {
      if (err) return handleError(err);
      
      for (let i = 0; i < athletes.length; i++) {
        //athletes[i]["workerId"]
        let query2 = Certificate
          .find({ 'createrId': athletes[i]["workerId"] })
          .where('publish').equals(false)
          .where('modify').equals(false)
          .select('createdAt studentLName studentFName courseName schoolName courseDate schoolId modifyComment publish modify createrId');

        query2.exec((err, athletes2)=> {
          if (err) return handleError(err);

          do {
            result.push(athletes2.shift())
          }
          while (athletes2.length>0);

          if (i == athletes.length-1) {
            return res.send(result); 
          }          
        });     
      }      
    });
  }else if (searchType=="9"){ //get hash json
    let query = Worker_admin
      .find({ 'adminId': textData })
      .select('workerId');   

    let result = []

    query.exec((err, athletes)=> {
      if (err) return handleError(err);
      
      for (let i = 0; i < athletes.length; i++) {
        //athletes[i]["workerId"]
        let query2 = Certificate
          .find({ 'createrId': athletes[i]["workerId"] })
          .where('publish').equals(false)
          .where('modify').equals(true)
          .select('createdAt studentLName studentFName courseName schoolName courseDate schoolId modifyComment modified createrId');

        query2.exec((err, athletes2)=> {
          if (err) return handleError(err);

          do {
            result.push(athletes2.shift())
          }
          while (athletes2.length>0);

          if (i == athletes.length-1) {
            return res.send(result); 
          }          
        });     
      }      
    });
  }else if (searchType=="10"){ //search by workerid
    let query = Certificate
      .find({ 'createrId': textData })
      .where('publish').equals(true)
      .select('_id studentName courseName schoolName courseDate createdAt');

    query.exec((err, athletes)=> {
      if (err) return handleError(err);
      return res.send(athletes); 
    });
  }else if (searchType=="11"){ //get hash json
    let query = Worker_admin
      .find({ 'adminId': textData })
      .select('workerId');   

    let result = []

    query.exec((err, athletes)=> {
      if (err) return handleError(err);
      
      for (let i = 0; i < athletes.length; i++) {
        //athletes[i]["workerId"]
        let query2 = Certificate
          .find({ 'createrId': athletes[i]["workerId"] })
          .where('publish').equals(true)
          .select('createdAt studentName courseName schoolName courseDate createrId _id');

        query2.exec((err, athletes2)=> {
          if (err) return handleError(err);

          do {
            result.push(athletes2.shift())
          }
          while (athletes2.length>0);

          if (i == athletes.length-1) {
            return res.send(result); 
          }          
        });     
      }      
    });
  }else if (searchType=="12"){
    Certificate.find({ 'studentID': textData }, function (err, athletes) {
      if (err) {
          return next(err);
        }
        console.log(athletes);
        return res.send(athletes);   
    });
  }
});

app.post('/loginabc', function(req, res) {
  var userNumber = req.body.userNumber
  var password = req.body.password
  var userId=""
  var typeOfUser=""
  var userName=""
  
  Account.find({ 'userNumber': userNumber }, function (err, athletes) {
    
    if (athletes.length >=1) {    

      if (err) {
          return next(err);
        }
      
      var hash_password = cryptoJS.MD5(JSON.stringify(password));
      hash_password = hash_password.toString(); 
      
      if (athletes[0]["password"] != null && athletes[0]["password"] == hash_password) {
        userId=athletes[0]["userId"]        
        User.find({ 'userId': athletes[0]["userId"] }, function (err, athletes2) {
          typeOfUser=athletes2[0]["typeOfUser"]
          userName=athletes2[0]["userName"]          
          return res.send({userId:userId,typeOfUser:typeOfUser,userName:userName}); 
        })
      }      
          
    }else{
      return res.send({id:"",typeOfUser:"",userName:""});    
    }
    
  });
});

app.post('/getUserSchoolId_Name', function(req, res) {
  var userId = req.body.userId
  var schoolId = ""
  var schoolName = ""
  
  User.find({ 'userId': userId },'schoolId', function (err, athletes) {
    
    if (athletes.length >=1) {    

      if (err) {
          return next(err);
        }
        schoolId=athletes[0]["schoolId"]
        console.log(schoolId)
        School.find({ 'schoolId': athletes[0]["schoolId"] },'schoolName', function (err, athletes2) {
          
          schoolName=athletes2[0]["schoolName"]  
          console.log(schoolName)        
          return res.send({schoolId:schoolId,schoolName:schoolName}); 
        })  
          
    }else{
      return res.send({schoolId:"",schoolName:""});    
    }
    
  });
});

app.post('/getProblemBadgeContent', function(req, res) {
  var userId = req.body.userId
  
  let query = Certificate
      .find({ 'createrId': userId })
      .where('publish').equals(false)      
      .where('modified').equals(false)
      .where('modify').equals(true)
      .select('_id');

  query.exec((err, athletes)=> {
      if (err) return handleError(err);
      return res.send(athletes); 
  });
  
});

app.post('/getReviewingBadgeContent', function(req, res) {
  var userId = req.body.userId
  
  let query = Certificate
    .find({ 'createrId': userId })
    .where('publish').equals(false)
    .where('modified').equals(false)
    .select('_id');

  query.exec((err, athletes)=> {
      if (err) return handleError(err);
      return res.send(athletes); 
  });
  
});

app.post('/getModifiedBadgeContent', function(req, res) {
  var userId = req.body.userId

  let query = Worker_admin
  .find({ 'adminId': userId })
  .select('workerId');   

  let result = []

  query.exec((err, athletes)=> {
  if (err) return handleError(err);

  for (let i = 0; i < athletes.length; i++) {
    let query2 = Certificate
      .find({ 'createrId': athletes[i]["workerId"] })
      .where('publish').equals(false)
      .where('modify').equals(true)
      .where('modified').equals(true)
      .select('_id');

    query2.exec((err, athletes2)=> {
      if (err) return handleError(err);

      do {
        result.push(athletes2.shift())
      }
      while (athletes2.length>0);

      if (i == athletes.length-1) {
        return res.send(result); 
      }          
    });     
  }      
  });
  
});

app.post('/getAuditBadgeContent', function(req, res) {
  var userId = req.body.userId

  let query = Worker_admin
  .find({ 'adminId': userId })
  .select('workerId');   

  let result = []

  query.exec((err, athletes)=> {
  if (err) return handleError(err);

  for (let i = 0; i < athletes.length; i++) {    
    let query2 = Certificate
      .find({ 'createrId': athletes[i]["workerId"] })
      .where('publish').equals(false)
      .where('modify').equals(false)
      .select('createdAt studentLName studentFName courseName schoolName courseDate schoolId modifyComment publish modify createrId');

    query2.exec((err, athletes2)=> {
      if (err) return handleError(err);

      do {
        result.push(athletes2.shift())
      }
      while (athletes2.length>0);

      if (i == athletes.length-1) {
        return res.send(result); 
      }          
    });     
  }      
  });
  
});



app.listen(5000); 