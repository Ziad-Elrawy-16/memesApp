const btn = document.querySelector(".myBtn");
const input = document.querySelector(".myInput");
const result = document.querySelector(".myResult");

async function showMeme() {
  showContainer();
  try {
    let number = Number(input.value);

    if (input.value === "" || isNaN(number) || number < 0 || number > 99) {
      result.innerHTML = `
            <h2 class="text-center text-light">Enter a valid number</h2>
      `;
    } else {
      let res = await fetch("https://api.imgflip.com/get_memes");
      let dataMemes = await res.json();

      let meme = dataMemes.data.memes.find((item, index) => index === number);

      if (!meme) {
        result.innerHTML = `
          <h2 class="text-center text-light">product not found</h2>
    `;
      } else {
        result.innerHTML = `
          <h2 class="text-center text-warning">${meme.name}</h2>
          <img src="${meme.url}" alt="" class="w-100" />
    `;

        input.value = "";
      }
    }
  } catch (err) {
    result.innerHTML = `
          <h2 class="text-center text-light">Something went wrong</h2>
    `;
    console.log(err);
  }
}

function showContainer() {
  result.classList.remove("d-none");
}

btn.addEventListener("click", showMeme);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    showMeme();
  }
});
