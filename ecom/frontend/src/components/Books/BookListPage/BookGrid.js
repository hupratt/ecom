import React from "react";
import { Grid, Dimmer, Loader, Segment } from "semantic-ui-react";
import { s3_base_url, mediaEndpoint } from "../../../constants";
import styled, { ThemeProvider } from "styled-components";
import FlipButton from "../../Buttons/FlipButton";
import ViewInsideButton from "../../Buttons/ViewInsideButton";
import PropTypes from "prop-types";
import { shortDescr } from "../../utility";

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

const CoolSVGResultsIsEmpty = () => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img
          src={`${s3_base_url}resources/noresults.png`}
          style={{ width: "50%" }}
        />
      </div>
    </React.Fragment>
  );
};

const BookGrid = ({
  paginatedData,
  handleClickOnBook,
  paginatedDataLength,
  length
}) => {
  return (
    <React.Fragment>
      <Grid divided>
        <ul id="bk-list" className="bk-list clearfix">
          {paginatedData ? (
            paginatedData.map(item => {
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
                          <p>{shortDescr(item.description)}</p>
                        </div>
                      </div>
                      <div className="bk-back">
                        <p>{shortDescr(item.description)}</p>
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
                      <button onClick={() => handleClickOnBook(item.id)}>
                        Buy
                      </button>
                      <h3>
                        <span>{item.auteur_nom}</span>
                        <span>{item.titre}</span>
                        <span>{item.isbn}</span>
                      </h3>
                      <p>
                        {shortDescr(item.description)}
                        {item.description && (
                          <a
                            style={{ fontStyle: "italic" }}
                            onClick={() => handleClickOnBook(item.id)}
                          >
                            . Read More
                          </a>
                        )}
                      </p>
                    </div>
                  </ThemeProvider>
                </li>
              );
            })
          ) : (
            <CoolSVGResultsIsEmpty />
          )}
          {length - paginatedDataLength > 0 ? (
            [...Array(length - paginatedDataLength || 0)].map((e, i) => (
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
                    alias sapiente blanditiis, laboriosam natus nemo?
                    Consequatur maxime fugit tempora molestiae sunt culpa omnis?
                  </p>
                </div>
              </li>
            ))
          ) : (
            <CoolSVGResultsIsEmpty />
          )}
        </ul>
      </Grid>
    </React.Fragment>
  );
};

BookGrid.propTypes = propTypes;

export default BookGrid;
