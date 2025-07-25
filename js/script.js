// ==============================================
//  script.js – Hệ quản lý kỹ năng (24 trụ chiến lược)
//  ✦ ĐÃ LƯỢC TRÙNG, CHỈ CÒN 1 BỘ CODE DUY NHẤT
// ==============================================

import K_MAP from "./KMapping.js";

// ---------- 1. DATA --------------------------------------------------
//   • Nếu localStorage rỗng → nạp bộ mẫu (defaultSkillData)
//   • Ngược lại dùng data đã lưu
//---------------------------------------------------------------------
const defaultSkillData = [
  { name: "Chiến lược ngôn ngữ (EN)", phase: "Tự lực", role: "Dẫn dụ", core: "Thao túng ngôn từ để chiếm quyền lực giao tiếp chiến lược", skillCluster: ["K1"] },
  { name: "Thông dịch & quan hệ TQ", phase: "Gây ảnh hưởng", role: "Gài mồi", core: "Cài thông tin chính trị – thương mại qua ngôn ngữ mềm", skillCluster: ["K2"] },
  { name: "Định vị kinh tế vĩ mô", phase: "Gây ảnh hưởng", role: "Quan sát", core: "Đọc được dòng tiền – dự đoán vận động quốc gia", skillCluster: ["K3"] },
  { name: "Tự chủ tài chính cá nhân", phase: "Tự lực", role: "Phản chiếu", core: "Nhận diện sai lầm tài chính – điều chỉnh dòng tiền sống", skillCluster: ["K4"] },
  { name: "Tự vệ pháp lý & phản đòn", phase: "Tự lực", role: "Kết liễu", core: "Kích hoạt cơ chế bảo vệ và tấn công đúng luật chơi", skillCluster: ["K5"] },
  { name: "Chiến lược sản phẩm & thị trường", phase: "Gây ảnh hưởng", role: "Dẫn dụ", core: "Thiết kế hệ giá trị hút khách & chốt sale bằng insight", skillCluster: ["K6"] },
  { name: "Đọc – điều phối tâm lý người", phase: "Gây ảnh hưởng", role: "Gài mồi", core: "Dò tâm trạng – cấy phản ứng – điều phối hành vi vi mô", skillCluster: ["K7"] },
  { name: "Tự động hóa – sao lưu bản thể", phase: "Tự lực", role: "Ẩn thân", core: "Dựng hệ phản xạ kỹ thuật số để tồn tại không cần xuất hiện", skillCluster: ["K8"] },
  { name: "Hồi phục sinh học – dưỡng thân", phase: "Tự lực", role: "Phản chiếu", core: "Theo dõi chu kỳ – tự điều chỉnh trước khi gãy trục sinh học", skillCluster: ["K9"] },
  { name: "Định hình logic sống – phản tư", phase: "Tự lực", role: "Quan sát", core: "Xoay lại trục sống bằng phản tư – tránh lệch hệ", skillCluster: ["K10"] },
  { name: "Giải mã quyền lực & bối cảnh", phase: "Gây ảnh hưởng", role: "Phản chiếu", core: "Thấy được trục vận hành hệ thống và vai trò bản thân", skillCluster: ["K11"] },
  { name: "Bảo vệ khí – xử lý nhiễu tầng", phase: "Điều phối", role: "Kết liễu", core: "Dứt điểm các nguồn rút khí – giữ sạch trường sống", skillCluster: ["K12"] },
  { name: "Sinh tồn & phản ứng khi bị cô lập", phase: "Tự lực", role: "Ẩn thân", core: "Giữ trụ bản thể trong môi trường không ai cứu viện", skillCluster: ["K13"] },
  { name: "Mỹ cảm chiến lược – tạo khí chất", phase: "Gây ảnh hưởng", role: "Dẫn dụ", core: "Kích hoạt trường khí quyến rũ bằng tầng thẩm mỹ sâu", skillCluster: ["K14"] },
  { name: "Ngôn từ sát thương cao", phase: "Gây ảnh hưởng", role: "Phản chiếu", core: "Phóng ra ngôn từ làm lệch trục người khác mà không động tay", skillCluster: ["K15"] },
  { name: "Biến trải nghiệm thành ảnh hưởng", phase: "Gây ảnh hưởng", role: "Gài mồi", core: "Gói trải nghiệm sống thành tài sản gây tín nhiệm tầng cao", skillCluster: ["K16"] },
  { name: "Điều chỉnh gene – phản xạ sinh học", phase: "Tự lực", role: "Quan sát", core: "Nhận diện lệch phản xạ – điều chỉnh lại phản ứng vật lý", skillCluster: ["K17"] },
  { name: "Tái lập hành vi – cắt chu kỳ tổn thương", phase: "Tự lực", role: "Kết liễu", core: "Phá bỏ phản xạ cũ – thiết lập cơ chế phản ứng mới", skillCluster: ["K18"] },
  { name: "Thiết kế hệ sống cá nhân", phase: "Điều phối", role: "Dẫn dụ", core: "Xây được mô hình sống – hệ thống vận hành mà không phải chạy tay", skillCluster: ["K19"] },
  { name: "Siêu học – Meta-learning", phase: "Tự lực", role: "Gài mồi", core: "Cấy mô hình học tự động – ghi nhớ & truy xuất không lệch tầng", skillCluster: ["K20"] },
  { name: "Chiến lược dữ liệu & phân tích", phase: "Gây ảnh hưởng", role: "Quan sát", core: "Ra quyết định từ dữ liệu – không dính nhiễu cảm xúc", skillCluster: ["K21"] },
  { name: "Kết nối chiến lược – không gồng", phase: "Gây ảnh hưởng", role: "Dẫn dụ", core: "Gặp người đúng tầng mà không cần tìm – tự tạo hấp dẫn tầng cao", skillCluster: ["K22"] },
  { name: "Điều phối cảm xúc bằng âm thanh", phase: "Điều phối", role: "Phản chiếu", core: "Chuyển hóa cảm xúc và luân xa thành vũ khí điều hướng tình huống", skillCluster: ["K23"] },
  { name: "Chiến lược định hình thế kỷ", phase: "Điều phối", role: "Quan sát", core: "Nhận diện vận động thời đại – can thiệp đúng chu kỳ chuyển hóa", skillCluster: ["K24"] }
];


