import React from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import { fetchBooks, onPageChange, onSelectRadio } from "../../actions/books";
import BookPage from "./BooksPlusPaginationAndFilters";
import { withLoading, withError } from "../../hoc/hoc";
import $ from "jquery";

function rafAsync() {
  return new Promise(resolve => {
    requestAnimationFrame(resolve);
  });
}

function checkElement(selector) {
  if (document.querySelector(selector) === null) {
    return rafAsync().then(() => checkElement(selector));
  } else {
    return Promise.resolve(document.querySelectorAll(selector));
  }
}
class BookList extends React.Component {
  componentDidMount() {
    this.props.fetchBooks(this.props.dataIsCached);
    checkElement("#bk-list li") //use whichever selector you want
      .then($books => {
        $books.forEach($book => {
          let $other = { ...$books, $book };
          let $parent = $book.parentElement;
          let children = $book.children;
          console.log(children);
          // var $page = $book.children("div.bk-page");
          // var $bookview = $parent.find("button.bk-bookview");
          // var $content = $page.children("div.bk-content");
          // var current = 0;
          // $parent.find("button.bk-bookback").on("click", function() {
          //   $bookview.removeClass("bk-active");
          //   if ($book.data("flip")) {
          //     $book
          //       .data({ opened: false, flip: false })
          //       .removeClass("bk-viewback")
          //       .addClass("bk-bookdefault");
          //   } else {
          //     $book
          //       .data({ opened: false, flip: true })
          //       .removeClass("bk-viewinside bk-bookdefault")
          //       .addClass("bk-viewback");
          //   }
          // });
        });
      });
    // var Books = (() => {
    //   var $books = $("#bk-list > li > div.bk-book"),
    //     booksCount = $books.length;

    //   init = () => {
    //     $books.each(function() {
    //       var $book = $(this),
    //         $other = $books.not($book),
    //         $parent = $book.parent(),
    //         $page = $book.children("div.bk-page"),
    //         $bookview = $parent.find("button.bk-bookview"),
    //         $content = $page.children("div.bk-content"),
    //         current = 0;

    //       $parent.find("button.bk-bookback").on("click", function() {
    //         $bookview.removeClass("bk-active");

    //         if ($book.data("flip")) {
    //           $book
    //             .data({ opened: false, flip: false })
    //             .removeClass("bk-viewback")
    //             .addClass("bk-bookdefault");
    //         } else {
    //           $book
    //             .data({ opened: false, flip: true })
    //             .removeClass("bk-viewinside bk-bookdefault")
    //             .addClass("bk-viewback");
    //         }
    //       });

    //       $bookview.on("click", function() {
    //         var $this = $(this);

    //         $other
    //           .data("opened", false)
    //           .removeClass("bk-viewinside")
    //           .parent()
    //           .css("z-index", 0)
    //           .find("button.bk-bookview")
    //           .removeClass("bk-active");
    //         if (!$other.hasClass("bk-viewback")) {
    //           $other.addClass("bk-bookdefault");
    //         }

    //         if ($book.data("opened")) {
    //           $this.removeClass("bk-active");
    //           $book
    //             .data({ opened: false, flip: false })
    //             .removeClass("bk-viewinside")
    //             .addClass("bk-bookdefault");
    //         } else {
    //           $this.addClass("bk-active");
    //           $book
    //             .data({ opened: true, flip: false })
    //             .removeClass("bk-viewback bk-bookdefault")
    //             .addClass("bk-viewinside");
    //           $parent.css("z-index", booksCount);
    //           current = 0;
    //           $content
    //             .removeClass("bk-content-current")
    //             .eq(current)
    //             .addClass("bk-content-current");
    //         }
    //       });

    //       if ($content.length > 1) {
    //         var $navPrev = $('<span class="bk-page-prev">&lt;</span>'),
    //           $navNext = $('<span class="bk-page-next">&gt;</span>');

    //         $page.append($("<nav></nav>").append($navPrev, $navNext));

    //         $navPrev.on("click", function() {
    //           if (current > 0) {
    //             --current;
    //             $content
    //               .removeClass("bk-content-current")
    //               .eq(current)
    //               .addClass("bk-content-current");
    //           }
    //           return false;
    //         });

    //         $navNext.on("click", function() {
    //           if (current < $content.length - 1) {
    //             ++current;
    //             $content
    //               .removeClass("bk-content-current")
    //               .eq(current)
    //               .addClass("bk-content-current");
    //           }
    //           return false;
    //         });
    //       }
    //     });
    //   };

    //   return { init: init };
    // })();
    // Books.init();
  }
  handleClickOnBook = id => {
    this.props.history.push(`/books/${id}`);
  };
  render() {
    const {
      data,
      error,
      loading,
      currentPage,
      bookPerPage,
      language,
      onSelectRadio,
      onPageChange
    } = this.props;
    const dataToShow =
      language !== "No filter"
        ? data.filter(item => language.includes(item.langue_nom))
        : data;

    const indexOfLastBook = currentPage * bookPerPage;
    const indexOfFirstBook = indexOfLastBook - bookPerPage;
    const paginatedData = dataToShow.slice(indexOfFirstBook, indexOfLastBook);

    return (
      <Container className="booklist">
        <BookPageWithLoadingAndErrorHandling
          bookPerPage={bookPerPage}
          dataToShow={dataToShow}
          onPageChange={onPageChange}
          currentPage={currentPage}
          onSelectRadio={onSelectRadio}
          paginatedData={paginatedData}
          language={language}
          loading={loading}
          error={error}
          handleClickOnBook={this.handleClickOnBook}
        />

        {this.props.children}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectRadio: event => dispatch(onSelectRadio(event)),
    onPageChange: pageNumber => dispatch(onPageChange(pageNumber)),
    fetchBooks: dataIsCached => dispatch(fetchBooks(dataIsCached))
  };
};

const BookPageWithLoading = withLoading(BookPage);
const BookPageWithLoadingAndErrorHandling = withError(BookPageWithLoading);

const mapStateToProps = state => {
  return {
    loading: state.books.loading,
    error: state.books.error,
    data: state.books.data,
    currentPage: state.books.currentPage,
    setPage: state.books.setPage,
    bookPerPage: state.books.bookPerPage,
    language: state.books.language,
    isAuthenticated: state.auth.token !== null,
    dataIsCached: state.books.data.length != 0
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
