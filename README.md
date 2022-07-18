## Info-market
🏠[info-market](http://info-market-client.s3-website.ap-northeast-2.amazonaws.com/)
> *유익한 정보를 공유할 수 있는 공간*,  **Info-market**

![Final_logo](https://user-images.githubusercontent.com/16861050/167562261-b37d5433-d050-4658-a833-757973a1de87.png)


## 🌟 Feature
* 다양하고 유익한 정보를 무료/유료로 공유할 수 있습니다.
* 회원 등급제가 있으며 등급에 따라 수수료 할인이 적용됩니다.
* 카카오페이를 이용한 포인트 충전을 할 수 있습니다.
* 정보의 신뢰성을 위해 Silver 등급 이상 되어야 유료 정보를 올릴 수 있습니다.

## :boom: Team 
|오상민|유지훈|최윤선|박제곤|
|:---:|:---:|:---:|:---:|
|![sm](https://user-images.githubusercontent.com/16861050/167568676-8c6d154e-e6f4-419a-889e-18653d217872.PNG)|![jh](https://user-images.githubusercontent.com/16861050/167568735-4a5d3963-41fd-42db-9c4a-61681240e224.PNG)|![ys](https://user-images.githubusercontent.com/16861050/167568757-9ff7bda1-a044-4270-8b40-d0b58afb3471.PNG)|![jg](https://user-images.githubusercontent.com/16861050/167568784-fd80cbe6-1427-4bab-87ba-15393fd7fa93.PNG)|
|BackEnd|BackEnd|FrontEnd|FrontEnd|

## 🛠️ Development
### Front
* JavaScript
* React
* React Router
* Redux
* Redux Toolkit
* Styled-components
* axios

### Back
* TypeScript - v4.6.4
* express - v4.17.3
* node - v16.14.0
* jsonwebtoken - v8.5.1
* bcrypt - v5.0.1
* Sequelize - 6.19.0
* Mysql - v8.0.28
* axios - v0.27.0
* Import


## 문제 해결 경험

* 포인트 충전이 되지 않는 현상

  1. 문제 
  
  아임포트 API를 사용하여 카카오페이를 통한 포인트 충전 기능을 구현을 하였습니다. 하지만 카카오 페이 결제는 되었지만, 아임포트 결제 시스템에 해당 주문 번호가 없어 포인트 충전에 실패하는 현상이 지속적으로 발생하는 현상이 되었습니다. 그래서 아임포트 API에는 포인트 충전 결제 내역이 없지만 해당 유저 point 테이블에는 데이터가 저장되는 문제가 발생하였습니다.
  
  2. 문제 파악
  
  처음에는 아임포트 API와 axios 통신을 할 때 보내주는 파라미터 들이 잘못 되었나 확인을 했습니다. 하지만 요청 결과값을 출력을 했을 때 모두 정상적으로 보내줬고, 결과값도 정확하게 반환 하는 것을 확인 하였습니다. 그래서 처음 아임포트의 토큰을 받아 올 때, 토큰이 정상적으로 받아와지는지 확인을 했습니다. 토큰도 정상적으로 받아와 지는 것을 확인을 하였습니다. 그래서 혹시 Secret key나 가맹점 코드가 잘못 되어서 연동이 안되는 것인가를 확인 해봤는데, 여기서 문제점을 찾았습니다.
  
  > 가맹점 코드 : 가맹점을 파악 하기 위해 만들어진 코드 입니다.
  
  3. 해결 방안
  
  

<a href="https://kr.freepik.com/vectors/woman">Woman 벡터는 jcomp - kr.freepik.com가 제작함</a>
