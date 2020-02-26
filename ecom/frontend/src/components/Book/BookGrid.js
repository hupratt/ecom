import React from "react";
import { Grid, Item } from "semantic-ui-react";
import { s3_base_url } from "../../constants";
import styled, { ThemeProvider } from "styled-components";
import FlipButton from "../Layout/FlipButton";
import ViewInsideButton from "../Layout/ViewInsideButton";

// Define our button, but with the use of props.theme this time
const TiltBook = styled.img`
  background-image: url(${props => props.theme.url});
  height: 100%;
  width: 100%;
  background-size: cover;
`;

// We are passing a default theme for Buttons that arent wrapped in the ThemeProvider
TiltBook.defaultProps = {
  theme: {
    url: "http://www.images/1.png"
  }
};

const BookGrid = ({ paginatedData, handleClickOnBook }) => {
  return (
    <Grid divided>
      <React.Fragment>
        <ul id="bk-list" className="bk-list clearfix">
          {paginatedData.map(item => {
            const theme = {
              url: `${s3_base_url}${item.isbn}.jpg`
            };
            return (
              <li key={item.id}>
                <ThemeProvider theme={theme}>
                  <div className="bk-book bk-bookdefault" id={item.isbn}>
                    <div className="bk-front">
                      <div className="bk-cover-back"></div>
                      <TiltBook
                        className="bk-cover"
                        onClick={() => handleClickOnBook(item.id)}
                      ></TiltBook>
                    </div>
                    <div className="bk-page">
                      <div className="bk-content bk-content-current">
                        <p>
                          Red snapper Kafue pike fangtooth humums slipmouth,
                          salmon cutlassfish; swallower European perch mola mola
                          sunfish, threadfin bream. Billfish hog sucker
                          trout-perch lenok orbicular velvetfish. Delta smelt
                          striped bass, medusafish dragon goby starry flounder
                          cuchia round whitefish northern anchovy spadefish
                          merluccid hake cat shark Black pickerel. Pacific cod.
                        </p>
                      </div>
                    </div>
                    <div className="bk-back">
                      <p>
                        In this nightmare vision of cats in revolt,
                        fifteen-year-old Alex and his friends set out on a
                        diabolical orgy of robbery, rape, torture and murder.
                        Alex is jailed for his teenage delinquency and the State
                        tries to reform him - but at what cost?
                      </p>
                    </div>
                    <div className="bk-right"></div>

                    <div className="bk-left">
                      <h2>
                        <span>{item.auteur_nom}</span>
                        <span>{item.titre}</span>
                      </h2>
                    </div>
                    <div className="bk-top"></div>
                    <div className="bk-bottom"></div>
                  </div>

                  <div className="bk-info">
                    <FlipButton isbn={item.isbn} />
                    <ViewInsideButton isbn={item.isbn} />
                    <h3>
                      <span>{item.auteur_nom}</span>
                      <span>{item.titre}</span>
                    </h3>
                    <p>
                      Social prophecy? Black comedy? Study of freewill? A
                      Clockwork Orange is all of these. It is also a dazzling
                      experiment in language, as Burghiss creates a new language
                      - 'meow', the cat slang of a not-too-distant future.
                    </p>
                  </div>
                </ThemeProvider>
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    </Grid>
  );
};

export default BookGrid;