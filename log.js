import React, { useState, useEffect, useRef,useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Animated,
  ActivityIndicator,
  BackHandler,
  Pressable,
  
} from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import validator from 'validator';
import InternetCheck from './InternetCheck';
import DeviceInfo from 'react-native-device-info';
import { Dimensions } from 'react-native';
import { base_url, MainBaseUrl } from './Assets/CommonData';
import { useAndroidBackHandler } from 'react-navigation-backhandler';
import { GetLocalStorageItems } from './Assets/CommonData';
import AppLogo from '../images/HilalInvest.png';
import Finger_icon from '../images/fingerprint_icon.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaskInput from 'react-native-mask-input';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { ALL_Profile_API } from './Assets/CommonData';
import RNOtpVerify from 'react-native-otp-verify';
import ErorrModel from './ErorrModel';
import { PakistanFlag } from './Assets/CommonData';
import TouchID from 'react-native-touch-id';
import { DeviceEventEmitter } from 'react-native';
import { NativeModules } from 'react-native';


// Responsive guides
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 412;
const guidelineBaseHeight = 892;
const horizontalScale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;
// Responsive guides

export let LoginObj = {
  Email: 'mohsinmemon311@gmail.com',
  MobileNumber: '03312544525',
  FirstName: 'Imran Ahmed',
};
export var UserLoginObj = {
  UserName: null,
  UserEmail: null,
  UserNumber: null,
};
export let a = 1;
export let MobileToken;
let ImageWidth;
let ImageWidth1;
let AppMarginTop;
let InputAppMarginTop = '1%';
let BetweenImgAndInputMarginTop = '0%';
let windowHeight = Dimensions.get('window').height;

