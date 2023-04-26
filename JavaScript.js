let allMemo = JSON.parse(localStorage.getItem("allMemo"));
allMemo = allMemo = [];
render();

function updateCounter() {
  let contenttxt = document.querySelector("#content").value;
  const writeCounter = document.querySelector(".count");
  if (contenttxt.length > 500) {
    contenttxt = contenttxt.substring(0, 500);
    document.querySelector("#content").value = contenttxt;
  }
  writeCounter.innerHTML = "(" + contenttxt.length + "/500)";
}

function saveNote() {
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;

  if (title === "" && content === "") {
    alert("제목과 내용을 입력해주세요");
    return;
  }
  if (title === "") {
    alert("제목을 입력해주세요");
    return;
  } else if (content === "") {
    alert("내용을 입력해주세요");
    return;
  }
  allMemo.push({ title, content, len: allMemo.length });
  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();
}

function render() {
  const display = document.querySelector("#display");
  display.innerHTML = "";

  for (const item of allMemo) {
    const article = document.createElement("article");
    const saveTitle = document.createElement("h2");
    const saveContent = document.createElement("p");
    const saveId = document.createElement("span");
    const deleteMemoBtn = document.createElement("button");

    saveTitle.textContent = item.title;
    saveContent.textContent = item.content;
    saveId.textContent = item.len + 1;
    saveId.setAttribute("class", "number");
    deleteMemoBtn.setAttribute("class", "delete");
    deleteMemoBtn.setAttribute("id", item.len);
    deleteMemoBtn.setAttribute("onclick", "remove()");

    article.appendChild(saveId);
    article.appendChild(saveTitle);
    article.appendChild(saveContent);
    article.appendChild(deleteMemoBtn);

    display.appendChild(article);

    deleteMemoBtn.textContent = "삭제";
  }
}

function remove() {
  if (confirm("정말 삭제하시겠습니까?")) {
    const idx = allMemo.find((item) => item.len == event.srcElement.id);
    if (idx) {
      allMemo.splice(
        allMemo.findIndex((item) => item.len == idx.len),
        1
      );
    }
    localStorage.setItem("allMemo", JSON.stringify(allMemo));
    render();
  } else {
    return false;
  }
}
