var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getData } from "./api.js";
export function renderPosts(posts) {
    return __awaiter(this, void 0, void 0, function* () {
        const postContainer = document.getElementById("postContainer");
        postContainer.innerHTML = "";
        yield posts.then((postList) => {
            postList.forEach((post) => {
                postContainer.appendChild(renderPost(post));
            });
        });
    });
}
function renderPost(post) {
    const userDiv = renderUserInfo(post);
    userDiv.addEventListener("click", () => renderUserCard(post.userId));
    const textDiv = renderTextInfo(post);
    const postDiv = wrapper(userDiv, textDiv);
    postDiv.classList.add("post");
    return postDiv;
}
function renderUserInfo(post) {
    const userId = createWithText("p", "user #" + post.userId);
    const postId = createWithText("p", "post #" + post.id);
    postId.classList.add("postNumber");
    const userIcon = document.createElement("div");
    userIcon.classList.add("userIcon");
    const userInfo = wrapper(userIcon, userId, postId);
    userInfo.classList.add("userInfo");
    return userInfo;
}
function renderTextInfo(post) {
    const h1 = createWithText("h1", post.title);
    const p = createWithText("p", post.body);
    const textInfo = wrapper(h1, p);
    textInfo.classList.add("textInfo");
    return textInfo;
}
function renderUserCard(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.toggle("hidden");
        let user;
        yield getData("users/", `?id=${userID}`).then((searchedUser) => (user = searchedUser[0]));
        const userIcon = document.createElement("div");
        userIcon.classList.add("card__userIcon");
        const userCardInfo = renderUserCardInfo(user);
        const closeButton = document.createElement("input");
        closeButton.type = "button";
        closeButton.classList.toggle("card__button");
        closeButton.value = "Закрыть";
        const cardDiv = wrapper(userIcon, userCardInfo, closeButton);
        cardDiv.classList.toggle("card");
        closeButton.addEventListener("click", () => removeUserCard(cardDiv));
        document.body.appendChild(cardDiv);
    });
}
function renderUserCardInfo(user) {
    const username = createWithText("h1", user.username);
    const name = createWithText("p", user.name);
    const email = createWithText("p", user.email);
    const website = createWithText("p", user.website);
    const div = wrapper(username, name, email, website);
    div.classList.toggle("card__info");
    return div;
}
function removeUserCard(card) {
    var _a;
    card.remove();
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
}
function createWithText(el, text) {
    const x = document.createElement(el);
    x.innerText = text;
    return x;
}
function wrapper(...els) {
    const div = document.createElement("div");
    els.forEach((el) => {
        div.appendChild(el);
    });
    return div;
}
