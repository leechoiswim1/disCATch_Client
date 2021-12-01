// LIBRARY
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import { Template, CommunityPost, SecondHeader } from "../../components";

// STYLE
import styled, { css } from "styled-components";

// ELEMENTS
import { Grid, Button } from "../../elements/index";

// ROUTE
import { useLocation } from "react-router-dom";

//ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import { getCommunityDB, resetList } from "../../redux/modules/community";

// REDUX
import { history } from "../../redux/configureStore";

const CommunityDetail = (props) => {
  const dispatch = useDispatch();
  let communityList;
  const catInfoList = useSelector((state) => state.community.catInfo);
  const gatheringList = useSelector((state) => state.community.gathering);
  const sharingList = useSelector((state) => state.community.sharing);
  const loading = useSelector((state) => state.community.itemLoded);

  const [page, setPage] = useState(1);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const pathLocation = props.match.params.village.split("@")[0];
  let location;
  const userVillage0 = useSelector(
    (state) => state.mypage.userVillage[0]?.split("@")[0]?.split("(")[0]
  );
  const userVillageA = useSelector(
    (state) => state.mypage.userVillage[0]?.split("@")[1]?.split("(")[0]
  );

  const userVillage1 = useSelector(
    (state) => state.mypage.userVillage[1]?.split("@")[0]?.split("(")[0]
  );
  const userVillageB = useSelector(
    (state) => state.mypage.userVillage[1]?.split("@")[1]?.split("(")[0]
  );

  const userVillage2 = useSelector(
    (state) => state.mypage.userVillage[2]?.split("@")[0]?.split("(")[0]
  );
  const userVillageC = useSelector(
    (state) => state.mypage.userVillage[2]?.split("@")[1]?.split("(")[0]
  );

  if (pathLocation === userVillage0) {
    location = userVillageA;
  } else if (pathLocation === userVillage1) {
    location = userVillageB;
  } else if (pathLocation === userVillage2) {
    location = userVillageC;
  }

  const path = useLocation();
  let category = null;
  let nextPath = null;
  if (path.pathname === `/community/${pathLocation}/catinfo`) {
    category = "고양이 정보글";
    nextPath = "catinfo";
    communityList = catInfoList;
  } else if (path.pathname === `/community/${pathLocation}/gathering`) {
    category = `${pathLocation} 동네 모임`;
    nextPath = "gathering";
    communityList = gatheringList;
  } else if (path.pathname === `/community/${pathLocation}/sharing`) {
    category = `${pathLocation} 고양이 용품 나눔`;
    nextPath = "sharing";
    communityList = sharingList;
  }

  location = location?.substring(0, location.length - 1);

  useEffect(() => {
    dispatch(resetList([]));
  }, []);

  useEffect(() => {
    dispatch(getCommunityDB(category, location, page));
  }, [category, location, page, dispatch]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    } else {
      return;
    }
  }, [inView, loading]);

  return (
    <Template props={props}>
      <SecondHeader title={category} />
      <Grid
        bgColor="bgColor"
        margin="-8vh 0 0 0"
        addstyle={() => {
          return css`
            position: relative;
            top: 67px;
          `;
        }}
      >
        <CommunityDetailStyle>
          <Grid
            addstyle={() => {
              return css`
                position: relative;
                margin: 0 auto;
                font-size: 18px;
                font-weight: bold;
                top: 90px;
              `;
            }}
          ></Grid>
          <Grid
            margin="-95vh 0 0 0"
            addstyle={() => {
              return css`
                @media screen and (max-width: 414px) {
                  margin: -92.5vh 0 0 0;
                }
              `;
            }}
          >
            {communityList?.length > 0 &&
              communityList.map((community, idx) => {
                return (
                  <div key={idx} ref={ref}>
                    inView&&{<CommunityPost community={community} />}
                  </div>
                );
              })}
          </Grid>
        </CommunityDetailStyle>
        <Button
          clickEvent={() =>
            history.push(`/community/${pathLocation}/${nextPath}/write`)
          }
          is_float="is_float"
        >
          <FontAwesomeIcon icon={faPencilAlt} style={{ width: "20px" }} />
        </Button>
      </Grid>
    </Template>
  );
};

const CommunityDetailStyle = styled.div`
  z-index: -1;
  width: 100%;
  overflow-x: hidden;
  height: 85vh;
  @media screen and (max-height: 1366px) {
    height: 89vh;
    margin: 2vh 0 0;
  }
  @media screen and (max-height: 1024px) {
    height: 85vh;
    margin: 2vh 0 0;
  }
  @media screen and (max-height: 823px) {
    height: 80vh;
    margin: -0.2vh 0 0;
  }
  @media screen and (max-height: 812px) {
    height: 80vh;
    margin: -0.2vh 0 0;
  }
  @media screen and (max-height: 800px) {
    height: 83vh;
    margin: -0.3vh 0 0;
  }
  @media screen and (max-height: 736px) {
    height: 79vh;
    margin: -1vh 0 0;
  }
  @media screen and (max-height: 720px) {
    height: 81vh;
    margin: -1vh 0 0;
  }
  @media screen and (max-height: 667px) {
    height: 77vh;
    margin: -2vh 0 0;
  }
  @media screen and (max-height: 640px) {
    height: 77vh;
    margin: -2.5vh 0 0;
  }
  @media screen and (max-height: 600px) {
    height: 78vh;
    margin: -3vh 0 0;
  }
  @media screen and (max-height: 568px) {
    height: 75vh;
    margin: -3.6vh 0 0;
  }
`;

export default CommunityDetail;