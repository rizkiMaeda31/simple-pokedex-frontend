import styles from '../../styles/Home.module.css'

const Pagination = ({ items, pageSize, currentPage, onPageChange, count }) => {
    const pagesCount = Math.ceil(items.length / pageSize); // 100/10

    //if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    console.log(pages)

    return (
        <div>
            <div>pagination</div>
            {/*<div>{ items}</div>*/}
            <div>
                <ul className={styles.Pagination}>
                    {pages.map((page) => (
                        <li
                            key={page}
                            className={page === currentPage ? styles.pageItemActive : styles.pageItem}
                        >
                            <a className={styles.pageLink} onClick={() => onPageChange(page)}>{ page}</a>
                        </li>
                    )) }
                </ul>
            </div>
        </div>
    );

}

export default Pagination