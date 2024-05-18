import { renderPosts } from "./renderer.js";
import { getData } from "./api.js";
const DELAY = 500;
renderPosts(getData("posts", ""));
function searching() {
    const userRequest = document.getElementById("inputLine")
        .value;
    renderPosts(getData("posts", `?title_like=${encodeURIComponent(userRequest)}`));
}
let timeoutId;
window.onload = function () {
    document.getElementById("inputLine").addEventListener("input", () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(searching, DELAY);
    });
};
