/* =============== To Do App List By OOP =============== */

const form = document.querySelector("form");
const list = document.querySelector("ul");

let todoArray = localStorage.getItem("todoArray")
  ? JSON.parse(localStorage.getItem("todoArray"))
  : [];

// when window loaded
window.onload = () => {
  Todo.render_to_do_app(todoArray);
};

form.addEventListener("submit", (e) => {
  let form_input = window.form_input;

  e.preventDefault();

  // add to do app
  const new_to_do = new Todo(form_input.value);

  // add to array
  todoArray = [...todoArray, new_to_do];

  // set to local storage
  Todo.set_to_storage(todoArray);

  // render item
  Todo.render_to_do_app(todoArray);

  // empty input
  form_input.value = "";
});

// delete item
list.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    Todo.delete_to_do_app(e.target.dataset.id, todoArray);
  }
});

class Todo {
  constructor(text) {
    this.id = todoArray.length + 1;
    this.text = text;
  }

  static render_to_do_app(arr) {
    let item = arr.map((item) => {
      return `
                <li>
                    <span>${item.text}</span>
                    <button class="delete-btn"  data-id="${item.id}">X</button>
                </li>
            `;
    });
    list.innerHTML = item.join("");
  }

  static set_to_storage(arr) {
    return localStorage.setItem("todoArray", JSON.stringify(arr));
  }

  static delete_to_do_app(id, arr) {
    todoArray = arr.filter((item) => item.id != +id);
    Todo.render_to_do_app(todoArray);
    Todo.set_to_storage(todoArray);
  }
}
