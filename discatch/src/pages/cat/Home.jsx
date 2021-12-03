// LIBRARY
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import {
  Template,
  CatPost,
  SecondHeader,
  SecondSpinner,
  EmptyPost,
} from "../../components";

// ELEMENTS
import { Button } from "../../elements";

// ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

// REDUX
import { history } from "../../redux/configureStore";
import {
  __getCatLocation,
  __getMoreCatLocation,
} from "../../redux/modules/cat";

const Home = (props) => {
  const dispatch = useDispatch();

  const isLoaded = useSelector((state) => state.cat.postLoaded);

  const [page, setPage] = useState(1);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const menuLocation = props.location.state?.location;
  const catList = useSelector((state) => state.cat.list);

  const userLocation = useSelector((state) => state.map.keywordList[0]);

  const userVillage = useSelector(
    (state) => state.mypage.userVillage[0]?.split("@")[0]
  );
  const pathLocation = userLocation
    ? userLocation
    : menuLocation || userVillage;

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

  let location;
  if (pathLocation === userVillage0) {
    location = userVillageA;
  } else if (pathLocation === userVillage1) {
    location = userVillageB;
  } else if (pathLocation === userVillage2) {
    location = userVillageC;
  }

  location = location?.substring(0, location.length - 1);

  const requestLocationInfo = () => {
    history.push("/userinfoedit");
    alert("동네 정보를 입력해주세요!");
  };

  useEffect(() => {
    setPage(1);
    dispatch(__getCatLocation(location));
  }, [location]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고 catList의 length가 10의 배수인 경우
    if (inView && catList.length > 9 && catList.length / 10 === page) {
      setPage((prevState) => prevState + 1);
      dispatch(__getMoreCatLocation(location, page + 1));
    } else {
      return;
    }
  }, [inView]);

  return (
    <>
      {location !== undefined ? (
        <Template props={props} location={pathLocation}>
          <SecondHeader title={`${pathLocation} 고양이들을 소개합니다!`} />
          {catList && catList.length > 0 ? (
            catList.map((cat, idx) => {
              return (
                <div style={{ width: "100%" }} key={idx} ref={ref}>
                  <CatPost
                    cat={cat}
                    pathLocation={pathLocation}
                    location={location}
                  />
                </div>
              );
            })
          ) : (
            <EmptyPost path="home" />
          )}
          <SecondSpinner visible={isLoaded} path="scroll" />
          <Button
            is_float="is_float"
            clickEvent={() => {
              history.push({
                pathname: `/map/${pathLocation}`,
                state: { location: pathLocation },
              });
            }}
          >
            <FontAwesomeIcon icon={faPencilAlt} style={{ width: "20px" }} />
          </Button>{" "}
        </Template>
      ) : (
        <Template props={props} location={pathLocation}>
          <SecondHeader title={"고양이들을 소개합니다!"} />
          <Button
            is_float="is_float"
            clickEvent={() => {
              requestLocationInfo();
            }}
          >
            <FontAwesomeIcon icon={faPencilAlt} style={{ width: "20px" }} />
          </Button>
        </Template>
      )}
    </>
  );
};

export default Home;
