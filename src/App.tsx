import React, { useEffect, useState } from "react";

import Pagination from "./components/Pagination/Pagination";
import { usePagination } from "./hooks/usePagination";
import { ITEMS_PER_PAGE, PAGE_LIMIT } from "./constants/contstants";
import "./App.scss";

interface User {
  firstName: string;
  age: number;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [offInfinityPagination, setOffInfinityPagination] = useState(false);
  const [isPagesLimited, setIsPagesLimit] = useState(false);

  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    goToPage,
    goToNextThreePages,
    goToPrevThreePages,
    setCurrentPage,
  } = usePagination({
    totalItems: totalUsers,
    itemsPerPage: ITEMS_PER_PAGE,
    isCyclic: !offInfinityPagination,
  });

  const handleLimitToggle = () => {
    if (!isPagesLimited) {
      const confirmReset = window.confirm(
        "Включение лимита страниц сбросит текущую страницу на первую. Вы уверены?"
      );
      if (confirmReset) {
        setIsPagesLimit(true);
        setCurrentPage(1);
      }
    } else {
      setIsPagesLimit(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        `https://dummyjson.com/users?limit=${ITEMS_PER_PAGE}&skip=${
          (currentPage - 1) * ITEMS_PER_PAGE
        }&select=firstName,age`
      );
      const data = await res.json();
      setUsers(data.users);
      setTotalUsers(data.total);
    };

    fetchUsers();
  }, [currentPage]);

  return (
    <div className="app">
      <div className="wrapper">
        <h1>User List</h1>
        <ul className="list">
          {users.map((user, index) => (
            <li key={index} className="item">
              {user.firstName}, {user.age} years old
            </li>
          ))}
        </ul>

        <div className="actions">
          <div>
            <label>
              <input
                type="checkbox"
                checked={!offInfinityPagination}
                onChange={() =>
                  setOffInfinityPagination(!offInfinityPagination)
                }
              />
              Enable Cyclic Pagination
            </label>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={isPagesLimited}
                onChange={handleLimitToggle}
              />
              Enable Limit Pages
            </label>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={isPagesLimited ? PAGE_LIMIT : totalPages}
            goToNextPage={goToNextPage}
            goToPrevPage={goToPrevPage}
            goToPage={goToPage}
            goToNextThreePages={goToNextThreePages}
            goToPrevThreePages={goToPrevThreePages}
            offInfinityPagination={offInfinityPagination}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
