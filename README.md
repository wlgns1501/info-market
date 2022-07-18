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
  
  처음에는 아임포트 API와 axios 통신을 할 때 보내주는 파라미터 들이 잘못 되었나 확인을 했습니다. 하지만 요청 결과값을 출력을 했을 때 모두 정상적으로 보내줬고, 결과값도 정확하게 반환 하는 것을 확인 하였습니다. 그래서 처음 아임포트의 토큰을 받아 올 때, 토큰이 정상적으로 받아와지는지 확인을 했습니다. 토큰도 정상적으로 받아와 지는 것을 확인을 하였습니다. 그래서 혹시 Secret key나 Rest API key가 잘못 되어서 연동이 안되는 것인가를 확인 해봤는데, 여기서 Rest API key에 대한 문제점을 찾았습니다.
  
  > Rest API Key : API를 사용하기 위해 각 유저마다 고유한 키를 받습니다.
  
  3. 해결 방안
  
  프론트 엔드에서 아임포트 API가 잘 실행이 되는지 확인을 하고, 저도 백엔드에서 확인을 하느라 각각 아임포트 API에 필요한 설정 값들을 서로 다르게 설정을 했었습니다. 서로 문제 없음을 파악을 하고 합쳐서 테스트를 해보는데 이 **설정 값들이 엉켜서 문제점이 발생** 하였습니다. 프론트 엔드 조원의 아임포트 API에 결재 내역이 올라가는데, 저는 제 아임포트 API를 확인을 하여 결제 내역은 없지만 DB에는 지속적으로 저장이 되는 현상이었습니다. 그래서 프론트 엔드 분의 Rest API key로 설정을 하자 라고 결정을 내려, 수정 하였더니 정상적으로 작동을 했습니다.
  
## 서비스 발표 질문 

Q. Typescript를 사용한 이유가 무엇인가요?

A : 이번 프로젝트에서는 TypeScript를 사용하였는데요 
TypeScript에 많은 장점들이 있지만 가장 큰 이유 중 하나는
정적 타입을 지원한다는 것입니다. 변수나 반환값에
타입을 사전에 지정함으로써 컴파일 단계에서 오류를 포착할 수 있으며
코드의 가독성을 높이고 디버깅을 쉽게 할 수 있어서 사용하였습니다.

---

Q : 포인트 충전은 어떻게 구현 하셨나요?

A : 포인트 충전은 아임포트 API를 사용하여 구현했습니다. 아임포트에서 여러가지 결제를 사용할 수 있는데, 저희는 카카오 페이를 선택 하였습니다. 먼저 아임포트 API를 사용하기 앞서 아임포트 토큰을 받아와야 합니다. 그 다음으로  클라이언트에서 해당 게시물에 대한 포인트, 거래 번호, 주문 번호를 받아옵니다. 이 내용을 point 테이블에 저장을 하게 되는데, 컬럼 status에 임시적으로 ready로 저장을 합니다. 실제 결제를 하기 위해서 아임포트의 결제 API 에 요청을 하게 되는데, 이때 아임포트의 토큰을 헤더에 붙이고, 파라미터로 주문 번호를 보내 줍니다. 아임포트 결제 시스템에 해당 주문 번호에 해당하는 결제가 있으면 해당 결제의 주문번호, 결제금액, 거래번호를 보내 주게 되는데, 이때 여기서 보내준 결제 금액과 point 테이블에 저장해둔 해당 게시물의 포인트와 같을 경우 클라이언트에게 결제에 성공했다는 메세지를 보내주고, user테이블의 포인트에 결제 금액을 더해주어 업데이트를 합니다. 또한 point 테이블의 해당 결제 내역의 컬럼 status를 paid로 업데이트를 해주어 구현 했습니다.


<a href="https://kr.freepik.com/vectors/woman">Woman 벡터는 jcomp - kr.freepik.com가 제작함</a>
