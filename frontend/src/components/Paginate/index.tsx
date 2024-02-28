import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { IPaginateProps } from "./types";

const Paginate = ({ pages, page, pathname, keyword = "" }: IPaginateProps) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((p) => (
          <LinkContainer
            key={p + 1} // p + 1 because .keys() beginning from 0, 1, 2,...
            to={
              keyword
                ? `/search/${keyword}/${pathname}/${p + 1}`
                : `/${pathname}/${p + 1}`
            }
          >
            <Pagination.Item active={p + 1 === page}>{p + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
