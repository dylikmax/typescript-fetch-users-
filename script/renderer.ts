import { getData } from "./api";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  name: string;
  username: string;
  email: string;
  website: string;
}

export async function renderPosts(posts: Promise<Array<Post>>) {
  const postContainer = document.getElementById("postContainer")!;
  postContainer.innerHTML = "";
  await posts.then((postList) => {
    postList.forEach((post) => {
      postContainer.appendChild(renderPost(post));
    });
  });
}

function renderPost(post: Post) {
  const userDiv = renderUserInfo(post);
  userDiv.addEventListener("click", () => renderUserCard(post.userId));
  const textDiv = renderTextInfo(post);
  
  const postDiv = wrapper(userDiv, textDiv);
  postDiv.classList.add("post");
  return postDiv;
}

function renderUserInfo(post: Post) {
  const userId = createWithText("p", "user #" + post.userId);
  const postId = createWithText("p", "post #" + post.id);
  postId.classList.add("postNumber");
  const userIcon = document.createElement("div");
  userIcon.classList.add("userIcon");

  const userInfo = wrapper(userIcon, userId, postId);
  userInfo.classList.add("userInfo");
  return userInfo;
}

function renderTextInfo(post: Post) {
  const h1 = createWithText("h1", post.title);
  const p = createWithText("p", post.body);

  const textInfo = wrapper(h1, p);
  textInfo.classList.add("textInfo");
  return textInfo;
}

async function renderUserCard(userID: number) {
  document.querySelector(".container")?.classList.toggle("hidden");

  let user: User;
  await getData("users/", `?id=${userID}`).then(
    (searchedUser) => (user = searchedUser[0])
  );

  const userIcon = document.createElement("div");
  userIcon.classList.add("card__userIcon");

  const userCardInfo = renderUserCardInfo(user!);

  const closeButton = document.createElement("input");
  closeButton.type = "button";
  closeButton.classList.toggle("card__button");
  closeButton.value = "Закрыть";

  const cardDiv = wrapper(userIcon, userCardInfo, closeButton);
  cardDiv.classList.toggle("card");
  closeButton.addEventListener("click", () => removeUserCard(cardDiv));

  document.body.appendChild(cardDiv);
}

function renderUserCardInfo(user: User) {
  const username = createWithText("h1", user.username);
  const name = createWithText("p", user.name);
  const email = createWithText("p", user.email);
  const website = createWithText("p", user.website);

  const div = wrapper(username, name, email, website);
  div.classList.toggle("card__info");
  return div;
}

function removeUserCard(card: HTMLElement) {
  card.remove();
  document.querySelector(".container")?.classList.remove("hidden");
}

function createWithText(el: string, text: string) {
  const x = document.createElement(el);
  x.innerText = text;
  return x;
}

function wrapper(...els: Array<HTMLElement>) {
  const div = document.createElement("div");
  els.forEach((el) => {
    div.appendChild(el);
  });
  return div;
}
