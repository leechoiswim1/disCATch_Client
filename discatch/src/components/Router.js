import React from "react";
import { Switch, Route } from "react-router-dom";
// import Auth from "../shared/auth";
/* == Pages */
import {
  Home,
  Slider,
  MyPage,
  UserInfoWrite,
  CatInfoWrite,
  CatDetailInfoWrite,
  CatDetail,
  CatDetailInfo,
  CatDetailEdit,
  CommunityPostWrite,
  CommunityPostEdit,
  CommunityDetail,
  NotFound,
  CommunityPostDetail,
  Community,
  Login,
  Map,
  Chat,
  LoginRedirect,
} from "../pages";

// 배포 시 해당 라우트 삭제 예정
import test from "../pages/test";

// * == ( Router ) -------------------- * //
const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/slider" exact component={Slider} />
      <Route path="/mypage" exact component={MyPage} />
      <Route path="/login" exact component={Login} />
      <Route path="/user/kakao/callback" exact component={LoginRedirect} />
      {/* <Route path="/login" component={Auth(Login, false)} exact /> */}
      {/* <Route
        path="/user/kakao/callback"
        component={Auth(LoginRedirect, false)}
        exact
      /> */}

      <Route path="/userinfowrite" exact component={UserInfoWrite} />
      <Route path="/userinfoedit" exact component={UserInfoWrite} />
      <Route path="/catinfowrite" exact component={CatInfoWrite} />
      <Route path="/catdetailinfowrite" exact component={CatDetailInfoWrite} />
      <Route
        path="/catdetailinfowrite/:catId"
        exact
        component={CatDetailInfoWrite}
      />
      <Route path="/catdetail" exact component={CatDetail} />
      <Route path="/catdetail/:catId" exact component={CatDetail} />

      <Route path="/catdetailinfo" exact component={CatDetailInfo} />
      <Route path="/catdetailedit" exact component={CatDetailEdit} />
      <Route path="/community/:village/catinfo/write" exact component={CommunityPostWrite} />
      <Route path="/community/:village/gathering/write" exact component={CommunityPostWrite} />
      <Route path="/community/:village/sharing/write" exact component={CommunityPostWrite} />
      <Route path="/communitypostedit" exact component={CommunityPostEdit} />
      <Route path="/communitypostedit/:communityId" exact component={CommunityPostEdit} />
      <Route path="/community/:village/catinfo" exact component={CommunityDetail} />
      <Route path="/community/:village/gathering" exact component={CommunityDetail} />
      <Route path="/community/:village/sharing" exact component={CommunityDetail} />
      <Route path="/communitypostdetail" exact component={CommunityPostDetail} />
      <Route path="/communitypostdetail/:communityId" exact component={CommunityPostDetail} />
      <Route path="/community" exact component={Community} />
      <Route path="/map" exact component={Map} />
      <Route path="/chat" exact component={Chat} />
      <Route path="/test" exact component={test} />
      <Route path={"*"} exact component={NotFound} />
    </Switch>
  );
};

export default Router;
