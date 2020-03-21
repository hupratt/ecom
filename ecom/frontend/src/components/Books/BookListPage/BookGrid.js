import React from "react";
import { Grid, Dimmer, Loader, Segment } from "semantic-ui-react";
import { s3_base_url } from "../../../constants";
import styled, { ThemeProvider } from "styled-components";
import FlipButton from "../../Buttons/FlipButton";
import ViewInsideButton from "../../Buttons/ViewInsideButton";
import PropTypes from "prop-types";

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

const propTypes = {
  paginatedData: PropTypes.array.isRequired,
  handleClickOnBook: PropTypes.func.isRequired
};

const BookGrid = ({ paginatedData, handleClickOnBook }) => {
  return (
    <React.Fragment>
      <Grid divided>
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
                        <p>Red snapper KafuReReReReReReRe</p>
                      </div>
                    </div>
                    <div className="bk-back">
                      <p>
                        In thRe-year-old Alex andReinquency and the State tries
                        to reform him - but at what cost?
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
          {[...Array(8)].map((e, i) => (
            <li key={i}>
              <div className="bk-book bk-bookdefault">
                <div className="bk-front" id="loadmoar">
                  <div className="bk-cover-back"></div>
                  <Segment>
                    <Dimmer active inverted>
                      <Loader inverted>Loading</Loader>
                    </Dimmer>
                  </Segment>
                </div>
                <div className="bk-page">
                  <div className="bk-content bk-content-current"></div>
                </div>
                <div className="bk-back"></div>
                <div className="bk-right"></div>

                <div className="bk-left">
                  <h2>
                    <span>Lorem, ipsum.</span>
                    <span>Lorem, ipsum.</span>
                  </h2>
                </div>
                <div className="bk-top"></div>
                <div className="bk-bottom"></div>
              </div>

              <div className="bk-info">
                <FlipButton />
                <ViewInsideButton />
                <h3>
                  <span>Lorem, ipsum.</span>
                  <span>Lorem, ipsum.</span>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia soluta beatae nesciunt hic debitis repellat nobis
                  alias sapiente blanditiis, laboriosam natus nemo? Consequatur
                  maxime fugit tempora molestiae sunt culpa omnis?
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Grid>
    </React.Fragment>
  );
};

BookGrid.propTypes = propTypes;

export default BookGrid;
