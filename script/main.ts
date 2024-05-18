import { renderPosts } from "./renderer";
import { getData } from "./api";

const DELAY = 500;

renderPosts(getData("posts", ""));

function searching() {
  const userRequest = (document.getElementById("inputLine") as HTMLInputElement)
    .value;
  renderPosts(
    getData("posts", `?title_like=${encodeURIComponent(userRequest)}`)
  );
}

let timeoutId: number | undefined;

window.onload = function () {
  (document.getElementById("inputLine") as HTMLInputElement).addEventListener(
    "input",
    () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(searching, DELAY);
    }
  );
};