function LogIn({ navigation }) {
  console.log("LoginScreen ------>>>")
  const [updateAppModel, setUpdateAppModel] = useState(false);

  const [commonModalshow, setCommonModalshow] = useState(false);
  const [commonModalHeading, setCommonModalHeading] = useState('');
  const [commonModalMsg, setCommonModalMsg] = useState('');

  const [modalshow, setmodalshow] = useState(false);
  const [modalHeading, setmodalHeading] = useState('');
  const [modalMsg, setmodalMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showIcon, setShowIcon] = useState(false);
  const [updateSate, setUpdateSate] = useState(true);
  const [loader, setLoader] = useState(false);
  const [InvalidPhon_no, setInvalidPhon_no] = useState(false);

  // Phone Number States
  const [number, setNumber] = useState('');
  const [phoneNoErrormsg, setPhoneNoErrormsg] = useState('');
  const [isFocusedNumber, setIsFocusedNumber] = useState(false);
  const handleFocusNumber = () => {
    setIsFocusedNumber(true),
      setselected({
        name: 'Pakistan',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Pakistan.png/1024px-Flag_of_Pakistan.png',
        code: '+92',
      });
  };
  const handleBlurNumber = () => {
    setIsFocusedNumber(false);
    if (number.length == 0) {
      setselected({
        name: '',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Pakistan.png/1024px-Flag_of_Pakistan.png',
        code: '+92',
      });
    } else {
      setselected({
        name: 'Pakistan',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Pakistan.png/1024px-Flag_of_Pakistan.png',
        code: '+92',
      });
    }
  };

  const [clearInputValue, setClearInputValue] = useState(false);
  const [code, setCode] = useState();
  //   Input fields states

  const [phoneNoError, setphoneNoError] = useState('none');
  const [codeNoError, setcodeNoError] = useState('none');
  const [codeErrormsg, setCodeErrormsg] = useState(
    'Incorrect pin. Kindly try again.',
  );

  const [phoneNoExitsError, setphoneNoExitsError] = useState('none');
  const [phoneNoExitsmsg, setphoneNoExitsmsg] = useState(
    'Account does not exist',
  );

  const [passwordModel, setPasswordModel] = useState(false);

  const [visible, setvisible] = useState(false);
  const [loginStp1, setLoginStp1] = useState(0);

  //   country code modal
  const [CountryCodeModal, setCountryCodeModal] = useState(false);
  const [selected, setselected] = useState({
    name: '',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Pakistan.png/1024px-Flag_of_Pakistan.png',
    code: '+92',
  });

  const CountryCodeData = [
    {
      id: 1,
      FlagUri:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Pakistan.png/1024px-Flag_of_Pakistan.png',
      countryCode: '+92',
      countryName: 'Pakistan',
    },
    {
      id: 2,
      FlagUri: 'https://cdn-icons-png.flaticon.com/512/197/197618.png',
      countryCode: '+974',
      countryName: 'Qatar',
    },
    {
      id: 3,
      FlagUri: 'https://cdn-icons-png.flaticon.com/512/323/323301.png',
      countryCode: '+971',
      countryName: 'United Arab Emirates',
    },
    {
      id: 4,
      FlagUri:
        'https://cdn.countryflags.com/thumbs/saudi-arabia/flag-round-250.png',
      countryCode: '+966',
      countryName: 'Saudi Arabia',
    },
    {
      id: 5,
      FlagUri: 'https://cdn.countryflags.com/thumbs/oman/flag-round-250.png',
      countryCode: '+968',
      countryName: 'Oman',
    },
  ];
                                                      //  fingerprint ahmed
                                                      const CustomFingerprintModule = NativeModules.CustomFingerprintModule;

                                                      const [logoutModal, setLogoutModal] = useState(false);
                                                      const [loginModal, setLoginModal] = useState(false);
                                                      const [notModal, setnotModal] = useState(false);
                                                      
                                                      const onCustomFingerprintAuthentication = useCallback((success) => {
                                                          if (success) {
                                                              console.log("success---->", success);
                                                              // Alert.alert('Success', 'Fingerprint authentication successful!');
                                                              // navigation.navigate('BottomHome1', { screen: 'BottomHome' });
                                                          } else {
                                                              setnotModal(true);
                                                          }
                                                      }, []);
                                                      
                                                      const onNoFingerprintsEnrolled = useCallback((data) => {
                                                          console.log("no fingerprints enrolled---->", data.message);
                                                          setLogoutModal(true);
                                                      }, []);
                                                      
                                                      const onNewFingerprintsEnrolled = useCallback((data) => {
                                                          console.log("fingerprints enrolled---->", data.message);
                                                          setLoginModal(true);
                                                      }, []);
                                                      
                                                      const checkFingerprints = useCallback(() => {
                                                          if (CustomFingerprintModule && CustomFingerprintModule.checkForNewFingerprints) {
                                                              CustomFingerprintModule.checkForNewFingerprints();
                                                          } else {
                                                              console.error('CustomFingerprintModule.checkForNewFingerprints is not available');
                                                          }
                                                      }, []);
                                                      
                                                      const startAuthentication = useCallback(() => {
                                                          if (CustomFingerprintModule && CustomFingerprintModule.showFingerprintDialog) {
                                                              CustomFingerprintModule.showFingerprintDialog();
                                                          } else {
                                                              console.error('CustomFingerprintModule.showFingerprintDialog is not available');
                                                          }
                                                      }, []);
                                                      
                                                      useEffect(() => {
                                                          console.log("Setting up event listeners");
                                                          const authSubscription = DeviceEventEmitter.addListener('onCustomFingerprintAuthentication', onCustomFingerprintAuthentication);
                                                          const noFingerprintsSubscription = DeviceEventEmitter.addListener('onNoFingerprintsEnrolled', onNoFingerprintsEnrolled);
                                                          const fingerprintsEnrolledSubscription = DeviceEventEmitter.addListener('onNewFingerprintsEnrolled', onNewFingerprintsEnrolled);
                                                      
                                                          return () => {
                                                              authSubscription.remove();
                                                              noFingerprintsSubscription.remove();
                                                              fingerprintsEnrolledSubscription.remove();
                                                          };
                                                      }, [onCustomFingerprintAuthentication, onNoFingerprintsEnrolled, onNewFingerprintsEnrolled]);
                                                   
                                                   
                                                   
                                                   
                                                   
                                                   
                                                   
                                                                         // fingerprint ahmed

  const [emailError, setemailError] = useState('none');

  const [signLoader, setSignLoader] = useState(false);
  const [signLoader1, setSignLoader1] = useState(false);

  useAndroidBackHandler(() => {
    const backAction = () => {
      BackHandler.exitApp()
      //   setlogOutpopup(true);
      // () => { BackHandler.exitApp() }
      console.log('Chal raha hai')
      return true;
    };

    if (true) {
      backAction();
      return true;
    }
    return false;
  });

  const ShowPassword = () => {
    setShowIcon(true);
    setUpdateSate(false);
  };

  const HidePassword = () => {
    setShowIcon(false);
    setUpdateSate(true);
  };

  const [getHash, setgetHash] = useState();
  useEffect(() => {
    RNOtpVerify.getHash()
      .then(hash => {
        setgetHash(hash);
        console.log('HashKey in SigIn=====>', hash);
      })
      .catch(console.log);
  }, []);

  let GotoHome = () => {
    navigation.navigate('Home');
  };
  let GotoRAF = () => {
    navigation.navigate('RafForm');
  };
  let GotoChangePass = () => {
    navigation.navigate('ChangePass');
  };
  let BeforeRAFPage = () => {
    navigation.navigate('BeforeRAF');
  };

  GetLocalStorageItems('fcmToken')
    .then(data => data)
    .then(value => {
      MobileToken = value;
      // console.log("MobileToken  " , MobileToken)
    })
    .catch(err => console.log(err));

  // const save_data1 = () => {
  //   setLoader(true)
  //   save_data()
  // }

  const LoaderFun = () => {
    setLoader(false);
  };

  const removeItemValue = async abc => {
    try {
      const che = await AsyncStorage.removeItem(abc + 'CurrentTime');
      // console.log('removeItemValue working==>',che)
      return true;
    } catch (exception) {
      // console.log('removeItemValue not working')
      return false;
    }
  };

  let GetUserNumber = async () => {
    let GetData = await AsyncStorage.getItem('GetUserNumber');
    if (GetData) {
      console.log('--->if Get mobile number--->', GetData);
      setNumber(GetData)
    } else {

      console.log('--->else Get mobile number--->', GetData);
    }
  };

  useEffect(() => {
    GetUserNumber();
  }, [!navigation]);

 
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setselected({
        name: '',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Pakistan.png/1024px-Flag_of_Pakistan.png',
        code: '+92',
      });
      // setNumber('');
      setPhoneNoErrormsg('');
      GetUserNumber();
      console.log('Refreshed Login Screen!');
    });
    return unsubscribe;
  }, [navigation]);

  let fetchData = 'No';

  // const save_data = () => {

  //   Keyboard.dismiss()
  //   if (code && number) {
  //     if (code.length == 4) {

  //       // var checkLogInEmail = TrimEmail
  //       // let abc = checkLogInEmail.toLowerCase();
  //       // MobileToken
  //       setSignLoader1(true)
  //       setcodeNoError('none')
  //       fetch(`${MainBaseUrl}login_api.php?key=0kN0t4mnycfBAmzArERFrGi1AHkvfv&pin=${code}&mobileNo=${'0' + number}&Device_token=${MobileToken}`)
  //         .then(res => res.json())
  //         .then(data => { LoginObj = data; return LoginObj })
  //         .then(() => {
  //           console.log('login_api===>', LoginObj)

  //           if (LoginObj.status == 200 && LoginObj.response.message == 'Success') {
  //             setcodeNoError('none')
  //             LoginObj = LoginObj.response.detail;
  //             removeItemValue(abc)
  //             HidePassword()
  //             let abc = LoginObj.response.detail.Email
  //             // ALL_Profile_API(LoginObj.response.detail.Email)
  //             setSignLoader1(false)
  //             // setLoginStp1(0)
  //             setCode('')
  //             setNumber('')

  //             // if (1.5.3 === parseFloat(LoginObj.AppVersion)) {
  //             // if (DeviceInfo.getVersion() === LoginObj.AppVersion) {

  //             //   console.log('DeviceInfo.getVersion()==>', (DeviceInfo.getVersion()), typeof ((DeviceInfo.getVersion())))
  //             //   console.log('LoginObj.AppVersion==>', (LoginObj.AppVersion), typeof ((LoginObj.AppVersion)))
  //             //   // MobileToken API
  //             //   fetch(`${base_url}token_api.php?email=${abc}&Device_token=${MobileToken}`)
  //             //     .then(res => res.text())
  //             //     .then(data => { console.log('Device_token_api===>', data) })
  //             //     .catch((error) => console.log('Device_token_api===>', error))

  //             //   if (LoginObj.Check == 'Yes') {
  //             //     if (LoginObj.RAF == 'No') {
  //             //       // GotoRAF()
  //             //       BeforeRAFPage()
  //             //     }
  //             //     else {
  //             //       GotoHome();
  //             //     }
  //             //   }
  //             //   else {
  //             //     GotoChangePass()
  //             //   }

  //             //   setEmail("")
  //             //   setPassword("")03422929811
  //             //   LoaderFun()

  //             // }
  //             // else {
  //             //   // console.log('not Equal hai==>')
  //             //   LoaderFun()
  //             //   setUpdateAppModel(true)

  //             // }

  //             console.log('new login OBJ', LoginObj)
  //             if (LoginObj.Check == 'Yes') {
  //               if (LoginObj.RAF == 'No') {
  //                 // GotoRAF()
  //                 BeforeRAFPage()
  //               }
  //               else {
  //                 GotoHome();
  //               }
  //             }
  //             else {
  //               GotoChangePass()
  //             }

  //           }

  //           else if (LoginObj.status == 404 && LoginObj.error.message == 'Incorrect ID or Password') {
  //             // Alert.alert('Login Failed!', 'Your email or password is incorrect. Please try again.'),

  //             setcodeNoError('flex')
  //             // LoaderFun()
  //             setSignLoader1(false)
  //             // setmodalshow(true)
  //             // setmodalHeading('Login failed!')
  //             // setmodalMsg('Your email or password is incorrect. Please try again.')
  //             // setemailPassError(false)
  //             // setemailErro(false)
  //             // setNoUserError(false)
  //             // setemailPassincoError(true)
  //             console.log('Your email or password is incorrect. Please try again.')

  //           }
  //           else if (LoginObj.Message == 'Email not registered') {
  //             //  Alert.alert('Error:', 'No user is registered with this email address.'),

  //             LoaderFun()
  //             setmodalshow(true)
  //             setmodalHeading("Error!")
  //             setmodalMsg('No user is registered with this email address.')
  //             // setemailPassError(false)
  //             // setemailErro(false)
  //             // setNoUserError(true)
  //             // setemailPassincoError(false)
  //             console.log('No user is registered with this email address.')
  //           }
  //           else {

  //             LoaderFun()
  //             setmodalshow(true)
  //             setmodalHeading("Error!")
  //             setmodalMsg('No user is registered with this email address.')
  //             // setemailPassError(false)
  //             // setemailErro(false)
  //             // setNoUserError(true)
  //             // setemailPassincoError(false)
  //             console.log('No user is registered with this email address.')
  //           }

  //         })
  //         .catch((error) => {
  //           setmodalshow(true)
  //           setmodalHeading("Network problem!")
  //           setmodalMsg('Network request failed.')
  //           console.log('error====23', error),
  //             LoaderFun()

  //         })

  //     }
  //     else {
  //       // (Alert.alert("Invalid Email!", "The email address entered is invalid."),)
  //       LoaderFun()
  //       setmodalshow(true)
  //       setmodalHeading('Login failed!')
  //       setmodalMsg('The email address entered is invalid.')
  //       console.log('The email address entered is invalid.')
  //     }
  //   }
  //   else {

  //     setmodalshow(true)
  //     setmodalHeading("Invalid fields!")
  //     setmodalMsg('Email & Password are required.')
  //     // setemailPassError(true)
  //     // setemailErro(false)
  //     // setNoUserError(false)
  //     // setemailPassincoError(false)
  //     // Alert.alert("Invalid Fields!", "Email & Password are required."),
  //     console.log("Email & Password are required.")
  //     LoaderFun()
  //   }
  // }
  // const save_data = () => {
  //   Keyboard.dismiss()
  //   let TrimEmail = email.trim();
  //   if (email && password) {
  //     if (validator.isEmail(TrimEmail)) {

  //       var checkLogInEmail = TrimEmail
  //       let abc = checkLogInEmail.toLowerCase();

  //       console.log(abc, password)

  //       // fetch(`${base_url}profile_api.php?email=${abc}`)
  //       //   .then(res => res.json())
  //       //   .then(data => {
  //       //     console.log('profile_api===>', data)
  //       //     fetchData = data
  //       //   })
  //       //   .catch((error) => console.log('email&PassError===>', error))

  //       fetch(`${MainBaseUrl}login_api.php?key=0kN0t4mnycfBAmzArERFrGi1AHkvfv&email=${abc}&pass=${password}`)
  //         .then(res => res.json())
  //         .then(data => { LoginObj = data; return LoginObj })
  //         .then(() => {
  //           console.log('login_api===>', LoginObj)

  //           if (LoginObj.Message == 'Success') {
  //             removeItemValue(abc)
  //             HidePassword()

  //             // if (1.5.3 === parseFloat(LoginObj.AppVersion)) {
  //             if (DeviceInfo.getVersion() === LoginObj.AppVersion) {

  //               console.log('DeviceInfo.getVersion()==>', (DeviceInfo.getVersion()), typeof ((DeviceInfo.getVersion())))
  //               console.log('LoginObj.AppVersion==>', (LoginObj.AppVersion), typeof ((LoginObj.AppVersion)))
  //               // MobileToken API
  //               fetch(`${base_url}token_api.php?email=${abc}&Device_token=${MobileToken}`)
  //                 .then(res => res.text())
  //                 .then(data => { console.log('Device_token_api===>', data) })
  //                 .catch((error) => console.log('Device_token_api===>', error))

  //               if (LoginObj.Check == 'Yes') {
  //                 if (LoginObj.RAF == 'No') {
  //                   // GotoRAF()
  //                   BeforeRAFPage()
  //                 }
  //                 else {
  //                   GotoHome();
  //                 }
  //               }
  //               else {
  //                 GotoChangePass()
  //               }

  //               setEmail("")
  //               setPassword("")
  //               LoaderFun()

  //               //   setTimeout(() => {
  //               //   if (LoginObj.Check == 'Yes') {
  //               //     if (fetchData.RAF == 'No') {
  //               //       // GotoRAF()
  //               //       BeforeRAFPage()
  //               //     }
  //               //     else {
  //               //       GotoHome();
  //               //     }
  //               //   }
  //               //   else (
  //               //     GotoChangePass()
  //               //   )
  //               //   setEmail("")
  //               //   setPassword("")
  //               //   LoaderFun()
  //               // }, 2000);
  //             }
  //             else {
  //               // console.log('not Equal hai==>')
  //               LoaderFun()
  //               setUpdateAppModel(true)

  //             }
  //           }

  //           else if (LoginObj.Message == 'Incorrect ID or Password') {
  //             // Alert.alert('Login Failed!', 'Your email or password is incorrect. Please try again.'),
  //             LoaderFun()
  //             setmodalshow(true)
  //             setmodalHeading('Login failed!')
  //             setmodalMsg('Your email or password is incorrect. Please try again.')
  //             // setemailPassError(false)
  //             // setemailErro(false)
  //             // setNoUserError(false)
  //             // setemailPassincoError(true)
  //             console.log('Your email or password is incorrect. Please try again.')

  //           }
  //           else if (LoginObj.Message == 'Email not registered') {
  //             //  Alert.alert('Error:', 'No user is registered with this email address.'),

  //             LoaderFun()
  //             setmodalshow(true)
  //             setmodalHeading("Error!")
  //             setmodalMsg('No user is registered with this email address.')
  //             // setemailPassError(false)
  //             // setemailErro(false)
  //             // setNoUserError(true)
  //             // setemailPassincoError(false)
  //             console.log('No user is registered with this email address.')
  //           }
  //           else {

  //             LoaderFun()
  //             setmodalshow(true)
  //             setmodalHeading("Error!")
  //             setmodalMsg('No user is registered with this email address.')
  //             // setemailPassError(false)
  //             // setemailErro(false)
  //             // setNoUserError(true)
  //             // setemailPassincoError(false)
  //             console.log('No user is registered with this email address.')
  //           }

  //         })
  //         .catch((error) => {
  //           setmodalshow(true)
  //           setmodalHeading("Network problem!")
  //           setmodalMsg('Network request failed.')
  //           console.log('error====23', error),
  //             LoaderFun()

  //         })

  //     }
  //     else {
  //       // (Alert.alert("Invalid Email!", "The email address entered is invalid."),)
  //       LoaderFun()
  //       setmodalshow(true)
  //       setmodalHeading('Login failed!')
  //       setmodalMsg('The email address entered is invalid.')
  //       console.log('The email address entered is invalid.')
  //     }
  //   }
  //   else {

  //     setmodalshow(true)
  //     setmodalHeading("Invalid fields!")
  //     setmodalMsg('Email & Password are required.')
  //     // setemailPassError(true)
  //     // setemailErro(false)
  //     // setNoUserError(false)
  //     // setemailPassincoError(false)
  //     // Alert.alert("Invalid Fields!", "Email & Password are required."),
  //     console.log("Email & Password are required.")
  //     LoaderFun()
  //   }
  // }

  // const optionalConfigObject = {
  //   title: "Please Authenticate", // Android
  //   imageColor: "#194165", // Android
  //   imageErrorColor: "#ff0000", // Android
  //   sensorDescription: "Slightly Touch sensor", // Android
  //   sensorErrorDescription: "Failed", // Android
  //   cancelText: "Cancel", // Android
  //   fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
  //   unifiedErrors: false, // use unified error messages (default false)
  //   passcodeFallback: false, // iOS
  // };
  
  // const handleBiometricCheck = () => {
  //   if (Platform.OS === 'android' || Platform.OS === 'ios') {
  //     TouchID.isSupported()
  //       .then(() => {
  //         // Biometric authentication is supported
  //         TouchID.authenticate('Authenticate to check biometrics', optionalConfigObject)
  //           .then(() => {
  //             // Biometric authentication successful
  //             getFingerprintCount((fingerprintCount) => {
  //               console.log('fingerprintCount--->', fingerprintCount);
  //               if (fingerprintCount > 1) {
  //                 // User has more than one fingerprint enrolled
  //                 Alert.alert(
  //                   'Multiple Fingerprints Detected',
  //                   'You have multiple fingerprints enrolled on this device.'
  //                 );
  //               } else {
  //                 // User has only one fingerprint enrolled
  //                 Alert.alert(
  //                   'Biometric Authentication Enabled',
  //                   'Authentication Successful.',
  //                   [
  //                     {
  //                       text: 'OK',
  //                       onPress: () => {
  //                         // Proceed to the home page or perform your app logic here
  //                         // navigateToNextPage();
  //                       },
  //                     },
  //                   ]
  //                 );
  //               }
  //             });
  //           })
  //           .catch((error) => {
  //             // Biometric authentication failed or not set up
  //             Alert.alert(
  //               'Biometric Authentication Failed',
  //               'Authentication failed. Please try again or use another method.'
  //             );
             
  //           });
  //       })
  //       .catch(() => {
  //         // Biometric authentication not supported
       
  //         // navigation.navigate('fingerprintlogin');
  //         Alert.alert('Biometric Not Supported', 'Biometric authentication is not available on this device.');
  //       });
  //   }else {
  //     // For other environments, use your custom logic or show a message
  //     Alert.alert('Biometric Check', 'Biometric check is not supported in this environment.');
  //   }
  // };
  
  // const getFingerprintCount = (callback) => {
  //   // Implement the native module or API call here to get the fingerprint count
  //   // For example, you can use separate implementations for Android and iOS
  //   // For web environments, use your custom logic or return a default value
  //   // For demonstration purposes, we'll return a default value of 1
  //   callback(1);
  // };
  
  // const handleAuth = () => {
  //   TouchID.isSupported()
  //     .then((biometryType) => {
  //       const authenticationType = biometryType === 'FaceID' ? 'FaceID' : 'Fingerprint';
  
  //       TouchID.authenticate('', optionalConfigObject)
  //         .then(() => {
  //           // Authentication successful
  //           Alert.alert(
  //             'Authentication Successful',
  //             `${authenticationType} authentication successful.`,
  //             [
  //               {
  //                 text: 'OK',
  //                 onPress: () => {
  //                   // Proceed to the home page or perform your app logic here
  //                   // navigateToNextPage();
  //                 },
  //               },
  //             ]
  //           );
  //         })
  //         .catch((error) => {
  //           // Authentication failed
  //           Alert.alert('Authentication Failed', error.message);
  //           // Retry authentication or perform any other necessary actions
  //           retryAuth();
  //         });
  //     })
  //     .catch((error) => {
  //       // Biometric authentication not supported
  //       Alert.alert('Biometric Not Supported', error.message);
  //     });
  // };
  
  // const retryAuth = () => {
  //   handleAuth();
  // };
  
  // const navigateToNextPage = () => {
  //   console.log('Navigating to the home page...');
  //   navigation.navigate('BottomHome1', { screen: 'BottomHome' });
  // };
  

  const animated = new Animated.Value(400);
  const animatedPasswordModel = new Animated.Value(400);

  const duration = 300;

  const AnimateModelStart = () => {
    Animated.timing(animated, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const AnimateModelEnd = () => {
    Animated.timing(animated, {
      toValue: 400,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setPasswordModel(false);
    });
  };

  const animatedStep = new Animated.Value(200);
  // const animatedStep = useRef(new Animated.Value(200)).current;

  const AnimateStep = () => {
    Animated.timing(animatedStep, {
      toValue: 0,
      translateY: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    AnimateModelStart();
  }, [CountryCodeModal]);

  useEffect(() => {
    Animated.timing(animatedPasswordModel, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [passwordModel]);

  const checkState = () => {
    // if (number.length == 0) {
    //   setphoneNoError('flex');
    //   setphoneNoErrormsg('Enter a valid phone number');
    // } else if (number.length == 11) {
    //   setphoneNoError('none');
    // } else {
    //   setphoneNoError('flex');
    //   setphoneNoErrormsg('Enter a valid phone number');
    // }
  };

  const Sign_data1 = () => {
    // setSignLoader(true);
    Keyboard.dismiss();
    // if (number.length == 10) {
    //   setPhoneNoErrormsg('')
    // } else {
    //   setPhoneNoErrormsg('Enter a valid phone number.');
    // }

    if (number) {
      if (number.length == 10) {
        setSignLoader(true);
        setPhoneNoErrormsg('');
        fetch(
          `${MainBaseUrl}checkMobNumber.php?number=${'0' + number
          }&key=rwf3twfpcsmkvfxd`,
        )
          .then(res => res.json())
          .then(res => {
            console.log('checkMobNumber--->', res);
            // console.log('LoginObj-->', res.response.detail);
            setSignLoader(false);
            setphoneNoExitsError('none');
            if (res.status == 200 && res.response.message == 'Success') {
              LoginObj = res.response.detail;
              ALL_Profile_API(res.response.detail.Email);
              UserLoginObj = {
                UserName: LoginObj.FullName,
                UserEmail: LoginObj.Email,
                UserRafForm: LoginObj.RAF,
                // UserNumber: '0' + number,
                isEmailVerified: LoginObj.isEmailVerified,
                UserNumber: number,
              };
              navigation.navigate('LoginOldPIN', { UserLoginObj });
              // setNumber('')
            } else if (
              res.status == 403 &&
              res.error.message == 'Pin is empty'
            ) {
              // setLoginStp1(2);
              LoginObj = res.error.detail;
              ALL_Profile_API(res.error.detail.Email);
              setPasswordModel(true);
              console.log('Pin is empty');
            } else if (
              res.status == 404 &&
              res.error.message == 'Mobile Number donot exist'
            ) {
              // setLoginStp1(2);
              // Account does not exist.
              // setphoneNoExitsError('flex')
              // setphoneNoExitsmsg('Account does not exist');
              setPhoneNoErrormsg('Account does not exist.');

              console.log('Mobile Number donot exist');
            } else {
              console.log('else chal raha hai');
            }
          })
          .catch(error => {
            // setmodalshow(true);
            // setmodalHeading('Network problem!');
            // setmodalMsg('Network request failed.');
            setCommonModalshow(true)
            setCommonModalHeading('Network problem!');
            setCommonModalMsg('Network request failed.');

            console.log('error====23', error), LoaderFun();
            setSignLoader(false);
          });
      } else {
        setPhoneNoErrormsg('Enter a valid phone number.');
      }
    } else {
      setInvalidPhon_no(false);
    }

    console.log('getted data', number);
  };

  // const Sign_data2 = () => {
  //   Keyboard.dismiss();
  //   checkState();
  //   if (code) {

  //     if (code.length == 4) {

  //       // setLoginStp1();
  //       // AnimateStep();

  //     } else {
  //       setmodalshow(true);
  //     }

  //   } else {
  //     setInvalidPhon_no(false);
  //   }

  //   console.log('getted data', code);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: '#FAFAFA',
          //   backgroundColor: 'pink',
          flexGrow: 1,
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#FAFAFA',
          }}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: horizontalScale(20),
            }}>
            {/* <TouchableOpacity
              style={{
                marginTop: verticalScale(20),
                backgroundColor: 'white',
                borderRadius: moderateScale(360),
                borderWidth: 0.5,
                borderColor: '#BABABA',
                width: horizontalScale(44),
                height: horizontalScale(44),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons name="chevron-back-outline" size={18} color="#194165" />
            </TouchableOpacity> */}

            <Text
              style={{
                marginTop: verticalScale(55),
                // marginTop: verticalScale(85),
                // marginTop: verticalScale(35),
                fontSize: moderateScale(28),
                fontFamily: 'Manrope-SemiBold',
                color: '#191919',
              }}>
              Log in
            </Text>
            <Text
              style={{
                // marginTop: '4%',
                marginTop: horizontalScale(12),
                fontSize: moderateScale(16),
                // lineHeight: 26,
                fontFamily: 'Manrope-Regular',
                color: '#191919B2',
              }}>
              Enter your registered mobile number to log in.
            </Text>

            <View
              style={{
                marginTop: verticalScale(48),
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: horizontalScale(86),
                    height: verticalScale(56),
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderColor: '#BABABA',
                    borderWidth: 0.5,
                    borderRadius: moderateScale(12),
                    paddingHorizontal: horizontalScale(11),
                    backgroundColor: 'white',
                  }}>
                  <View>
                    <View
                      style={{
                        margin: 0,
                        display: selected.name == '' ? 'none' : 'flex',
                      }}>
                      <Text
                        style={{
                          fontSize: moderateScale(10),
                          marginLeft: horizontalScale(3),
                          fontFamily: 'Manrope-Regular',
                          marginBottom:
                            selected.name == '' ? 0 : verticalScale(3),
                          color: '#818A99',
                        }}>
                        {selected.name.length > 11 ? '' : selected.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={{ uri: PakistanFlag }}
                        // source={require('../images/OnboardingAssets/PakistanFlag.png')}
                        style={{
                          width: horizontalScale(20),
                          height: horizontalScale(20),
                          borderRadius: moderateScale(360),
                          // backgroundColor: 'green',
                        }}
                      />

                      <Text
                        style={{
                          marginLeft: horizontalScale(6),
                          fontSize: moderateScale(15),
                          // fontWeight: '400',
                          fontFamily: 'Manrope-Regular',
                          color: '#191919',
                        }}>
                        {selected.code}
                      </Text>
                    </View>
                  </View>
                </View>

                <View>
                  <View
                    style={[
                      styles.inputfield,
                      {
                        width: horizontalScale(278),
                        paddingHorizontal: horizontalScale(16),
                        backgroundColor:
                          phoneNoErrormsg != ''
                            ? 'rgba(195, 54, 62, 0.05)'
                            : 'white',
                        marginTop: 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      },
                    ]}>
                    <View style={{ width: '100%' }}>
                      {isFocusedNumber || number ? (
                        <Text
                          style={[
                            styles.inputfield_Headtext,
                            {
                              fontSize:
                                isFocusedNumber || number
                                  ? moderateScale(10)
                                  : moderateScale(15),
                            },
                          ]}>
                          Phone number
                        </Text>
                      ) : null}

                      <MaskInput
                        style={styles.inputfield_text}
                        value={number}
                        placeholderTextColor={'#626262'}
                        placeholder="3XX-XXXXXXX"
                        selectTextOnFocus={false}
                        onChangeText={(masked, unmasked) => {
                          masked = masked.replace(/\s{2,}/g, ' ');
                          if (masked.replace(/\s/g, '')) {
                            if (masked.charAt(0) == 3) {
                              setNumber(masked);
                              setPhoneNoErrormsg('');
                            } else {
                              setNumber('');
                              setPhoneNoErrormsg(
                                'Number start from 3XX-XXXXXXX.',
                              );
                            }
                          } else {
                            setNumber('');
                          }
                        }}
                        keyboardType="numeric"
                        mask={[
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                        ]}
                        onFocus={handleFocusNumber}
                        onBlur={handleBlurNumber}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      // backgroundColor: 'pink',
                      marginTop: verticalScale(9),
                      marginLeft: horizontalScale(9),
                    }}>
                    {phoneNoErrormsg != '' ? (
                      <View
                        style={{
                          // padding: 5,
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Ionicons
                          name="alert-circle"
                          size={15}
                          color="#C3363E"
                        />
                        <Text
                          style={{
                            marginLeft: horizontalScale(5),
                            fontSize: moderateScale(11),
                            color: '#C3363E',
                          }}>
                          {phoneNoErrormsg}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>

              <View style={{ marginTop: verticalScale(32) }}>
                <TouchableOpacity
                  onPress={() => {
                    Sign_data1();
                  }}
                  disabled={number.length == 10 ? false : true}
                  style={{
                    backgroundColor:
                      number.length == 10 ? '#263D63' : '#263D6333',
                    // padding: 15,
                    height: horizontalScale(56),
                    width: '100%',
                    borderRadius: moderateScale(12),
                    alignItems: 'center',
                    justifyContent: 'center',
                    // marginTop: '5%',
                  }}>
                  {signLoader ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text
                      style={[
                        styles.FontStyle,
                        {
                          color: 'white',
                          fontSize: moderateScale(14),
                          // fontWeight: '500',
                          fontFamily: 'Manrope-Medium',
                        },
                      ]}>
                      Continue
                    </Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 50, alignSelf: 'center' }} onPress={checkFingerprints}>
                <Image source={require('../images/fingerprint_icon.png')} style={{ width: 114, height: 108, resizeMode: 'contain' }} />
              </TouchableOpacity>
              </View>
              

              {/* <View
                style={{
                  marginTop: verticalScale(48),
                  // width: '100%',
                  // padding: '5%',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    style={{
                      height: verticalScale(108),
                      width: horizontalScale(114),
                      resizeMode: 'contain',
                    }}
                    source={Finger_icon}
                  />
                </View>
              </View> */}
            </View>
          </View>
          <View style={{ width: '100%' }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'baseline',
                marginBottom: verticalScale(52),
              }}>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  color: '#191919',
                  fontFamily: 'Manrope-Regular',
                }}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity

                onPress={() => {
                  let ByPassScreen = true
                  navigation.replace('SignUp', { ByPassScreen });
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    fontFamily: 'Manrope-ExtraBold',
                    color: '#263D63',
                    textDecorationLine: 'underline',
                  }}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* =======modal======== */}
      <Modal transparent={true} animationType="fade" visible={CountryCodeModal}>
        <View
          style={{
            backgroundColor: '#000000b5',
            height: '100%',
            width: '100%',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.View
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: '50%',

              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              //   borderRadius: 12,
              elevation: 4,
              display: 'flex',
              //   justifyContent: 'center',
              alignItems: 'flex-start',
              position: 'absolute',
              bottom: 1,
              transform: [{ translateY: animated }],
            }}>
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => {
                // setCountryCodeModal(false);
                AnimateModelEnd();
              }}>
              <View
                style={{
                  marginTop: 8,
                  alignSelf: 'center',
                  width: '10%',
                  backgroundColor: '#79747E',
                  borderWidth: 2,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#191919',
                borderBottomColor: '#BABABA',
                borderBottomWidth: 0.5,
                padding: '6%',
              }}>
              Choose country code
            </Text>
            {CountryCodeData.map((e, index) => {
              return (
                <TouchableOpacity
                  key={e.id}
                  onPress={() => {
                    setselected({
                      flag: e.FlagUri,
                      code: e.countryCode,
                      name: e.countryName,
                    });
                    AnimateModelEnd();
                    // setCountryCodeModal(false);
                    // setMobileNetworkCodeModal(true);
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    width: '100%',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#BABABA',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: '6%',
                    }}>
                    <View>
                      <Image
                        source={{
                          uri: e.FlagUri,
                        }}
                        style={{ width: 25, height: 25, borderRadius: 100 }}
                      />
                    </View>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 14,
                        fontWeight: '500',
                        color: 'black',
                      }}>
                      {e.countryCode}{' '}
                    </Text>

                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 14,
                        fontWeight: '500',
                        color: 'black',
                      }}>
                      {' '}
                      {e.countryName}{' '}
                    </Text>
                  </View>

                  <View style={{ paddingRight: '6%' }}>
                    <View
                      style={{
                        borderColor: '#4D444C',
                        borderWidth: 2,
                        height: 20,
                        width: 20,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',

                        // display: 'flex',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        // padding: 10,
                      }}>
                      {e.countryName == selected.name ? (
                        <View
                          style={{
                            backgroundColor: '#263D63',
                            width: 10,
                            height: 10,
                            borderRadius: 100,
                          }}
                        />
                      ) : null}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </View>
      </Modal>

      {/* old user password */}

      <Modal transparent={true} animationType="fade" visible={passwordModel}>
        <View
          style={{
            backgroundColor: '#000000b5',
            height: '100%',
            width: '100%',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.View
            style={{
              backgroundColor: 'white',
              width: '100%',
              // height: '40%',

              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              //   borderRadius: 12,
              elevation: 4,
              display: 'flex',
              //   justifyContent: 'center',
              alignItems: 'flex-start',
              position: 'absolute',
              bottom: 1,
              transform: [{ translateY: animatedPasswordModel }],
            }}>
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => {
                // setCountryCodeModal(false);
                AnimateModelEnd();
              }}>
              <View
                style={{
                  marginTop: 8,
                  alignSelf: 'center',
                  width: '10%',
                  backgroundColor: '#79747E',
                  borderWidth: 2,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                borderBottomColor: '#BABABA',
                borderBottomWidth: 0.5,
                padding: '5%',
                paddingBottom: '3%',
                width: '100%',
              }}>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  color: '#191919',
                  fontFamily: 'Manrope-SemiBold',
                }}>
                Sign in process update!
              </Text>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                // borderBottomWidth: 0.5,
                // paddingVertical: 10,
                padding: '5%',
                paddingTop: '3%',
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  color: '#191919',
                  // paddingHorizontal: '5%',
                  marginBottom: '7%',
                  fontFamily: 'Manrope-Regular',
                  fontSize: moderateScale(14),
                }}>
                We have replaced passwords with a new, simpler way to sign in
                with a 5-digit PIN.
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#191919',
                  // paddingHorizontal: '5%',
                  marginBottom: '5%',
                  fontFamily: 'Manrope-Regular',
                  fontSize: moderateScale(14),
                }}>
                If you previously had a password, please create a new PIN to
                access your account.
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setSignLoader1(true);
                  UserLoginObj = {
                    UserName: LoginObj.FullName,
                    UserEmail: LoginObj.Email,
                    UserNumber: number,
                    UserOTPNumber: null,
                    UserRafForm: LoginObj.RAF,
                    UserMobileNewtwork: null,
                    UserStatus: 'OldUser',
                    UserScreenName: 'LogIn',
                    isEmailVerified: LoginObj.isEmailVerified,
                  };
                  navigation.navigate('OTP', { UserLoginObj });
                  setSignLoader1(false);
                  setPasswordModel(false);
                  // var RamNun;
                  // RamNun = Math.floor(1000 + Math.random() * 9000);
                  // console.log('RandomNumber-->', RamNun);
                  // console.log('number-->', number);
                  // console.log('LoginObj.response.detail.Email-->', LoginObj.Email);
                  // fetch(
                  //   // `${MainBaseUrl}Otp_Api.php?key=RG4wjHJfee&mnumber=${'0' + number}&code=${RamNun}&email=${LoginObj.Email}`,
                  //   `${MainBaseUrl}otpnew_api.php?key=RG4wjHJfee&mnumber=${'0' + number}&code=${RamNun}&email=${LoginObj.Email}&officecode=${getHash}`,
                  //   )
                  //   .then(res => res.json())
                  //   .then(data => {
                  //     console.log(data);
                  //     if (data.status == 200 && data.response.message == 'Code Successfully Sent') {
                  //       // GotoOTP();
                  //       UserLoginObj = {
                  //         UserName: LoginObj.FullName,
                  //         UserEmail: LoginObj.Email,
                  //         UserNumber: '0' + number,
                  //         UserOTPNumber: RamNun,
                  //         UserRafForm: LoginObj.RAF,
                  //         UserMobileNewtwork: null,
                  //         UserStatus: 'OldUser'
                  //       }
                  //       navigation.navigate('OTP', { UserLoginObj })
                  //       setSignLoader1(false)
                  //       setPasswordModel(false)
                  //       console.log("Then----> if")
                  //     } else {
                  //       // setModalShow(true)
                  //       // setModalShowHeading('Unexpected error!')
                  //       // setModalShowText('Unfortunately, we are facing some technical issues and are unable to process your request at the moment. Please try again in a little while.')
                  //       setSignLoader1(false)
                  //       setPasswordModel(false)
                  //       console.log("Then----> else")
                  //     }
                  //   })

                  //   .catch((error) => {
                  //     console.log("error-->", error)
                  //     // setModalShow(true)
                  //     // setModalShowHeading('Unexpected error!')
                  //     // setModalShowText('Unfortunately, we are facing some technical issues and are unable to process your request at the moment. Please try again in a little while.')
                  //     setSignLoader1(false)
                  //     setPasswordModel(false)
                  //     console.log("Catch----> ")

                  //   });

                  // setSignLoader1(false)
                  // navigation.navigate('LoginSetPass', { number })
                  // setNumber("")
                }}
                // disabled={code && code.length == 4 && !signLoader1 ? false : true}
                style={{
                  // backgroundColor: toggleCheckBox ? '#194165' : '#dbdada',
                  // backgroundColor:
                  //   code && code.length == 4 && !signLoader1 ? '#194165' : '#263D6380',
                  // backgroundColor: 'red',
                  width: '100%',
                  backgroundColor: '#194165',
                  padding: 15,
                  borderRadius: 10,
                  // marginBottom: '3%',
                  // marginHorizontal: '2%',
                }}>
                {signLoader1 ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text
                    style={[
                      styles.FontStyle,
                      {
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 14,
                        fontWeight: '500',
                        fontFamily: 'Manrope-Medium',
                      },
                    ]}>
                    Create PIN
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      <ErorrModel ModelStatus={commonModalshow} modalHeading={commonModalHeading} modalMsg={commonModalMsg} modelOpenClose={setCommonModalshow} />

      {signLoader ? (
        <View
          opacity={0}
          style={[
            styles.loading,
            { backgroundColor: 'white', width: '100%' },
          ]}></View>
      ) : null}

     

      <Modal
      transparent={true}
      animationType="fade"
      visible={loginModal}
      onRequestClose={() => setLoginModal(false)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000b5',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pressable
          onPress={() => {
            setLoginModal(false);
          }}
          style={{ flex: 1, width: '100%' }}
        />
        <View
          style={{
            backgroundColor: '#FAFAFA',
            width: '100%',
            borderTopLeftRadius: moderateScale(15),
            borderTopRightRadius: moderateScale(15),
            alignItems: 'center',
            paddingTop: verticalScale(20),
            paddingBottom: verticalScale(48),
            
          }}
        >
        <TouchableOpacity
        onPress={() => {
          setLoginModal(false);
        }}
      >
        <View
          style={{
            marginTop: verticalScale(16),
            alignSelf: 'center',
            width: horizontalScale(32),
            borderWidth: 2,
            borderColor: '#79747E',
            marginTop:verticalScale(3),
          }}
        />
      </TouchableOpacity>
         
    
          <View style={{ alignItems: 'center',marginTop: verticalScale(32) }}>
            <Image
              source={require('../images/fingerprint.png')}
              style={{
                width: 80,
                height: 80,
                resizeMode: 'contain',
                //  backgroundColor: 'pink',
               
              }}
            />
           <View style={{ flexDirection: 'row', marginTop: moderateScale(10) }}>

</View>
          </View>
    
          <Text style={{
            width: '80%',
            fontSize: moderateScale(24),
            lineHeight: 36,
            fontFamily: 'Manrope-SemiBold',
            fontWeight: '600',
            color: '#000000',
            textAlign: 'center',
            // marginTop: verticalScale(-20),
          }}>
          Login to setup your fingerprint.
          </Text>
    
          <Text style={{
            width: '80%',
            fontSize: moderateScale(14),
            lineHeight: moderateScale(20),
            fontFamily: 'Manrope',
            fontWeight: '500',
            color: '#191919',
            textAlign: 'center',
            marginTop: verticalScale(44),
          }}>
          Please enter your phone number and log-into the app to set up your fingerprint.
          </Text>


        
    
          <TouchableOpacity
            onPress={() => {
              setLoginModal(false);
            }}
            style={{
              backgroundColor: '#263D63',
              height: verticalScale(48),
              width: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: moderateScale(12),
              marginTop: verticalScale(60),
              marginBottom:verticalScale(-20),
            
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(16),
                fontFamily: 'Manrope-Medium',
                color: 'white',
              }}
            >
              Okay
            </Text>
          </TouchableOpacity>
        </View>
     </View>
    </Modal>





      <Modal
      transparent={true}
      animationType="fade"
      visible={logoutModal}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000b5',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pressable
          onPress={() => {
            setLogoutModal(false);
          }}
          style={{ flex: 1, width: '100%' }}
        />
        <View
          style={{
            backgroundColor: '#FAFAFA',
            width: '100%',
            borderTopLeftRadius: moderateScale(15),
            borderTopRightRadius: moderateScale(15),
            alignItems: 'center',
            paddingTop: verticalScale(20),
            paddingBottom: verticalScale(48),
            
          }}
        >
        <TouchableOpacity
        onPress={() => {
          setLogoutModal(false);
        }}
      >
        <View
          style={{
            marginTop: verticalScale(16),
            alignSelf: 'center',
            width: horizontalScale(32),
            borderWidth: 2,
            borderColor: '#79747E',
            marginTop:verticalScale(3),
          }}
        />
      </TouchableOpacity>
         
    
          <View style={{ alignItems: 'center',marginTop: verticalScale(32) }}>
            <Image
              source={require('../images/fingerprint.png')}
              style={{
                width: 80,
                height: 80,
                resizeMode: 'contain',
                //  backgroundColor: 'pink',
               
              }}
            />
           <View style={{ flexDirection: 'row', marginTop: moderateScale(10) }}>
<Icon
  name="close-circle"
  size={20}
  color="white"
  style={{
    top: -35,
    marginLeft: moderateScale(45),
   
  }}
/>
<Icon
  name="close-circle-outline"
  size={20}
  color="red"
  style={{
    top: -35,
    marginLeft: moderateScale(-21.5),
  }}
/>
</View>
          </View>
    
          <Text style={{
            width: '80%',
            fontSize: moderateScale(24),
            lineHeight: 36,
            fontFamily: 'Manrope-SemiBold',
            fontWeight: '600',
            color: '#000000',
            textAlign: 'center',
            marginTop: verticalScale(-20),
          }}>
            Enable fingerprint on your device.
          </Text>
    
          <Text style={{
            width: '80%',
            fontSize: moderateScale(14),
            lineHeight: moderateScale(20),
            fontFamily: 'Manrope',
            fontWeight: '500',
            color: '#191919',
            textAlign: 'center',
            marginTop: verticalScale(44),
          }}>
            Fingerprint is disabled on your phone.
          </Text>


          <Text style={{
            width: 300,
            fontSize: moderateScale(14),
            lineHeight: moderateScale(20),
            fontFamily: 'Manrope',
            fontWeight: '500',
            color: '#191919',
            textAlign: 'center',
            marginTop: verticalScale(16),
          }}>
          Please enable fingerprint from your phone settings to enable fingerprint login.
          </Text>
    
          <TouchableOpacity
            onPress={() => {
              setLogoutModal(false);
            }}
            style={{
              backgroundColor: '#263D63',
              height: verticalScale(48),
              width: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: moderateScale(12),
              marginTop: verticalScale(60),
              marginBottom:verticalScale(-20),
            
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(16),
                fontFamily: 'Manrope-Medium',
                color: 'white',
              }}
            >
              Okay
            </Text>
          </TouchableOpacity>
        </View>
     </View>
    </Modal>


    <Modal
    transparent={true}
    animationType="fade"
    visible={notModal}
  >
    <View
      style={{
        flex: 1,
        backgroundColor: '#000000b5',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Pressable
        onPress={() => {
          setnotModal(false);
        }}
        style={{ flex: 1, width: '100%' }}
      />
      <View
        style={{
          backgroundColor: '#FAFAFA',
          width: '100%',
          borderTopLeftRadius: moderateScale(15),
          borderTopRightRadius: moderateScale(15),
          alignItems: 'center',
          paddingTop: verticalScale(20),
          paddingBottom: verticalScale(48),
          
        }}
      >
      <TouchableOpacity
      onPress={() => {
        setnotModal(false);
      }}
    >
      <View
        style={{
          marginTop: verticalScale(16),
          alignSelf: 'center',
          width: horizontalScale(32),
          borderWidth: 2,
          borderColor: '#79747E',
          marginTop:verticalScale(3),
        }}
      />
    </TouchableOpacity>
       
  
        <View style={{ alignItems: 'center',marginTop: verticalScale(32) }}>
          <Image
            source={require('../images/fingerprint.png')}
            style={{
              width: 80,
              height: 80,
              resizeMode: 'contain',
             
            }}
          />
         <View style={{ flexDirection: 'row', marginTop: moderateScale(10) }}>
<Icon
name="close-circle"
size={20}
color="white"
style={{
  top: -35,
  marginLeft: moderateScale(45),
 
}}
/>
<Icon
name="close-circle-outline"
size={20}
color="red"
style={{
  top: -35,
  marginLeft: moderateScale(-21.5),
}}
/>
</View>
        </View>
  
        <View style={{alignItems: 'center',}}>
        <Text style={{
          width: '80%',
          fontSize: moderateScale(24),
          lineHeight: moderateScale(36),
          fontFamily: 'Manrope-SemiBold',
          fontWeight: '600',
          color: '#000000',
          textAlign: 'center',
           marginTop: verticalScale(-20),
          
        }}>
          Fingerprint not detected!
        </Text>
        
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{
            fontSize: moderateScale(14),
            lineHeight: moderateScale(20),
            fontFamily: 'Manrope',
            fontWeight: '500',
            color: '#191919',
            textAlign: 'center',
            marginTop: verticalScale(44),
          }}>
            Please place your finger on the fingerprint sensor.
          </Text>
        </View>
      </View>


        <TouchableOpacity
          onPress={() => {
            setnotModal(false);
          }}
          style={{
            backgroundColor: '#263D63',
            height: verticalScale(48),
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: moderateScale(12),
            marginTop: verticalScale(60),
            marginBottom:verticalScale(-20),
          
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(16),
              fontFamily: 'Manrope-Medium',
              color: 'white',
            }}
          >
            Okay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
                                                      

    </SafeAreaView>

    // <SafeAreaView style={styles.container} >
    //   <ScrollView
    //     keyboardShouldPersistTaps={'handled'}
    //     showsVerticalScrollIndicator={false}
    //     contentContainerStyle={{
    //       backgroundColor: 'white',
    //       flexGrow: 1,
    //       justifyContent: 'center',
    //       flexDirection: 'column',
    //       height: windowHeight

    //     }}>

    //     {/* // <KeyboardAvoidingView behavior="height" style={styles.container}> */}

    //     <TouchableWithoutFeedback style={{ backgroundColor: 'red' }} onPress={Keyboard.dismiss} >
    //       <View style={{ padding: '1%', backgroundColor: 'white', width: '100%', alignItems: 'center', height: windowHeight, justifyContent: 'center' }}>

    //         <View style={{ marginTop: BetweenImgAndInputMarginTop, backgroundColor: 'white', padding: 15, width: '100%' }}>
    //           {/* Logo Image */}
    //           <View style={{ width: '100%', backgroundColor: 'white', alignItems: 'center' }}>
    //             <Image
    //               style={{
    //                 width: '53%', height: 110, resizeMode: 'center'
    //               }}
    //               source={AppLogo}
    //             />
    //           </View>
    //           {/* Email Input */}
    //           <View style={{ backgroundColor: 'white', marginTop: AppMarginTop }}>
    //             <Input style={[styles.FontStyle, { backgroundColor: 'white', fontSize: 15 }]}
    //               placeholderTextColor={'#A9A9A9'}
    //               placeholder="Email"
    //               underlineColorAndroid="transparent"
    //               value={email} onChangeText={(text) => setEmail(text)}
    //               leftIcon={<Icon name="person" size={20} color="#194165" />}
    //             />
    //           </View>

    //           {/* Password Input */}
    //           <View style={{ marginTop: InputAppMarginTop, backgroundColor: 'white' }}>
    //             <Input style={[styles.FontStyle, { backgroundColor: 'white', fontSize: 15, }]}
    //               secureTextEntry={updateSate}
    //               placeholderTextColor={'#A9A9A9'}
    //               placeholder="Password"
    //               value={password} onChangeText={(text) => setPassword(text)}
    //               leftIcon={<Icon name="lock-closed" size={20} color="#194165" />}
    //               rightIcon={showIcon ?
    //                 <TouchableOpacity onPress={HidePassword}>
    //                   <Icon name="eye" size={22} color="#194165" />
    //                 </TouchableOpacity> :
    //                 <TouchableOpacity onPress={ShowPassword}>
    //                   <Icon name="eye-off" size={22} color="#194165" />
    //                 </TouchableOpacity>}
    //             />
    //           </View>

    //           {/* Forget Password */}
    //           <View style={{ width: '100%', bottom: 5, alignItems: 'flex-end' }}>
    //             <TouchableOpacity onPress={() => { navigation.navigate('Forget') }}>
    //               <Text style={[styles.FontStyle, { backgroundColor: 'white', color: '#194165', }]}>Forgot password?</Text>
    //             </TouchableOpacity>
    //           </View>

    //           {/* SignIn Button */}
    //           {/* <View style={{ backgroundColor: 'white', width: '100%', alignItems: 'center', marginTop: AppMarginTop, }}>
    //             {loader ? <Image source={require('../images/loader.gif')}
    //               style={{ width: 30, height: 30, }} />
    //               : <TouchableOpacity onPress={save_data1}
    //                 style={{ width: '90%', borderRadius: 5, backgroundColor: '#194165', padding: 15 }}>
    //                 <Text style={[styles.FontStyle, { fontSize: 15, color: 'white', textAlign: 'center' }]}>Sign in</Text></TouchableOpacity>
    //             }
    //           </View> */}

    //           <View>
    //             {loader ?
    //               <View style={{ marginTop: AppMarginTop, padding: 9, backgroundColor: 'white', alignItems: 'center' }}>
    //                 <Image source={require('../images/loader.gif')}
    //                   style={{ width: 30, height: 30, }} />
    //               </View>
    //               :
    //               <TouchableOpacity onPress={save_data1}
    //                 style={{ backgroundColor: '#194165', padding: 15, borderRadius: 5, marginTop: AppMarginTop, }}>
    //                 <Text style={[styles.FontStyle, { color: 'white', textAlign: 'center', fontSize: 15 }]}>Sign in</Text>
    //               </TouchableOpacity>}
    //           </View>

    //           {/* SignUp Button */}
    //           <View style={{ width: '100%', alignItems: 'center', marginTop: AppMarginTop, marginBottom: '1%' }}>
    //             <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }}
    //               style={{ width: '100%', borderRadius: 5, backgroundColor: "#39bd8c", padding: 15, borderColor: '#194165', borderWidth: 0, }}>
    //               <Text style={[styles.FontStyle, { fontSize: 15, color: 'white', textAlign: 'center', }]}>Sign up</Text></TouchableOpacity>
    //           </View>

    //           <View style={{ marginTop: AppMarginTop, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
    //             <Icon name="logo-youtube" size={20} color="#194165" style={{ marginRight: 5 }} />
    //             <TouchableOpacity
    //               onPress={() => {
    //                 Linking.openURL('https://www.youtube.com/watch?v=bQHcALcSsa0&feature=shares')
    //               }}>

    //               <Text style={[styles.FontStyle, { marginBottom: 1, fontSize: 14, color: '#194165', textDecorationLine: 'underline' }]} >Learn how to sign up</Text>
    //             </TouchableOpacity>
    //           </View>

    //           <View style={{ marginTop: AppMarginTop, width: '100%', alignItems: 'center' }}>
    //             <Text style={[styles.FontStyle, { fontSize: 12, color: '#194165' }]} >Powered by Hilal Technologies</Text>
    //           </View>

    //         </View>

    //       </View>
    //     </TouchableWithoutFeedback>

    //   </ScrollView>

    //   {/* =======modal======== */}

    //   {/* <Modal
    //     transparent={true}
    //     animationType="slide"
    //     visible={modalshow}
    //   >
    //     <View style={{ height: '100%', width: '100%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
    //       <View style={{ backgroundColor: '#f5fffa', width: '80%', padding: '10%', borderRadius: 12, elevation: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>

    //         <Icon name="alert-circle-outline" size={70} color="#d62929" />

    //         <Text style={{ fontSize: 22, color: '#194165' }}>{(emailErro ? 'Invalid email!' : emailPassError ? 'Invalid fields!' : NoUserError ? 'No user is registered!' : emailPassincoError ? 'Login failed!' : '')}</Text>
    //         <Text style={{ fontSize: 14, color: '#d62929', textAlign: 'center', marginTop: '3%' }}> {(emailErro ? 'The email address entered is invalid.' : emailPassError ? 'Email & Password are required.' : emailPassincoError ? 'The entered email/password is incorrect. Please try again.' : 'No user is registered with this email address.')}</Text>
    //         <View style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
    //           <TouchableOpacity style={{ borderRadius: 4, marginTop: '10%', backgroundColor: '#194165', width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3%', }} onPress={() => {
    //             setmodalshow(false)
    //           }}>
    //             <Text style={{ color: 'white', }}>Okay</Text>
    //           </TouchableOpacity>

    //         </View>
    //       </View>
    //     </View>
    //   </Modal> */}

    //   <Modal
    //     transparent={true}
    //     animationType="fade"
    //     visible={modalshow}
    //   >
    //     <View style={{ backgroundColor: '#000000b5', height: '100%', width: '100%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
    //       <View style={{ backgroundColor: '#f5fffa', width: '80%', padding: '10%', borderRadius: 12, elevation: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
    //         {/* icon */}
    //         <Icon name="alert-circle-outline" size={70} color="#d62929" />
    //         {/* icon */}

    //         <Text style={{ fontSize: 22, color: '#194165' }}>{modalHeading}</Text>
    //         <Text style={{ fontSize: 14, color: 'gray', textAlign: 'center', marginTop: '3%' }}> {modalMsg}</Text>
    //         <View style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
    //           <TouchableOpacity style={{ borderRadius: 4, marginTop: '10%', backgroundColor: '#194165', width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3%', }}
    //             onPress={() => {
    //               setmodalshow(false)
    //               // https://play.google.com/store/apps/details?id=com.hilalinvest&pli=1

    //             }}>
    //             <Text style={{ color: 'white', }}>Okay</Text>
    //           </TouchableOpacity>

    //         </View>
    //       </View>
    //     </View>
    //   </Modal>

    //   <Modal
    //     transparent={true}
    //     animationType="fade"
    //     visible={updateAppModel}
    //   >
    //     <View style={{ backgroundColor: '#000000b5', height: '100%', width: '100%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
    //       <View style={{ backgroundColor: '#f5fffa', width: '80%', padding: '10%', borderRadius: 12, elevation: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
    //         {/* icon */}
    //         <Icon name="alert-circle-outline" size={70} color="#d62929" />
    //         {/* icon */}

    //         <Text style={{ fontSize: 22, color: '#194165' }}>Update App!</Text>
    //         <Text style={{ fontSize: 14, color: 'gray', textAlign: 'center', marginTop: '3%' }}>New update is available. Update to the latest version to enjoy new features and improvements.{'\n'}Invest the halal way!</Text>
    //         <View style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
    //           <TouchableOpacity style={{ borderRadius: 4, marginTop: '10%', backgroundColor: '#194165', width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3%', }}
    //             onPress={() => {
    //               setUpdateAppModel(false)
    //               // https://play.google.com/store/apps/details?id=com.hilalinvest&pli=1
    //               Linking.openURL('https://play.google.com/store/apps/details?id=com.hilalinvest&pli=1')
    //             }}>
    //             <Text style={{ color: 'white', }}>Update</Text>
    //           </TouchableOpacity>

    //         </View>
    //       </View>
    //     </View>
    //   </Modal>

    //   {/* =======modal======== */}
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // main container
    backgroundColor: 'white',
    // padding: '5%',
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
  },
  scrollView: {
    alignItems: 'center',
  },
  FontStyle: {
    fontFamily: 'Ubuntu-Regular',
  },

  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 2,
    borderColor: 'transparent',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    color: 'black',
    fontSize: 22,
  },

  underlineStyleHighLighted: {
    borderColor: 'black',
  },
  inputfield: {
    marginTop: verticalScale(16),
    width: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    borderColor: '#BABABA',
    borderWidth: 0.5,
    borderRadius: moderateScale(10),
    height: verticalScale(56),
    paddingLeft: horizontalScale(16),
    paddingVertical: verticalScale(15),
    justifyContent: 'center',
  },
  inputfield_Headtext: {
    fontFamily: 'Manrope-Regular',
    color: '#818A99',
    padding: 0,
  },
  inputfield_text: {
    fontSize: moderateScale(15),
    fontFamily: 'Manrope-Regular',
    padding: 0,
    margin: 0,
    color: '#191919',
    // width: '100%',
    // backgroundColor: 'pink',
    // height: 20,
  },
});

export default LogIn;
