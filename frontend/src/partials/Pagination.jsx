
export default function Pagination({ offsetScroll, handlePaging,length }){
  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className={`page-item ${offsetScroll <= 0 ? 'disabled' : ''}`}>
          <a className="page-link btn"  onClick={() => handlePaging(false)} tabIndex="-1">
            Previous
          </a>
        </li>
        {/* {[0, 1, 2].map((page) => (
          <li key={page} className={`page-item ${offsetScroll === page * 10 ? 'active' : ''}`}>
            <a className="page-link btn"  onClick={() => handlePaging(page * 10)}>
              {page + 1}
              {offsetScroll === page * 10 && <span className="sr-only">(current)</span>}
            </a>
          </li>
        ))} */}
        <li className={`page-item ${length < 10 ? 'disabled' : ''}`}>
          <a className="page-link btn"  onClick={() => handlePaging(true)}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

