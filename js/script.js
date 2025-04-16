// Scroll to top button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  const btn = document.getElementById("topBtn");
  if (document.body.scrollTop > 4 || document.documentElement.scrollTop > 4) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
}

function goToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// AJAX photo upload
document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch("php/upload.php", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const section = document.getElementById(`${data.category}-section`);
        const link = document.createElement("a");
        link.href = data.imageUrl;

        const img = document.createElement("img");
        img.src = data.imageUrl;
        img.alt = "Uploaded";

        link.appendChild(img);
        section.appendChild(link);
      } else {
        alert("Upload failed");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
});

// Модальное окно для изображений
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

// Показываем модалку при клике на изображение
document.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG" && e.target.closest(".container")) {
    e.preventDefault();
    modal.style.display = "block";
    modalImg.src = e.target.src;
  }
});

// Закрытие по нажатию на крестик
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Закрытие по клику вне картинки
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
