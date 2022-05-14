import { createGlobalStyle } from 'styled-components';
import EliceDigitalCodingRegular from './EliceDigitalCoding_Regular.woff';
import EliceDigitalCodingBold from './EliceDigitalCoding_Bold.woff';

export default createGlobalStyle`		     
  @font-face {
    font-family: 'Elice Regular';	
    src: local('Elice Regular'),   
    url(${EliceDigitalCodingRegular}) format('woff');
    font-weight: 300; 
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Elice Bold';	
    src: local('Elice Bold'),   
    url(${EliceDigitalCodingBold}) format('woff');
    font-weight: 300; 
    font-style: normal;
  }
  
  
`;
