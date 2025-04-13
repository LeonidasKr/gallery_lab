document.addEventListener("DOMContentLoaded", () => {
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const imageList = document.getElementById("imageList");
  const loader = document.getElementById("loader");

  loadMoreBtn.addEventListener("click", () => {
    loader.hidden = false;
    fetch("data/images.json")
      .then(response => response.json())
      .then(images => {
        images.forEach(image => {
          const li = document.createElement("li");
          li.className = "image-item";

          const figure = document.createElement("figure");
          const img = document.createElement("img");
          const caption = document.createElement("figcaption");

          img.src = image.src;
          img.alt = image.alt;
          img.loading = "lazy";

          caption.textContent = image.caption;

          figure.appendChild(img);
          figure.appendChild(caption);
          li.appendChild(figure);
          imageList.appendChild(li);
        });
      })
      .catch(error => {
        console.error("Ошибка загрузки:", error);
        alert("Не удалось загрузить изображения.");
      })
      .finally(() => {
        loader.hidden = true;
      });
  });
});
