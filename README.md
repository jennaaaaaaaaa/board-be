# 🫐기민한 게시판🫐
tag를 추가 하여 게시물을 올릴 수 있는 게시판입니다
---

## 💻SERVICE

기본 게시판 형태에 태그를 넣을 수 있게 만들었습니다

![image](https://user-images.githubusercontent.com/111362623/220508372-4e4f1222-0835-4071-9006-e0ed374256a7.png)
![image](https://user-images.githubusercontent.com/111362623/220508417-758dc7f4-de95-4628-b766-6c070396dc3f.png)

```
  1. 게시물 작성 수정 삭제 기능
  2. 해당 게시물의 댓글 작성 수정 삭제 기능
  3. 내 정보에서 내 이름과 이메일 확인과 동시에 내가 쓴 게시물들만 볼 수 있는 기능
  4. 로그인 로그아웃
  5. 페이지네이션기능
```

## 👤역할 분담

김기민
```
- 게시글 상세조회
- 댓글 조회, 작성, 수정
- 게시글 수정, 삭제, 작성
```

주민석
```
- 회원가입, 로그인, 로그아웃
- 내 정보 조회 및 최신 게시글 10개 조회
- 게시물목록 조회
- top10 tag조회
- 태그별 게시글 조회
```

## 🔧사용 기술

BACKEND
```
- Node.js (express)
- Mysql (Sequelize)
```
FRONTEND
```
- HTML
- CSS
- Javascript
- Googleicon, font
```
TOOL
```
- GitHub
- VSCode
- AWS RDS
```

## 🎨Dependencies

```
"dependencies": {
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "joi": "^17.7.1",
    "jsonwebtoken": "^9.0.0",
    "mysql2": "^3.1.2",
    "redis": "^4.6.4",
    "sequelize": "^6.28.0"
  }
```

## 📜API 명세서
[API](https://www.notion.so/API-81407027de3049de951c36b8036a6668)

## 🖼️ERD
[ERD](https://www.notion.so/ERD-91bcdb024414472d9c9c76b4d14372d1)

## 🗂️폴더구조
  ```
├─config
│ └─config.json
│
├─controllers
│ ├─article.controller.js
│ ├─comments.controller.js
│ ├─tag.controller.js
│ └─user.controller.js
│
├─middleware
│ ├─auth.js
│ └─valudation.js
│
├─migrations
│ ├─20230209065545-create-user.js
│ ├─20230209065704-create-article.js
│ ├─20230209065745-create-tag.js
│ ├─20230209065840-create-article-tag-mapping.js
│ └─20230214073113-create-comments.js
│
├─models
│ ├─article_tag_mapping.js
│ ├─article.js
│ ├─comments.js
│ ├─index.js
│ ├─tag.js
│ └─user.js
│
├─repositorys
│ ├─article.repository.js
│ ├─comments.repository.js
│ ├─tag.repository.js
│ └─user.repository.js
│
├─routes
│ ├─article.route.js
│ ├─comments.routes.js
│ ├─routes.js
│ ├─tag.route.js
│ └─user.route.js
│
├─seeders
├─services
│ ├─article.service.js
│ ├─comments.service.js
│ ├─tag.service.js
│ └─user.service.js
│
├─util
│ ├─config.js
│ ├─redis.js
│
└─app.js

```
## 캐시
사용 툴 : Redis

Redis 의 특징 : 메모리 기반으로 빠르게 데이터를 읽어올 수 있는 Key-Value Store

## 🔎jmeter
메인 페이지에서 볼 수 있는 태그를 페이지 이동할 때마다 api로 계속 호출을 하면 데이터양이 적을 때는 그 차이를 못 느낄 수 있겠지만 tag의 양과 article의 양이 많아지면 많아질수록 페이지 이동에 대한 부담이 커질 것 같다는 생각이 들었습니다. 글을 쓰는 현시점 총 게시글의 수는 5070개, 태그의 수는 23이다. 둘이 조합된 수는 15140개입니다. 매번 페이지를 이동할 때마다 15140개의 조합들을 count 하지 않고 캐시에 하루에 한 번씩 count 해서 많이 사용된 top 10의 tag를 저장을 한 뒤 꺼내 쓸 수 있도록 해봤습니다.

**캐시사용x**

![캐시 사용X 오늘의 태그 조회](https://user-images.githubusercontent.com/118159400/220608773-25c823f7-00b9-4ac4-b4b1-45becc97066d.png)
시간이 최소 243ms 과 최대 22547ms의 시간이 걸렸습니다. 


**캐시사용o**

![image](https://user-images.githubusercontent.com/111362623/220600496-0ba81ea9-171f-4714-8bcb-203a8d7711f0.png)
그의 반면 캐시를 사용 했을 시 최소 1ms 최대 7ms이라는 시간이 걸렸습니다. 

**테스트 조건**

![image](https://user-images.githubusercontent.com/111362623/220600285-1d1e36fe-18cf-4eb2-a145-039e3292117a.png)
게시판의 이용자가 늘어나고 페이지 이동이 많아지거나 새로고침을 할 수록 캐시를 사용하지 않을 경우에는 이용자들의 화면에 뜨는 시간이 오래 걸림을 알 수 있습니다. 그에 비해 캐시를 사용한 경우 빠른 속도로 해당 요청을 처리할 수 있습니다.



  
[frontend기능](https://github.com/MinseokJoo/board-fe)
