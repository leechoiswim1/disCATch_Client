import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

import styled from "styled-components";

import { saveVillage } from "../../redux/modules/mypage";
import { useDispatch } from "react-redux";
import { Search } from "react-feather";
const SearchAddress = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState(""); // 주소
  const [addressDetail, setAddressDetail] = useState(""); // 상세주소

  const [isOpenPost, setIsOpenPost] = useState(false);

  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    console.log(data.sigungu);
    console.log(data.bname);
    dispatch(saveVillage(data.bname));
    setIsOpenPost(false);
  };

  const postCodeStyle = {
    display: "block",
    position: "relative",
    top: "0%",
    width: "400px",
    height: "400px",
    padding: "7px",
  };

  return (
    <>
      <SearchButton onClick={onChangeOpenPost}>
        <p>동네검색하기</p>
        <Search />
      </SearchButton>
      {isOpenPost ? (
        <DaumPostcode
          style={postCodeStyle}
          autoClose
          onComplete={onCompletePost}
        />
      ) : null}
    </>
  );
};

const SearchButton = styled.div`
  background: #f9c852;
  width: 75%;
  height: 32px;
  border: none;
  border-radius: 10px;
  justify-content: center;
  margin: 10px auto 0px;
  display: flex;
  cursor: pointer;
  p {
    width: 100px;
    margin: auto;
    font-size: 16px;
    font-weight: 900;
    text-align: center;
  }
  svg {
    width: 16px;
    margin: auto;
  }
`;

export default SearchAddress;