type redirectURL = () => void;

interface APICONFIGTYPE {
  redirectURL?: redirectURL | string;
  errorMsgCallback: (error: string) => void;
}

interface Window {
  APICONFIG: APICONFIGTYPE;
  antd: any;
}