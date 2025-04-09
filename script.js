// URL الخاص بالرابط الذي حصلت عليه من Google Apps Script
const apiUrl = "https://script.google.com/macros/s/AKfycbzX_76VX5pBCVLr_FDLwJyNI30r_515GWGPkCs5buN9Do4c2DlWWoJx80HqMdFssXVR/exec";

// دالة لجلب البيانات وعرضها
const loaderContainer = document.querySelector('.loading-container');
const glossaryContainer = document.getElementById('glossary-container');

async function fetchGlossaryData() {
  loaderContainer.style.display = 'flex';
  glossaryContainer.innerHTML = '';

  try {
    // جلب البيانات من الرابط
    const response = await fetch(apiUrl);
    const data = await response.json();

    // عرض المصطلحات
    renderGlossaryData(data);

  } catch (error) {
    console.error("Error fetching glossary data:", error);
    glossaryContainer.innerHTML = "<p>Failed to load terms. Please try again later.</p>";
  } finally {
    loaderContainer.style.display = 'none';
  }
}


// دالة لعرض المصطلحات
function renderGlossaryData(data) {
  const container = document.getElementById("glossary-container");
  container.innerHTML = "";

  data.forEach(item => {
    if (item["Term(en)"] && item["Term(ar)"]) {
      // إنشاء عنصر جديد لكل مصطلح
      const termElement = document.createElement("div");
      termElement.classList.add("glossary-item");

      // إضافة محتوى المصطلح
      termElement.innerHTML = `
        <div class="term-row">
          <h3>${item["Term(en)"]}</h3>
          <p class="translation">${item["Term(ar)"]}</p>
        </div>
        <div class="details">
          <p><strong>Listen:</strong> <a href="https://forvo.com/word/${encodeURIComponent(item["Term(en)"])}/" target="_blank">${item.Listen}</a></p>
          <p><strong>Type:</strong> ${item.Type}</p>
          <p><strong>Note:</strong> ${item.Note || "No note available"}</p>
          <p><strong>Auto:</strong> ${item.Auto}</p>
        </div>
      `;

      termElement.addEventListener('click', () => {
        termElement.classList.toggle('expanded');
      });

      // إضافة المصطلح إلى الحاوية الرئيسية
      container.appendChild(termElement);
    }
  });
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", fetchGlossaryData);
