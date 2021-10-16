// library
import React from 'react';
import { useSelector } from 'react-redux';
import { css } from 'styled-components';

// element
import { Grid, Text, Image, Button } from '../../elements';

// component
import { Like } from '..';

// redux
import { history } from '../../redux/configureStore';

// style
import { flexBox } from '../../shared/style';

const CatPost = (cat) => {
  const catId = cat.catId;
  console.log(catId);
  // console.log(cat);

  const location = useSelector((state) => state.map.keywordList[0]);

  return (
    <React.Fragment>
      <Grid
        margin="6% 0 0 0"
        bgColor="diaryColor"
        display="flex"
        padding="8px"
        alignItems="center"
        cursor="pointer"
      >
        <Image src={cat.catImage} borderRadius="10px" />
        <Grid padding="6px" alignItems="center">
          <Grid
            height="auto"
            addstyle={() => {
              return css`
                ${flexBox('space-between')}
              `;
            }}
          >
            <Text fontWeight="bold" size="12px" width="40%">
              {cat.catName}
            </Text>
            <Text fontWeight="bold" size="12px" margin="0 0 0 0" width="60%">
              중성화: {cat.neutering}
            </Text>

            {catId ? <Like /> : null}
          </Grid>
          {cat.catTagList ? (
            <Grid
              margin="2% 0 0 0"
              addstyle={() => {
                return css`
                  ${flexBox('space-between')}
                `;
              }}
            >
              {cat.catTagList.map((tag, idx) => {
                return (
                  <Text key={idx} size="12px" fontWeight="bold">
                    #{tag.tag}
                  </Text>
                );
              })}

              <Button
                clickEvent={() => {
                  history.push(`/catdetail/${catId}/${location}`);
                }}
                fontWeight="bold"
                padding="0"
                bgColor="diaryColor"
              >
                자세히보기
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CatPost;
