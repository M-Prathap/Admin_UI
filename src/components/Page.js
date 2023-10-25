import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "../components/Page.css";

const Page = ({ lastUbdatePage, PerPage, totalContent, PageNevigation }) => {
  const totalPages = Math.ceil(totalContent / PerPage);

  const PageNavigationButtons = () => {
    const PageButtons = [];

    PageButtons.push(
      <button
        key="first"
        onClick={() => PageNevigation(1)}
        className={lastUbdatePage === 1 ? "active" : ""}
      >
        <i className="fas fa-angle-double-left"></i>
      </button>
    );

    PageButtons.push(
      <button
        key="previous"
        onClick={() => PageNevigation(lastUbdatePage - 1)}
        className={lastUbdatePage === 1 ? "disabled" : ""}
      >
        <i className="fas fa-angle-left"></i>
      </button>
    );

    for (let page = 1; page <= totalPages; page++) {
      PageButtons.push(
        <button
          key={page}
          onClick={() => PageNevigation(page)}
          className={lastUbdatePage === page ? "active" : ""}
        >
          {page}
        </button>
      );
    }

    PageButtons.push(
      <button
        key="next"
        onClick={() => PageNevigation(lastUbdatePage + 1)}
        className={lastUbdatePage === totalPages ? "disabled" : ""}
      >
        <i className="fas fa-angle-right"></i>
      </button>
    );

    PageButtons.push(
      <button
        key="last"
        onClick={() => PageNevigation(totalPages)}
        className={lastUbdatePage === totalPages ? "active" : ""}
      >
        <i className="fas fa-angle-double-right"></i>
      </button>
    );

    return PageButtons;
  };

  return <div className="page">{PageNavigationButtons()}</div>;
};

export default Page;
