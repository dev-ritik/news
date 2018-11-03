/*! JSSO Crosswalk v0.2.4 | Sachin Garg | (c) Times Internet Ltd */
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var JssoCrosswalk=function(){function JssoCrosswalk(channel,platform){_classCallCheck(this,JssoCrosswalk);this.channel=channel;this.platform=platform;this.ssoBaseUrl="https://jsso.indiatimes.com/sso/crossapp/identity/web/";this.socialappBaseUrl="https://socialappsintegrator.indiatimes.com/socialsite/crossapp/web/";this.sdkVersion="0.2.4";this.csrfToken=this.getCookie("jsso_crosswalk_csrfToken_"+this.channel);this.ssec=this.getCookie("jsso_crosswalk_ssec_"+this.channel);this.tksec=this.getCookie("jsso_crosswalk_tksec_"+this.channel);this.UNAUTHORIZED_ACCESS_RESPONSE={code:404,message:"UNAUTHORIZED_ACCESS",status:"FAILURE",data:null};this.CONNECTION_ERROR_RESPONSE={code:503,message:"CONNECTION_ERROR",status:"FAILURE",data:null};this.CONNECTION_TIMEOUT_RESPONSE={code:504,message:"CONNECTION_TIMEOUT",status:"FAILURE",data:null};this.INVALID_MOBILE={code:402,message:"INVALID_MOBILE",status:"FAILURE",data:null};this.INVALID_EMAIL={code:403,message:"INVALID_EMAIL",status:"FAILURE",data:null};this.INVALID_REQUEST={code:413,message:"INVALID_REQUEST",status:"FAILURE",data:null};this.INVALID_PASSWORD={code:417,message:"INVALID_PASSWORD",status:"FAILURE",data:null};var channelCookies=this.getChannelCookies();if(channelCookies.login!=""&&channelCookies.daily==""){this.getValidLoggedInUser()}}_createClass(JssoCrosswalk,[{key:"asyncJssoCall",value:function asyncJssoCall(api,data,callback){this.asyncCall(this.ssoBaseUrl+api,data,callback)}},{key:"asyncSocialappCall",value:function asyncSocialappCall(api,data,callback){this.asyncCall(this.socialappBaseUrl+api,data,callback)}},{key:"asyncCall",value:function asyncCall(apiUrl,data,callback){var x=new XMLHttpRequest;x.open("POST",apiUrl);x.timeout=3e4;x.withCredentials=true;x.setRequestHeader("content-type","application/json");x.setRequestHeader("channel",this.channel);x.setRequestHeader("platform",this.platform);x.setRequestHeader("sdkVersion",this.sdkVersion);x.setRequestHeader("IsJssoCrosswalk","true");x.setRequestHeader("csrfToken",this.csrfToken);x.setRequestHeader("ssec",this.ssec);x.setRequestHeader("tksec",this.tksec);x.responseType="json";x.onload=function(){var response=x.response;if(typeof response=="string"){response=JSON.parse(response)}if(!response||!response.code){this.deleteChannelCookies();if(callback)callback(this.UNAUTHORIZED_ACCESS_RESPONSE);return}if(response.code==404){this.deleteChannelCookies();if(callback)callback(response);return}if(x.getResponseHeader("csrfToken"))this.csrfToken=x.getResponseHeader("csrfToken");if(x.getResponseHeader("ssec"))this.ssec=x.getResponseHeader("ssec");if(x.getResponseHeader("tksec"))this.tksec=x.getResponseHeader("tksec");if(callback)return callback(response)}.bind(this);x.onerror=function(){if(callback)return callback(this.CONNECTION_ERROR_RESPONSE)}.bind(this);x.ontimeout=function(){if(callback)return callback(this.CONNECTION_TIMEOUT_RESPONSE)}.bind(this);x.send(JSON.stringify(data))}},{key:"getValidLoggedInUser",value:function getValidLoggedInUser(callback){this.asyncJssoCall("loggedInUser",{},function(response){if(response.code==200){this.createChannelCookies()}if(callback)return callback(response)}.bind(this))}},{key:"checkUserExists",value:function checkUserExists(identifier,callback){this.asyncJssoCall("checkUserExists",{identifier:identifier},callback)}},{key:"registerUser",value:function registerUser(firstName,lastName,gender,dob,email,mobile,password,isSendOffer,termsAccepted,shareDataAllowed,callback){if(!email&&!mobile)return callback(this.INVALID_REQUEST);if(email&&!this.isValidEmail(email))return callback(this.INVALID_EMAIL);if(mobile&&!this.isValidMobile(mobile))return callback(this.INVALID_MOBILE);if(!this.isValidPassword(password))return callback(this.INVALID_PASSWORD);this.asyncJssoCall("registerUser",{firstName:firstName,lastName:lastName,gender:gender,dob:dob,email:email,mobile:mobile,password:password,isSendOffer:isSendOffer,termsAccepted:termsAccepted,shareDataAllowed:shareDataAllowed},callback)}},{key:"registerUserRecaptcha",value:function registerUserRecaptcha(firstName,lastName,gender,dob,email,mobile,password,isSendOffer,recaptcha,termsAccepted,shareDataAllowed,callback){if(!email&&!mobile)return callback(this.INVALID_REQUEST);if(email&&!this.isValidEmail(email))return callback(this.INVALID_EMAIL);if(mobile&&!this.isValidMobile(mobile))return callback(this.INVALID_MOBILE);if(!this.isValidPassword(password))return callback(this.INVALID_PASSWORD);this.asyncJssoCall("registerUserRecaptcha",{firstName:firstName,lastName:lastName,gender:gender,dob:dob,email:email,mobile:mobile,password:password,isSendOffer:isSendOffer,recaptcha:recaptcha,termsAccepted:termsAccepted,shareDataAllowed:shareDataAllowed},callback)}},{key:"resendMobileSignUpOtp",value:function resendMobileSignUpOtp(mobile,ssoid,callback){if(!this.isValidMobile(mobile))return callback(this.INVALID_MOBILE);this.asyncJssoCall("resendSignUpOtp",{mobile:mobile,ssoid:ssoid},callback)}},{key:"resendEmailSignUpOtp",value:function resendEmailSignUpOtp(email,ssoid,callback){if(!this.isValidEmail(email))return callback(this.INVALID_EMAIL);this.asyncJssoCall("resendSignUpOtp",{email:email,ssoid:ssoid},callback)}},{key:"verifyMobileSignUp",value:function verifyMobileSignUp(mobile,ssoid,otp,callback){if(!this.isValidMobile(mobile))return callback(this.INVALID_MOBILE);this.asyncJssoCall("verifySignUpOTP",{mobile:mobile,ssoid:ssoid,otp:otp},function(response){if(response.code==200){this.createChannelCookies()}if(callback)return callback(response)}.bind(this))}},{key:"verifyEmailSignUp",value:function verifyEmailSignUp(email,ssoid,otp,callback){if(!this.isValidEmail(email))return callback(this.INVALID_EMAIL);this.asyncJssoCall("verifySignUpOTP",{email:email,ssoid:ssoid,otp:otp},function(response){if(response.code==200){this.createChannelCookies()}if(callback)return callback(response)}.bind(this))}},{key:"verifyMobileLogin",value:function verifyMobileLogin(mobile,password,callback){if(!this.isValidMobile(mobile))return callback(this.INVALID_MOBILE);this.asyncJssoCall("verifyLoginOtpPassword",{mobile:mobile,password:password},function(response){if(response.code==200){this.createChannelCookies()}if(callback)return callback(response)}.bind(this))}},{key:"verifyEmailLogin",value:function verifyEmailLogin(email,password,callback){if(!this.isValidEmail(email))return callback(this.INVALID_EMAIL);this.asyncJssoCall("verifyLoginOtpPassword",{email:email,password:password},function(response){if(response.code==200){this.createChannelCookies()}if(callback)return callback(response)}.bind(this))}},{key:"facebookLogin",value:function facebookLogin(code,facebookRedirectUri,callback){this.asyncSocialappCall("facebookLogin",{code:code,facebookRedirectUri:facebookRedirectUri},function(response){if(response.code==200){this.createChannelCookies()}if(callback)return callback(response)}.bind(this))}},{key:"googleplusLogin",value:function googleplusLogin(code,googleplusRedirectUri,callback){this.asyncSocialappCall("googleplusLogin",{code:code,googleplusRedirectUri:googleplusRedirectUri},function(response){if(response.code==200){this.createChannelCookies()}if(callback)return callback(response)}.bind(this))}},{key:"linkedinLogin",value:function linkedinLogin(code,linkedinRedirectUri,callback){this.asyncSocialappCall("linkedinLogin",{code:code,linkedinRedirectUri:linkedinRedirectUri},function(response){if(response.code==200){this.createChannelCookies()}if(callback)return callback(response)}.bind(this))}},{key:"getUserProfile",value:function getUserProfile(callback){this.asyncJssoCall("getUserProfile",{},callback)}},{key:"getUserDetails",value:function getUserDetails(callback){this.asyncJssoCall("getUserDetails",{},callback)}},{key:"getMobileLoginOtp",value:function getMobileLoginOtp(mobile,callback){if(!this.isValidMobile(mobile))return callback(this.INVALID_MOBILE);this.asyncJssoCall("getLoginOtp",{mobile:mobile},callback)}},{key:"getEmailLoginOtp",value:function getEmailLoginOtp(email,callback){if(!this.isValidEmail(email))return callback(this.INVALID_EMAIL);this.asyncJssoCall("getLoginOtp",{email:email},callback)}},{key:"updateUserProfile",value:function updateUserProfile(firstName,lastName,gender,dob,city,termsAccepted,shareDataAllowed,callback){this.asyncJssoCall("updateUserProfile",{firstName:firstName,lastName:lastName,gender:gender,dob:dob,city:city,termsAccepted:termsAccepted,shareDataAllowed:shareDataAllowed},callback)}},{key:"getMobileForgotPasswordOtp",value:function getMobileForgotPasswordOtp(mobile,callback){if(!this.isValidMobile(mobile))return callback(this.INVALID_MOBILE);this.asyncJssoCall("getForgotPasswordOtp",{mobile:mobile},callback)}},{key:"getEmailForgotPasswordOtp",value:function getEmailForgotPasswordOtp(email,callback){if(!this.isValidEmail(email))return callback(this.INVALID_EMAIL);this.asyncJssoCall("getForgotPasswordOtp",{email:email},callback)}},{key:"verifyMobileForgotPassword",value:function verifyMobileForgotPassword(mobile,otp,password,confirmPassword,callback){if(!this.isValidMobile(mobile))return callback(this.INVALID_MOBILE);if(!this.isValidPassword(password))return callback(this.INVALID_PASSWORD);this.asyncJssoCall("verifyForgotPassword",{mobile:mobile,otp:otp,password:password,confirmPassword:confirmPassword},callback)}},{key:"verifyEmailForgotPassword",value:function verifyEmailForgotPassword(email,otp,password,confirmPassword,callback){if(!this.isValidEmail(email))return callback(this.INVALID_EMAIL);if(!this.isValidPassword(password))return callback(this.INVALID_PASSWORD);this.asyncJssoCall("verifyForgotPassword",{email:email,otp:otp,password:password,confirmPassword:confirmPassword},callback)}},{key:"loginMobileForgotPassword",value:function loginMobileForgotPassword(mobile,otp,password,confirmPassword,callback){if(!this.isValidMobile(mobile))return callback(this.INVALID_MOBILE);if(!this.isValidPassword(password))return callback(this.INVALID_PASSWORD);this.asyncJssoCall("loginForgotPassword",{mobile:mobile,otp:otp,password:password,confirmPassword:confirmPassword},function(response){if(response.code==200){this.createChannelCookies()}if(callback)return callback(response)}.bind(this))}},{key:"loginEmailForgotPassword",value:function loginEmailForgotPassword(email,otp,password,confirmPassword,callback){if(!this.isValidEmail(email))return callback(this.INVALID_EMAIL);if(!this.isValidPassword(password))return callback(this.INVALID_PASSWORD);this.asyncJssoCall("loginForgotPassword",{email:email,otp:otp,password:password,confirmPassword:confirmPassword},function(response){if(response.code==200){this.createChannelCookies()}if(callback)return callback(response)}.bind(this))}},{key:"signOutUser",value:function signOutUser(callback){this.asyncJssoCall("signOutUser",{},function(response){this.deleteChannelCookies();if(callback)return callback(response)}.bind(this))}},{key:"updateMobile",value:function updateMobile(mobile,callback){if(!this.isValidMobile(mobile))return callback(this.INVALID_MOBILE);this.asyncJssoCall("updateMobile",{mobile:mobile},callback)}},{key:"verifyMobile",value:function verifyMobile(mobile,otp,callback){if(!this.isValidMobile(mobile))return callback(this.INVALID_MOBILE);this.asyncJssoCall("verifyMobile",{mobile:mobile,otp:otp},callback)}},{key:"addAlternateEmail",value:function addAlternateEmail(email,callback){if(!this.isValidEmail(email))return callback(this.INVALID_EMAIL);this.asyncJssoCall("addAlternateEmail",{email:email},callback)}},{key:"verifyAlternateEmail",value:function verifyAlternateEmail(email,otp,callback){if(!this.isValidEmail(email))return callback(this.INVALID_EMAIL);this.asyncJssoCall("verifyAlternateEmail",{email:email,otp:otp},callback)}},{key:"linkFacebook",value:function linkFacebook(code,redirectUri,callback){this.asyncJssoCall("linkSocial",{oauthSiteId:"facebook",oauthCode:code,redirectUri:redirectUri},callback)}},{key:"linkGoogleplus",value:function linkGoogleplus(code,redirectUri,callback){this.asyncJssoCall("linkSocial",{oauthSiteId:"googleplus",oauthCode:code,redirectUri:redirectUri},callback)}},{key:"linkLinkedin",value:function linkLinkedin(code,redirectUri,callback){this.asyncJssoCall("linkSocial",{oauthSiteId:"linkedin",oauthCode:code,redirectUri:redirectUri},callback)}},{key:"delinkSocial",value:function delinkSocial(source,callback){this.asyncJssoCall("delinkSocial",{oauthSiteId:source},callback)}},{key:"setPassword",value:function setPassword(newPass,confirmPass,callback){if(!this.isValidPassword(newPass))return callback(this.INVALID_PASSWORD);this.asyncJssoCall("setPassword",{newPassword:newPass,confirmPassword:confirmPass},callback)}},{key:"changePassword",value:function changePassword(oldPass,newPass,confirmPass,callback){if(!this.isValidPassword(newPass))return callback(this.INVALID_PASSWORD);this.asyncJssoCall("changePassword",{oldPassword:oldPass,newPassword:newPass,confirmPassword:confirmPass},callback)}},{key:"changePrimaryEmail",value:function changePrimaryEmail(emailId,callback){if(!this.isValidEmail(emailId))return callback(this.INVALID_EMAIL);this.asyncJssoCall("changePrimaryEmail",{emailId:emailId},callback)}},{key:"facebookLoginAccessToken",value:function facebookLoginAccessToken(accessToken,facebookRedirectUri,callback){this.asyncSocialappCall("facebookLogin",{accessToken:accessToken,facebookRedirectUri:facebookRedirectUri},function(response){if(response.code==200){this.createChannelCookies()}if(callback)return callback(response)}.bind(this))}},{key:"linkFacebookAccessToken",value:function linkFacebookAccessToken(accessToken,redirectUri,callback){this.asyncJssoCall("linkSocial",{oauthSiteId:"facebook",accessToken:accessToken,redirectUri:redirectUri},callback)}},{key:"socialImageUpload",value:function socialImageUpload(oauthSiteId,callback){this.asyncJssoCall("socialImageUpload",{oauthSiteId:oauthSiteId},callback)}},{key:"updateProfilePic",value:function updateProfilePic(file,callback){var apiUrl=this.ssoBaseUrl+"uploadProfilePic";var formData=new FormData(this);formData.append("datafile",file);var x=new XMLHttpRequest;x.open("POST",apiUrl);x.timeout=3e4;x.withCredentials=true;x.setRequestHeader("channel",this.channel);x.setRequestHeader("platform",this.platform);x.setRequestHeader("sdkVersion",this.sdkVersion);x.setRequestHeader("IsJssoCrosswalk","true");x.setRequestHeader("csrfToken",this.csrfToken);x.setRequestHeader("ssec",this.ssec);x.setRequestHeader("tksec",this.tksec);x.responseType="json";x.onload=function(){var response=x.response;if(typeof response=="string"){response=JSON.parse(response)}if(!response||!response.code){this.deleteChannelCookies();if(callback)callback(this.UNAUTHORIZED_ACCESS_RESPONSE);return}if(response.code==404){this.deleteChannelCookies();if(callback)callback(response);return}if(x.getResponseHeader("csrfToken"))this.csrfToken=x.getResponseHeader("csrfToken");if(x.getResponseHeader("ssec"))this.ssec=x.getResponseHeader("ssec");if(x.getResponseHeader("tksec"))this.tksec=x.getResponseHeader("tksec");if(callback)return callback(response)}.bind(this);x.onerror=function(){if(callback)return callback(this.CONNECTION_ERROR_RESPONSE)}.bind(this);x.ontimeout=function(){if(callback)return callback(this.CONNECTION_TIMEOUT_RESPONSE)}.bind(this);x.send(formData)}},{key:"registerOnlyMobile",value:function registerOnlyMobile(firstName,lastName,gender,mobile,termsAccepted,shareDataAllowed,callback){if(!mobile)return callback(this.INVALID_REQUEST);if(mobile&&!this.isValidMobile(mobile))return callback(this.INVALID_MOBILE);this.asyncJssoCall("registerOnlyMobile",{firstName:firstName,lastName:lastName,gender:gender,mobile:mobile,termsAccepted:termsAccepted,shareDataAllowed:shareDataAllowed},callback)}},{key:"truecallerLogin",value:function truecallerLogin(mobile,callback){if(!mobile)return callback(this.INVALID_REQUEST);if(mobile&&!this.isValidMobile(mobile))return callback(this.INVALID_MOBILE);this.asyncJssoCall("truecallerLogin",{mobile:mobile},callback)}},{key:"truecallerVerify",value:function truecallerVerify(requestId,callback){if(!requestId)return callback(this.INVALID_REQUEST);this.asyncJssoCall("truecallerVerify",{requestId:requestId},function(response){if(response.code==200){this.createChannelCookies()}if(callback)return callback(response)}.bind(this))}},{key:"addAlternateEmailTrap",value:function addAlternateEmailTrap(email,password,alterEmail,callback){if(!this.isValidEmail(email))return callback(this.INVALID_EMAIL);this.asyncJssoCall("addAlternateEmailIdTrap",{email:email,password:password,alterEmail:alterEmail},callback)}},{key:"verifyAlternateEmailTrap",value:function verifyAlternateEmailTrap(email,password,alterEmail,otp,callback){if(!this.isValidEmail(email))return callback(this.INVALID_EMAIL);this.asyncJssoCall("verifyAlternateEmailIdTrap",{email:email,password:password,alterEmail:alterEmail,otp:otp},callback)}},{key:"addAlternateMobileTrap",value:function addAlternateMobileTrap(email,password,alterMobile,callback){if(!this.isValidEmail(email))return callback(this.INVALID_EMAIL);this.asyncJssoCall("addAlternateEmailIdTrap",{email:email,password:password,alterMobile:alterMobile},callback)}},{key:"verifyAlternateMobileTrap",value:function verifyAlternateMobileTrap(email,password,alterMobile,otp,callback){if(!this.isValidEmail(email))return callback(this.INVALID_EMAIL);this.asyncJssoCall("verifyAlternateMobileTrap",{email:email,password:password,alterMobile:alterMobile,otp:otp},callback)}},{key:"deleteAccount",value:function deleteAccount(password,callback){this.asyncJssoCall("deleteUser",{password:password},callback)}},{key:"createChannelCookies",value:function createChannelCookies(){var now=new Date;var midnight=new Date(now);midnight.setHours(24,0,0,0);this.createCookie("jsso_crosswalk_login_"+this.channel,"true",30*24*60*60*1e3);this.createCookie("jsso_crosswalk_daily_"+this.channel,"true",midnight-now);this.createCookie("jsso_crosswalk_csrfToken_"+this.channel,this.csrfToken,30*24*60*60*1e3);this.createCookie("jsso_crosswalk_ssec_"+this.channel,this.ssec,30*24*60*60*1e3);this.createCookie("jsso_crosswalk_tksec_"+this.channel,this.tksec,30*24*60*60*1e3)}},{key:"getChannelCookies",value:function getChannelCookies(){var channelCookies={};channelCookies.login=this.getCookie("jsso_crosswalk_login_"+this.channel);channelCookies.daily=this.getCookie("jsso_crosswalk_daily_"+this.channel);return channelCookies}},{key:"deleteChannelCookies",value:function deleteChannelCookies(){this.deleteCookieByName("jsso_crosswalk_login_"+this.channel);this.deleteCookieByName("jsso_crosswalk_daily_"+this.channel);this.deleteCookieByName("jsso_crosswalk_csrfToken_"+this.channel);this.deleteCookieByName("jsso_crosswalk_ssec_"+this.channel);this.deleteCookieByName("jsso_crosswalk_tksec_"+this.channel)}},{key:"getCookie",value:function getCookie(cname){var name=cname+"=";var decodedCookie=decodeURIComponent(document.cookie);var ca=decodedCookie.split(";");for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==" "){c=c.substring(1)}if(c.indexOf(name)==0){return c.substring(name.length,c.length)}}return""}},{key:"deleteCookieByName",value:function deleteCookieByName(name){document.cookie=name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"}},{key:"createCookie",value:function createCookie(name,value,expiryInMillis){var now=new Date;var expireTime=now.getTime()+expiryInMillis;now.setTime(expireTime);document.cookie=name+"="+value+"; expires="+now.toGMTString()+"; path=/"}},{key:"isValidEmail",value:function isValidEmail(email){var re=/^(([^<>()\[\]\\.,;:\s@"]+([^<>()\[\]\\,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return re.test(String(email).toLowerCase())}},{key:"isValidMobile",value:function isValidMobile(mobile){var re=/^(((\+?\(91\))|0|((00|\+)?91))-?)?[7-9]\d{9}$/;return re.test(String(mobile))}},{key:"isValidPassword",value:function isValidPassword(password){password=String(password);var re1=/.*[a-z]+.*/;var re2=/.*[!@#$%^&*()]+.*/;var re3=/.*[0-9]+.*/;if(password.length<6||password.length>14)return false;if(re1.test(password)&&re2.test(password)&&re3.test(password))return true;return false}}]);return JssoCrosswalk}();