let skillData  = JSON.parse(localStorage.getItem("skillData"))  || defaultSkillData;
let auditData  = JSON.parse(localStorage.getItem("auditData"))  || {};

function saveSkills()   { localStorage.setItem("skillData",  JSON.stringify(skillData));  }
function saveAudits()   { localStorage.setItem("auditData",  JSON.stringify(auditData));  }

// ---------- 2. RENDER SKILL CARD ------------------------------------
function renderSkills(data = skillData) {
  const box = document.getElementById("skillCardsContainer");
  box.innerHTML = "";
  data.forEach((s, i) => {
    const card = document.createElement("div");
    card.className = "skill-card";

    const badges = (s.skillCluster || []).map(k => `<span class="badge" title="${K_MAP[k]}">${k}</span>`).join(" ");

    card.innerHTML = `
      <h3>🛠️ ${s.name}</h3>
      <div class="skill-section"><strong>Phase:</strong> ${s.phase} | <strong>Role:</strong> ${s.role} | <strong>Core:</strong> ${s.core}</div>
      <div class="badges">${badges}</div>
      <button class="del" onclick="deleteSkill(${i})">🗑️ Xoá</button>`;
    box.appendChild(card);
  });
}
function deleteSkill(i) {
  if (!confirm("Xoá kỹ năng?")) return;
  skillData.splice(i, 1);
  saveSkills();
  renderSkills();
  buildClusterDashboard();
  renderAllCharts();
}

// ---------- 3. FILTER & SELECT CLUSTER ------------------------------
function populateClusterSelect() {
  const sel = document.getElementById("skillCluster"); if (!sel) return;
  for (const k in K_MAP) sel.add(new Option(`${k} – ${K_MAP[k]}`, k));
}
function populateClusterFilter() {
  const sel = document.getElementById("clusterFilter"); if (!sel) return;
  for (const k in K_MAP) sel.add(new Option(`${k} – ${K_MAP[k]}`, k));
  sel.onchange = () => {
    sel.value ? renderSkills(skillData.filter(s => (s.skillCluster||[]).includes(sel.value)))
              : renderSkills();
  };
}

