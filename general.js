/**
 * general.js
 * Requirements (Task 11):
 * - Use Axios
 * - Retrieve all books
 * - Retrieve by ISBN
 * - Retrieve by author
 * - Retrieve by title
 * - Use promise callbacks OR async/await
 */

const axios = require("axios");

// đổi port/base nếu bạn chạy khác
const BASE_URL = "http://localhost:5000";

// 1) Promise + callback style
function getAllBooks(callback) {
  axios
    .get(`${BASE_URL}/`)
    .then((response) => callback(null, response.data))
    .catch((error) => callback(error, null));
}

// 2) Promise return (ISBN)
function getBookByISBN(isbn) {
  return axios
    .get(`${BASE_URL}/isbn/${encodeURIComponent(isbn)}`)
    .then((response) => response.data);
}

// 3) async/await (author)
async function getBooksByAuthor(author) {
  const response = await axios.get(
    `${BASE_URL}/author/${encodeURIComponent(author)}`
  );
  return response.data;
}

// 4) async/await (title)
async function getBooksByTitle(title) {
  const response = await axios.get(
    `${BASE_URL}/title/${encodeURIComponent(title)}`
  );
  return response.data;
}

// Demo chạy thử khi bạn node general.js (không bắt buộc nộp, nhưng hữu ích)
if (require.main === module) {
  getAllBooks((err, data) => {
    if (err) console.error("getAllBooks error:", err.message);
    else console.log("All books:", data);
  });

  getBookByISBN("1")
    .then((data) => console.log("Book by ISBN:", data))
    .catch((e) => console.error("getBookByISBN error:", e.message));

  (async () => {
    try {
      const byAuthor = await getBooksByAuthor("Chinua");
      console.log("Books by author:", byAuthor);

      const byTitle = await getBooksByTitle("Pride");
      console.log("Books by title:", byTitle);
    } catch (e) {
      console.error("async error:", e.message);
    }
  })();
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
};
