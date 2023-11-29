import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);
const galleryList = document.querySelector(".gallery");
const galleryMarkup = createGalleryItems(galleryItems);
galleryList.insertAdjacentHTML("beforeend", galleryMarkup);
galleryList.addEventListener("click", onImgClick);
function createGalleryItems(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>`;
    })
    .join("");
}

let instance;

function onImgClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;
  const dataSet = event.target.dataset.source;
  console.log(dataSet);
  instance = basicLightbox.create(
    `<img width="1200" height="800" src="${dataSet}">`,
    {
      onShow: () => {
        window.addEventListener("keydown", onEscapeClick);
      },
      onClose: () => {
        window.removeEventListener("keydown", onEscapeClick);
      },
    }
  );
  instance.show();
}

function onEscapeClick(event) {
  if (event.code !== "Escape") return;
  instance.close();
}
