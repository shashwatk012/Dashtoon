const comicfacts = [
  "Stan Lee planned on quitting the comic book industry until his wife Joan told him to write the type of characters he wanted to for his last project. The result was the Fantastic Four, which created a more humanly flawed type of superhero.",
  "When Patrick Stewart first saw an X-Men comic he asked, “What am I doing on the front of a comic book?”",
  " John Constantine is one of the only comic book characters to age in real time with his publication.",
  "7 years before the Philosopher’s stone, Neil Gaiman published a comic book about an English boy who finds out he’s a wizard on his 12th birthday and receives an owl from a magical stranger. ",
  "Marvel published a Generic Comic Book, in order to trademark the names “Super-Hero” and “Super-Villain”.",
  "Deadpool has a medium awareness which means he is aware that he is a fictional character in a comic book, and is thought to be due to his mental state. ",
  "Futurama Comics have been released bi-monthly since 2000, and had and continues to keep the series alive after both of the show’s cancellations. ",
  "The famous rock opening scene from Raiders of the Lost Ark was lifted from a 1954 Scrooge McDuck comic book.",
  "Stanley Lieber used the pseudonym, Stan Lee because he was afraid that associating his legal name with comic books would harm his writing career. ",
];

const row = document.querySelector(".row");
const image_container = document.querySelector("#image-container");
const err = document.querySelector(".h2");
const wait = document.querySelector(".h3");
const comfacts = document.querySelector(".facts");
let flag = 0;

setInterval(() => {
  const facts = comicfacts[Math.floor(Math.random() * 9)];
  comfacts.innerHTML = facts;
}, 10000);

for (let i = 0; i < 10; i++) {
  const divElement1 = document.createElement("div");
  divElement1.className = "panel";
  // divElement1.style.backgroundColor = "green";
  const text = document.createElement("h6");
  text.className = "text bottom-right";
  text.innerText = `Panel${i + 1}`;
  divElement1.append(text);

  // const imageElement = document.createElement("img");
  // imageElement.className = "image_element";
  // imageElement.src =
  //   "https://upload.wikimedia.org/wikipedia/commons/a/a4/JavaScript_code.png";
  // divElement1.append(imageElement);
  image_container.append(divElement1);
}

let html = "";
for (let i = 0; i < 10; i++) {
  html += `<div class="col">
  <label class="label" for="f_name">Enter prompt for panel ${i + 1}:</label>
  <textarea class="form-control" rows="2" cols="30" id="f_name" name="f_name"></textarea>
  <textarea id="comictext" name="comictext" rows="2" cols="30" placeholder="Text to be displayed..."></textarea>
  <div class="loading"><button id="butt" class="btn${i}" type="button" onclick="generatecomic(event,this)">Generate</button>
  <div class="loader individualloader"></div></div>
</div>`;
}
row.innerHTML = html;

const generatecomic = async (event, obj) => {
  flag++;
  console.log(flag);
  event.preventDefault();
  const data = document.querySelectorAll(".form-control");
  const panel = document.querySelectorAll(".panel");
  const comictext = document.querySelectorAll("#comictext");
  const allloaders = document.querySelectorAll(".individualloader");

  const res = obj.className;
  const idx = res[res.length - 1];

  const element = data[idx];
  const text = comictext[idx];
  console.log(text.value);

  if (element.value !== "") {
    err.style.display = "none";
    let val = element.value;
    let textar = text.value;

    wait.style.display = "block";
    allloaders[idx].style.display = "block";

    const response = await query({ inputs: val });

    const imageUrl = URL.createObjectURL(response);
    const imageElement = document.createElement("img");
    imageElement.className = "image_element";
    imageElement.src = imageUrl;
    console.log(imageUrl);

    panel[idx].innerHTML = "";
    const txt = document.createElement("h6");
    txt.className = "text bottom-right";
    txt.innerText = textar;
    panel[idx].append(txt);
    panel[idx].append(imageElement);
    flag--;
    allloaders[idx].style.display = "none";
    if (flag === 0) {
      wait.style.display = "none";
    }
  } else {
    err.style.display = "block";
  }
};

async function query(data) {
  try {
    const response = await fetch(
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
      {
        headers: {
          Accept: "image/png",
          Authorization:
            "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  } catch (error) {
    const wait = document.querySelector(".h3");
    wait.style.display = "none";
    alert(error);
  }
}

$(document).ready(function () {
  $("#btn-Preview-Image").on("click", function () {
    let element = document.querySelectorAll(".image_element"); // global variable

    console.log(element);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    function loadImages(sources, callback) {
      var images = {};
      var loadedImages = 0;
      var numImages = 0;
      for (var src in sources) {
        numImages++;
      }
      for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
          if (++loadedImages >= numImages) {
            callback(images);
          }
        };

        images[src].setAttribute("crossorigin", "anonymous"); // works for me
        images[src].src = sources[src];
      }
    }

    let sources = {};
    for (let i = 0; i < element.length; i++) {
      let ele = element[i];
      sources["image" + i] = ele.src;
    }

    loadImages(sources, function (images) {
      console.log(images);
      let pageWidth = window.screen.width;
      let r = 5;
      let d = 2 + 2 * r;
      let x = pageWidth / d;
      let y = 10;
      ii = 0;

      for (let i = 0; i < element.length; i++) {
        ctx.drawImage(
          images["image" + i],
          x,
          y,
          (r * pageWidth) / d,
          (r * pageWidth) / d
        );
        if (i % 2 == 0) {
          x += (r * pageWidth) / d + 5;
        } else {
          x = pageWidth / d;
          y += (r * pageWidth) / d + 5;
        }
      }
    });
  });

  $("#btn-Convert-Html2Image").on("click", function () {
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = document.getElementById("canvas").toDataURL();
    link.click();
  });
});
