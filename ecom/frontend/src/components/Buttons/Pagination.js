import React from "react";
import { Grid } from "semantic-ui-react";
import { Dimmer, Loader, Segment, Message } from "semantic-ui-react";

const PaginationShorthand = ({
  bookPerPage,
  books,
  paginate,
  currentPage,
  children,
  loadmoar
}) => {
  return (
    <Grid divided>
      <React.Fragment>
        <ul id="bk-list" className="bk-list clearfix">
          <div className="my-pagination">
            <li>
              <div className="bk-book bk-bookdefault">
                <div className="bk-front">
                  <div className="bk-cover-back"></div>
                  <Segment>
                    <Dimmer active inverted>
                      <Loader inverted>Loading</Loader>
                    </Dimmer>
                  </Segment>
                </div>
                <div className="bk-page">
                  <div className="bk-content bk-content-current">
                    <p>Red snapper KafuReReReReReReRe</p>
                  </div>
                </div>
                <div className="bk-back">
                  <p>
                    In thRe-year-old Alex andReinquency and the State tries to
                    reform him - but at what cost?
                  </p>
                </div>
                <div className="bk-right"></div>

                <div className="bk-left">
                  <h2></h2>
                </div>
                <div className="bk-top"></div>
                <div className="bk-bottom"></div>
              </div>

              <div className="bk-info">
                <h3></h3>
                <p>
                  Social prophecy? Black comedy? Study of freewill? A Clockwork
                  Orange is all of these. It is also a dazzling experiment in
                  language, as Burghiss creates a new language - 'meow', the cat
                  slang of a not-too-distant future.
                </p>
              </div>
            </li>
            <li>
              <div className="bk-book bk-bookdefault">
                <div className="bk-front">
                  <div className="bk-cover-back"></div>
                  <Segment>
                    <Dimmer active inverted>
                      <Loader inverted>Loading</Loader>
                    </Dimmer>
                  </Segment>
                </div>
                <div className="bk-page">
                  <div className="bk-content bk-content-current">
                    <p>Red snapper KafuReReReReReReRe</p>
                  </div>
                </div>
                <div className="bk-back">
                  <p>
                    In thRe-year-old Alex andReinquency and the State tries to
                    reform him - but at what cost?
                  </p>
                </div>
                <div className="bk-right"></div>

                <div className="bk-left">
                  <h2></h2>
                </div>
                <div className="bk-top"></div>
                <div className="bk-bottom"></div>
              </div>

              <div className="bk-info">
                <h3></h3>
                <p>
                  Social prophecy? Black comedy? Study of freewill? A Clockwork
                  Orange is all of these. It is also a dazzling experiment in
                  language, as Burghiss creates a new language - 'meow', the cat
                  slang of a not-too-distant future.
                </p>
              </div>
            </li>
            <li>
              <div className="bk-book bk-bookdefault">
                <div className="bk-front">
                  <div className="bk-cover-back"></div>
                  <Segment>
                    <Dimmer active inverted>
                      <Loader inverted>Loading</Loader>
                    </Dimmer>
                  </Segment>
                </div>
                <div className="bk-page">
                  <div className="bk-content bk-content-current">
                    <p>Red snapper KafuReReReReReReRe</p>
                  </div>
                </div>
                <div className="bk-back">
                  <p>
                    In thRe-year-old Alex andReinquency and the State tries to
                    reform him - but at what cost?
                  </p>
                </div>
                <div className="bk-right"></div>

                <div className="bk-left">
                  <h2></h2>
                </div>
                <div className="bk-top"></div>
                <div className="bk-bottom"></div>
              </div>

              <div className="bk-info">
                <h3></h3>
                <p>
                  Social prophecy? Black comedy? Study of freewill? A Clockwork
                  Orange is all of these. It is also a dazzling experiment in
                  language, as Burghiss creates a new language - 'meow', the cat
                  slang of a not-too-distant future.
                </p>
              </div>
            </li>
          </div>
        </ul>
      </React.Fragment>
    </Grid>
  );
};

export default PaginationShorthand;
