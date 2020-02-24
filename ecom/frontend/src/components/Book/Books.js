import React from "react";
import { Grid, Item } from "semantic-ui-react";
import { s3_base_url } from "../../constants";

// Define our button, but with the use of props.theme this time
const TiltBook = styled.img`
  background-image: url(${props => props.theme.url});
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
      <div className="row">
        <React.Fragment>
          <div className="container">
            <div className="main">
              <ul id="bk-list" className="bk-list clearfix">
                {paginatedData.map(item => {
                  const theme = {
                    url: `${s3_base_url}${item.isbn}.jpg`
                  };
                  return (
                    <li>
                      <ThemeProvider theme={theme}>
                        <div className="bk-book book-1 bk-bookdefault">
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
                                Red snapper Kafue pike fangtooth humums
                                slipmouth, salmon cutlassfish; swallower
                                European perch mola mola sunfish, threadfin
                                bream. Billfish hog sucker trout-perch lenok
                                orbicular velvetfish. Delta smelt striped bass,
                                medusafish dragon goby starry flounder cuchia
                                round whitefish northern anchovy spadefish
                                merluccid hake cat shark Black pickerel. Pacific
                                cod.
                              </p>
                            </div>
                            <div className="bk-content">
                              <p>
                                Whale catfish leatherjacket deep sea anglerfish
                                grenadier sawfish pompano dolphinfish carp
                                large-eye bream, squeaker amago. Sandroller;
                                rough scad, tiger shovelnose catfish snubnose
                                parasitic eel? Black bass soldierfish
                                duckbill--Rattail Atlantic saury Blind shark
                                California halibut; false trevally warty angler!
                              </p>
                            </div>
                            <div className="bk-content">
                              <p>
                                Trahira giant wels cutlassfish snapper koi
                                blackchin mummichog mustard eel rock bass whiff
                                murray cod. Bigmouth buffalo ling cod giant
                                wels, sauger pink salmon. Clingfish luderick
                                treefish flatfish Cherubfish oldwife Indian mul
                                gizzard shad hagfish zebra danio. Butterfly ray
                                lizardfish ponyfish muskellunge Long-finned sand
                                diver mullet swordfish limia ghost carp
                                filefish.
                              </p>
                            </div>
                          </div>
                          <div className="bk-back">
                            <p>
                              In this nightmare vision of cats in revolt,
                              fifteen-year-old Alex and his friends set out on a
                              diabolical orgy of robbery, rape, torture and
                              murder. Alex is jailed for his teenage delinquency
                              and the State tries to reform him - but at what
                              cost?
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
                          <button className="bk-bookback">Flip</button>
                          <button className="bk-bookview">View inside</button>
                          <h3>
                            <span>{item.auteur_nom}</span>
                            <span>{item.titre}</span>
                          </h3>
                          <p>
                            Social prophecy? Black comedy? Study of freewill? A
                            Clockwork Orange is all of these. It is also a
                            dazzling experiment in language, as Burghiss creates
                            a new language - 'meow', the cat slang of a
                            not-too-distant future.
                          </p>
                        </div>
                      </ThemeProvider>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </React.Fragment>
      </div>
    </Grid>
  );
};

export default BookGrid;
