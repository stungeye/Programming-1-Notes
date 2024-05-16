document.addEventListener("DOMContentLoaded", function (event) {
  if (GLightbox) {
    GLightbox({ selector: "img" });
  }

// Find all c++ code blocks.
const cppBlocks = document.querySelectorAll("div.language-cpp code");

// Auto link cpp code blocks that contain main() lines to godbolt.
cppBlocks.forEach(block => {
        // Extract the raw text content by concatenating all text nodes within the code block
        let rawCode = '';
        block.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                rawCode += node.textContent;
            } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN') {
                rawCode += node.textContent;
            }
        });

        // Check if the code contains "int main("
        if (!rawCode.includes("int main(")) {
            return;
        }

        // This is the JSON data required by the godbolt /clientstate API endpoint.
        const clientState = {"sessions":[{"id":1,"language":"c++","source":rawCode,"compilers":[],"executors":[{"compiler":{"id":"gsnapshot","libs":[],"options":"-std=c++20"}}]}]};
        const clientStateStr = JSON.stringify(clientState);

        // Replace characters in the range [\u007F-\uFFFF] with Unicode escape sequences
        const escapedClientStateStr = clientStateStr.replace(/[\u007F-\uFFFF]/g, (c) => {
            return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
        });

        // The session JSON data must be base 64 encoded for the godbolt API.
        const encodedClientState = btoa(escapedClientStateStr);

        const link = document.createElement("a");
        link.href = `https://godbolt.org/clientstate/${encodedClientState}`;
        link.textContent = "🚀 Run on Compiler Explorer";
        link.classList.add("godbolt"); 
        link.target = "_blank";

        block.parentElement.parentElement.appendChild(link);
    });
});
