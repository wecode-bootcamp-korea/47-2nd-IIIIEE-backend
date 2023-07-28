# 47-2nd-IIIIEE-backend
# 47-2nd-IIIIEE-backend
## routes/index : router 메인 경로
## routes/restaurantRouter : restaurant 경로
## routes/reviewRouter : review 경로
### "/restaurants/restaurantList" : 프론트 메인화면 nav바 필터링을 구현한 경로
### "/reviews" : review post 경로

## controllers/index : controller 메인 경로
## controllers/restaurantController : restaurant 경로
## controllers/reviewController : review 경로
### controllers/reviewController/createReview : review post 함수
### controllers/restaurantController/restaurantList : restaurant filter 함수

## services/index : service 메인 경로
## services/restaurantService : restaurant 경로
## services/reviewService : review 경로
### services/restaurantService/getQuery : restaurant nav바 필터링 정보를 input으로, 필요한 query를 output으로 하는 함수
### services/restaurantService/getRestaurantList : restaurant filter 함수
### services/reviewService/{1 : ${koToEn},2 : ${reviewFilter},3 : ${createReview}} : 1. korean을 english로 변환 2. tensorflow로 악플 필터링 3. reivew 전달 함수

## models/index : Dao 메인 경로
## models/restaurantDao : restaurnat 경로
### models/restaurantDao/getREstaurantList : restaurant filter 함수
### models/reviewDao : review 경로
### models/reviewDao/createReview : review 생성 함수