// ---------- 4. DASHBOARD TRỤ K --------------------------------------
function buildClusterDashboard() {
  const count = Object.fromEntries(Object.keys(K_MAP).map(k => [k, 0]));

  skillData.forEach(s =>
    (s.skillCluster || []).forEach(k => count[k]++)
  );

  const ctx = document.getElementById("clusterChart").getContext("2d");

  // FIX LỖI: kiểm tra tồn tại và có phương thức destroy không
  if (window.clusterChart && typeof window.clusterChart.destroy === "function") {
    window.clusterChart.destroy();
  }

  window.clusterChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(K_MAP),
      datasets: [{
        data: Object.values(count),
        backgroundColor: "#64b5f6"
      }]
    }
  });

  const miss = Object.entries(count)
    .filter(([_, c]) => c === 0)
    .map(([k]) => `<li>${k} – ${K_MAP[k]}</li>`);

  document.getElementById("clusterGapReport").innerHTML =
    miss.length
      ? `⚠️ Thiếu trụ:<ul>${miss.join("")}</ul>`
      : `✅ Đủ trụ`;
}


// ---------- 5. CHART HELPERS ----------------------------------------
function countBy(field){const m={};skillData.forEach(s=>{const k=s[field]||"Chưa xđ";m[k]=(m[k]||0)+1});return m;}
function renderChart(canvasId, type, countMap, color) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  let old = window[canvasId];
  if (old && typeof old.destroy === 'function') {
    old.destroy();
  }

  window[canvasId] = new Chart(ctx, {
    type,
    data: {
      labels: Object.keys(countMap),
      datasets: [{
        data: Object.values(countMap),
        backgroundColor: color
      }]
    },
    options: {
      plugins: {
        legend: { display: false }
      },
      indexAxis: type === "bar" ? "y" : undefined,

      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

function renderAllCharts() {
  renderChart("personaChart", "doughnut", countBy("persona"),
    Object.keys(countBy("persona")).map(() => `hsl(${Math.random() * 360}, 70%, 70%)`)
  );
  renderChart("phaseChart", "bar", countBy("phase"), "#88C34A");
  renderChart("roleChart", "bar", countBy("role"), "#FF9800");
  renderChart("coreChart", "pie", countBy("core"),
    Object.keys(countBy("core")).map(() => `hsl(${Math.random() * 360}, 60%, 70%)`)
  );
}

function renderClusterCheckboxes() {
  const box = document.getElementById("clusterCheckboxes");
  if (!box) return;
  box.innerHTML = "<strong>Trụ kỹ năng:</strong><br>";
  for (const k in K_MAP) {
    const id = `clust-${k}`;
    box.innerHTML += `<label><input type="checkbox" id="${id}" value="${k}"> ${k}</label> `;
  }
}

function renderLessonGrid() {
  const grid = document.getElementById("lessonGrid");
  if (!grid) return;
  grid.innerHTML = "";
  for (const k in K_MAP) {
    const a = document.createElement("a");
    a.href = `lessons/${k}.html`;
    a.target = "_blank";
    a.className = "lesson-box";
    a.textContent = `${k} – ${K_MAP[k]}`;
    grid.appendChild(a);
  }
}

function renderLessonGrid() {
  const grid = document.getElementById("lessonGrid");
  if (!grid) return;
  grid.innerHTML = "";
  for (const k in K_MAP) {
    const a = document.createElement("a");
    a.href = `lessons/${k}.html`;
    a.target = "_blank";
    a.className = "lesson-box";
    a.textContent = `${k} – ${K_MAP[k]}`;
    grid.appendChild(a);
  }
}

function addSkill() {
  const name  = document.getElementById("skillName").value.trim();
  const phase = document.getElementById("phaseSelect").value;
  const role  = document.getElementById("roleSelect").value;
  const core  = document.getElementById("coreInput").value.trim();
  const clusterEls = document.querySelectorAll("#clusterCheckboxes input:checked");
  const clusters = Array.from(clusterEls).map(e => e.value);

  if (!name || !phase || !role || !core)
    return alert("Điền đầy đủ thông tin.");

  skillData.push({ name, phase, role, core, skillCluster: clusters });
  saveSkills();
  renderSkills();
  buildClusterDashboard();
  renderAllCharts();
  alert("✔️ Đã thêm kỹ năng.");
}


// ---------- 6. EXPORT CSV -------------------------------------------
function exportSkillsToCSV(){if(!skillData.length)return alert("Không có dữ liệu");const head=["Name","Phase","Role","Core","Clusters"];const rows=skillData.map(s=>[s.name,s.phase,s.role,s.core,(s.skillCluster||[]).join(";")]);const csv=[head,...rows].map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");const url=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));const a=document.createElement("a");a.href=url;a.download="skills.csv";a.click();URL.revokeObjectURL(url);}  

// ---------- 7. INIT --------------------------------------------------
document.addEventListener("DOMContentLoaded",()=>{
  renderSkills();
  buildClusterDashboard();
  renderAllCharts();
  populateClusterSelect();
  populateClusterFilter();
  populateAdvancedFilters();
  renderClusterCheckboxes();
  renderLessonGrid();
});

function populateAdvancedFilters() {
  const pSel = document.getElementById("filterPhase");
  const rSel = document.getElementById("filterRole");
  const cSel = document.getElementById("filterCore");
  const kSel = document.getElementById("filterCluster");

  const unique = (field) => [...new Set(skillData.map(s => s[field]))].sort();

  if (pSel) unique("phase").forEach(v => pSel.add(new Option(v, v)));
  if (rSel) unique("role").forEach(v => rSel.add(new Option(v, v)));
  if (cSel) unique("core").forEach(v => cSel.add(new Option(v, v)));
  if (kSel) for (const k in K_MAP) kSel.add(new Option(`${k} – ${K_MAP[k]}`, k));

  [pSel, rSel, cSel, kSel].forEach(sel => sel && sel.addEventListener("change", applyAdvancedFilters));
}

function applyAdvancedFilters() {
  const phase = document.getElementById("filterPhase").value;
  const role = document.getElementById("filterRole").value;
  const core = document.getElementById("filterCore").value;
  const cluster = document.getElementById("filterCluster").value;

  const filtered = skillData.filter(s =>
    (!phase   || s.phase === phase) &&
    (!role    || s.role  === role) &&
    (!core    || s.core  === core) &&
    (!cluster || (s.skillCluster || []).includes(cluster))
  );

  renderSkills(filtered);
}

function clearAllFilters() {
  ["filterPhase", "filterRole", "filterCore", "filterCluster"]
    .forEach(id => document.getElementById(id).value = "");
  renderSkills();
}

function importCSV() {
  const input = document.getElementById("importCSV");
  const file = input.files[0];
  if (!file) return alert("Chọn một file CSV trước.");

  const reader = new FileReader();
  reader.onload = function(e) {
    const lines = e.target.result.split("\n").map(l => l.trim()).filter(Boolean);
    const headers = lines[0].replace(/"/g, '').split(",");
    const newSkills = [];

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
      if (!row || row.length < 5) continue;
      const [name, phase, role, core, clusters] = row.map(cell => cell.replace(/(^"|"$)/g, ""));
      newSkills.push({
        name, phase, role, core,
        skillCluster: clusters.split(";").map(k => k.trim()).filter(Boolean)
      });
    }

    if (!confirm(`⚠️ Ghi đè toàn bộ ${skillData.length} kỹ năng hiện tại?`)) return;

    skillData = newSkills;
    saveSkills();
    renderSkills();
    buildClusterDashboard();
    renderAllCharts();
    populateAdvancedFilters();
    alert("✔️ Đã nhập dữ liệu từ CSV.");
  };

  reader.readAsText(file);
}

document.getElementById("personaSelector").addEventListener("change", function () {
  const selectedPersona = this.value;
  const container = document.getElementById("personaSkillCards");
  container.innerHTML = "";

  if (!selectedPersona) return;

  const matchedSkills = skills.filter(skill =>
    skill.personaMain === selectedPersona || skill.personaSupport === selectedPersona
  );

  if (matchedSkills.length === 0) {
    container.innerHTML = `<p>Không tìm thấy kỹ năng cho persona này.</p>`;
    return;
  }

  matchedSkills.forEach(skill => {
    const flowSteps = (skill.flow || []).map((f, i) => `<li><strong>B${i + 1}:</strong> ${f}</li>`).join("");
    const div = document.createElement("div");
    div.className = "skill-card";
    div.innerHTML = `
      <h3>🎯 ${skill.name}</h3>
      <p><strong>Flow:</strong></p>
      <ul>${flowSteps}</ul>
      <p><strong>Chiến thuật:</strong> ${skill.core || "Không có ghi chú chiến lược."}</p>
    `;
    container.appendChild(div);
  });
});

const select = document.getElementById('personaSelector'); // đúng id bạn đang dùng

if (select) {
  // Render danh sách
  Object.keys(personaData).forEach(p => {
    const option = document.createElement('option');
    option.value = p;
    option.textContent = p;
    select.appendChild(option);
  });

  // Gắn event
  select.addEventListener('change', () => {
    const persona = personaData[select.value];
    if (!persona) return;

    // 👉 Thay vì console.log, render ra UI
    console.log("Survival:", persona.survival.trigger, persona.survival.flow);
    console.log("Coordination:", persona.coordination.flow);
    console.log("Strategic:", persona.strategic.flow);
  });
}

