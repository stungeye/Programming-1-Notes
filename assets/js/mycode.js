document.addEventListener("DOMContentLoaded", function (event) {
  if (GLightbox) {
    GLightbox({ selector: "img" });
  }

  const codepens = document.querySelectorAll(".codepen");

  if (codepens.length > 0) {
    const codepenScript = document.createElement("script");
    codepenScript.src = "https://static.codepen.io/assets/embed/ei.js";
    document.head.appendChild(codepenScript);
  }
});
