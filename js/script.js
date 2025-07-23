// script.js – logic chính cho hệ quản lý kỹ năng (đã tích hợp 24 trụ chiến lược)

import K_MAP from './KMapping.js';

// === DỮ LIỆU CƠ BẢN ===
const skillData = [
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

let auditData = JSON.parse(localStorage.getItem("auditData")) || {};

// ... (các hàm render, delete, audit, v.v. không thay đổi) ...


let auditData = JSON.parse(localStorage.getItem("auditData")) || {};

function saveSkills() {
  localStorage.setItem("skillData", JSON.stringify(skillData));
}

// === RENDER SKILL CARD ===
function renderSkills(data = skillData) {
  const container = document.getElementById("skillCardsContainer");
  container.innerHTML = "";
  data.forEach((skill, index) => {
    const card = document.createElement("div");
    card.className = "skill-card";

    const clusterBadges = (skill.skillCluster || []).map(k => {
      const span = document.createElement("span");
      span.className = "badge";
      span.textContent = k;
      span.title = K_MAP[k] || "";
      return span.outerHTML;
    }).join(" ");

    card.innerHTML = `
      <h3>🛠️ ${skill.name}</h3>
      <div class="skill-section"><strong>Loại:</strong> ${skill.type} | <strong>Level:</strong> ${skill.level}/5 | <strong>Tiến độ:</strong> ${skill.progress}%</div>
      <div class="skill-section"><strong>Persona:</strong> ${skill.persona} | <strong>Phase:</strong> ${skill.strategicPhase} | <strong>Core:</strong> ${skill.coreAbility}</div>
      <div class="skill-section"><strong>Đối tượng:</strong> ${skill.targetEntity} | <strong>Trường hệ:</strong> ${skill.affectedSystem} | <strong>Vận mệnh:</strong> ${skill.linkedGoal}</div>
      <div class="skill-section"><strong>Chiến trường:</strong> ${skill.context} | <strong>Vai trò:</strong> ${skill.weaponRole} | <strong>Kích hoạt:</strong> ${skill.activationMode}</div>
      <div class="skill-section"><strong>Năng lượng:</strong> ${skill.energyImpact} | <strong>Nhịp luyện:</strong> ${skill.expectedRhythm}</div>
      <div class="badges">${clusterBadges}</div>
      <details class="skill-details">
        <summary>📂 Chi tiết thêm</summary>
        <p><strong>Mô tả:</strong> ${skill.description}</p>
        <p><strong>Ghi chú chiến lược:</strong> ${skill.strategyNote}</p>
        <p><strong>Ghi chú cá nhân:</strong> ${skill.personalNote}</p>
      </details>
      <div class="skill-actions">
        <button onclick="deleteSkill(${index})">🗑 Xoá</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function deleteSkill(index) {
  if (confirm("Xoá kỹ năng này?")) {
    skillData.splice(index, 1);
    saveSkills();
    renderSkills();
  }
}

function openSkillForm() {
  alert("Form thêm kỹ năng sẽ được xây ở bước sau.");
}

// === AUDIT STATION ===
function saveAuditEntry() {
  const date = document.getElementById("auditDate").value;
  if (!date) return alert("Chọn ngày trước đã.");

  const entry = {
    bioStatus: document.getElementById("bioStatus").value,
    bioNote: document.getElementById("bioNote").value,
    persona: document.getElementById("personaSelect").value,
    personaShadow: document.getElementById("personaShadow").value,
    skillUsed: document.getElementById("skillUsed").value,
    strategyNote: document.getElementById("strategyNote").value,
    nextAction: document.getElementById("nextAction").value,
  };

  auditData[date] = entry;
  localStorage.setItem("auditData", JSON.stringify(auditData));
  alert("✔️ Đã lưu audit hôm nay.");
}

function loadAuditEntry() {
  const date = document.getElementById("auditDate").value;
  const entry = auditData[date];
  if (!entry) return;
  document.getElementById("bioStatus").value = entry.bioStatus || "";
  document.getElementById("bioNote").value = entry.bioNote || "";
  document.getElementById("personaSelect").value = entry.persona || "";
  document.getElementById("personaShadow").value = entry.personaShadow || "";
  document.getElementById("skillUsed").value = entry.skillUsed || "";
  document.getElementById("strategyNote").value = entry.strategyNote || "";
  document.getElementById("nextAction").value = entry.nextAction || "";
}

// === LỌC THEO TRỤ K ===
function populateClusterFilter() {
  const filterSelect = document.getElementById("clusterFilter");
  for (const k in K_MAP) {
    const option = document.createElement("option");
    option.value = k;
    option.textContent = `${k} – ${K_MAP[k]}`;
    filterSelect.appendChild(option);
  }
}

document.getElementById("clusterFilter").addEventListener("change", function () {
  const selected = this.value;
  if (selected) {
    const filtered = skillData.filter(skill => (skill.skillCluster || []).includes(selected));
    renderSkills(filtered);
  } else {
    renderSkills();
  }
});

// === TẠO SELECT CHỌN CLUSTER TRONG FORM ===
function populateClusterSelect() {
  const clusterSelect = document.getElementById("skillCluster");
  for (const k in K_MAP) {
    const option = document.createElement("option");
    option.value = k;
    option.textContent = `${k} – ${K_MAP[k]}`;
    clusterSelect.appendChild(option);
  }
}

// === KHỞI TẠO ===
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderPersonaChart();
  buildClusterDashboard();
  renderPhaseChart();       // ✅ THÊM DÒNG NÀY
  renderRoleChart();        // ✅ THÊM DÒNG NÀY
  renderCoreChart();        // ✅ THÊM DÒNG NÀY
  populateClusterSelect();
  populateClusterFilter();
});
// script.js – logic chính cho hệ quản lý kỹ năng (đã tích hợp 24 trụ chiến lược)

import K_MAP from './KMapping.js';

let skillData = JSON.parse(localStorage.getItem("skillData")) || [];
let auditData = JSON.parse(localStorage.getItem("auditData")) || {};

function saveSkills() {
  localStorage.setItem("skillData", JSON.stringify(skillData));
}

// === RENDER SKILL CARD ===
function renderSkills(data = skillData) {
  const container = document.getElementById("skillCardsContainer");
  container.innerHTML = "";
  data.forEach((skill, index) => {
    const card = document.createElement("div");
    card.className = "skill-card";

    const clusterBadges = (skill.skillCluster || []).map(k => {
      const span = document.createElement("span");
      span.className = "badge";
      span.textContent = k;
      span.title = K_MAP[k] || "";
      return span.outerHTML;
    }).join(" ");

    card.innerHTML = `
      <h3>🛠️ ${skill.name}</h3>
      <div class="skill-section"><strong>Loại:</strong> ${skill.type} | <strong>Level:</strong> ${skill.level}/5 | <strong>Tiến độ:</strong> ${skill.progress}%</div>
      <div class="skill-section"><strong>Persona:</strong> ${skill.persona} | <strong>Phase:</strong> ${skill.strategicPhase} | <strong>Core:</strong> ${skill.coreAbility}</div>
      <div class="skill-section"><strong>Đối tượng:</strong> ${skill.targetEntity} | <strong>Trường hệ:</strong> ${skill.affectedSystem} | <strong>Vận mệnh:</strong> ${skill.linkedGoal}</div>
      <div class="skill-section"><strong>Chiến trường:</strong> ${skill.context} | <strong>Vai trò:</strong> ${skill.weaponRole} | <strong>Kích hoạt:</strong> ${skill.activationMode}</div>
      <div class="skill-section"><strong>Năng lượng:</strong> ${skill.energyImpact} | <strong>Nhịp luyện:</strong> ${skill.expectedRhythm}</div>
      <div class="badges">${clusterBadges}</div>
      <details class="skill-details">
        <summary>📂 Chi tiết thêm</summary>
        <p><strong>Mô tả:</strong> ${skill.description}</p>
        <p><strong>Ghi chú chiến lược:</strong> ${skill.strategyNote}</p>
        <p><strong>Ghi chú cá nhân:</strong> ${skill.personalNote}</p>
      </details>
      <div class="skill-actions">
        <button onclick="deleteSkill(${index})">🗑 Xoá</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function deleteSkill(index) {
  if (confirm("Xoá kỹ năng này?")) {
    skillData.splice(index, 1);
    saveSkills();
    renderSkills();
  }
}

function openSkillForm() {
  alert("Form thêm kỹ năng sẽ được xây ở bước sau.");
}

// === AUDIT STATION ===
function saveAuditEntry() {
  const date = document.getElementById("auditDate").value;
  if (!date) return alert("Chọn ngày trước đã.");

  const entry = {
    bioStatus: document.getElementById("bioStatus").value,
    bioNote: document.getElementById("bioNote").value,
    persona: document.getElementById("personaSelect").value,
    personaShadow: document.getElementById("personaShadow").value,
    skillUsed: document.getElementById("skillUsed").value,
    strategyNote: document.getElementById("strategyNote").value,
    nextAction: document.getElementById("nextAction").value,
  };

  auditData[date] = entry;
  localStorage.setItem("auditData", JSON.stringify(auditData));
  alert("✔️ Đã lưu audit hôm nay.");
}

function loadAuditEntry() {
  const date = document.getElementById("auditDate").value;
  const entry = auditData[date];
  if (!entry) return;
  document.getElementById("bioStatus").value = entry.bioStatus || "";
  document.getElementById("bioNote").value = entry.bioNote || "";
  document.getElementById("personaSelect").value = entry.persona || "";
  document.getElementById("personaShadow").value = entry.personaShadow || "";
  document.getElementById("skillUsed").value = entry.skillUsed || "";
  document.getElementById("strategyNote").value = entry.strategyNote || "";
  document.getElementById("nextAction").value = entry.nextAction || "";
}

// === LỌC THEO TRỤ K ===
function populateClusterFilter() {
  const filterSelect = document.getElementById("clusterFilter");
  for (const k in K_MAP) {
    const option = document.createElement("option");
    option.value = k;
    option.textContent = `${k} – ${K_MAP[k]}`;
    filterSelect.appendChild(option);
  }
}

document.getElementById("clusterFilter").addEventListener("change", function () {
  const selected = this.value;
  if (selected) {
    const filtered = skillData.filter(skill => (skill.skillCluster || []).includes(selected));
    renderSkills(filtered);
  } else {
    renderSkills();
  }
});

// === TẠO SELECT CHỌN CLUSTER TRONG FORM ===
function populateClusterSelect() {
  const clusterSelect = document.getElementById("skillCluster");
  for (const k in K_MAP) {
    const option = document.createElement("option");
    option.value = k;
    option.textContent = `${k} – ${K_MAP[k]}`;
    clusterSelect.appendChild(option);
  }
}

// === KHỞI TẠO ===
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderPersonaChart();
  buildClusterDashboard();
  renderPhaseChart();       // ✅ THÊM DÒNG NÀY
  renderRoleChart();        // ✅ THÊM DÒNG NÀY
  renderCoreChart();        // ✅ THÊM DÒNG NÀY
  populateClusterSelect();
  populateClusterFilter();
});

function buildClusterDashboard() {
  const clusterCount = {};
  for (const k in K_MAP) clusterCount[k] = 0;

  skillData.forEach(skill => {
    (skill.skillCluster || []).forEach(k => {
      if (clusterCount[k] !== undefined) clusterCount[k]++;
    });
  });

  const ctx = document.getElementById("clusterChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(K_MAP),
      datasets: [{
        label: "Số lượng kỹ năng",
        data: Object.values(clusterCount),
        backgroundColor: "#4b91e2",
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => `${items[0].label} – ${K_MAP[items[0].label]}`,
          }
        }
      },
      scales: {
        x: { ticks: { autoSkip: false, maxRotation: 60, minRotation: 30 } },
        y: { beginAtZero: true }
      }
    }
  });

  const missing = Object.entries(clusterCount)
    .filter(([_, count]) => count === 0)
    .map(([k]) => `<li><strong>${k}</strong> – ${K_MAP[k]}</li>`);

  const report = missing.length > 0
    ? `<p><strong>⚠️ Các trụ chưa có kỹ năng:</strong></p><ul>${missing.join("")}</ul>`
    : `<p>✅ Tất cả trụ đều có ít nhất một kỹ năng.</p>`;

  document.getElementById("clusterGapReport").innerHTML = report;
}

function exportSkillsToCSV() {
  if (!skillData.length) return alert("Chưa có dữ liệu kỹ năng.");

  const headers = [
    "Tên kỹ năng", "Loại", "Level", "Tiến độ", "Persona", "Phase", "Core",
    "Đối tượng", "Trường hệ", "Vận mệnh", "Chiến trường", "Vai trò", "Kích hoạt",
    "Năng lượng", "Nhịp luyện", "Mô tả", "Ghi chú chiến lược", "Ghi chú cá nhân", "Trụ K"
  ];

  const rows = skillData.map(skill => [
    skill.name, skill.type, skill.level, skill.progress,
    skill.persona, skill.strategicPhase, skill.coreAbility,
    skill.targetEntity, skill.affectedSystem, skill.linkedGoal,
    skill.context, skill.weaponRole, skill.activationMode,
    skill.energyImpact, skill.expectedRhythm,
    skill.description, skill.strategyNote, skill.personalNote,
    (skill.skillCluster || []).join("; ")
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(val => `"${(val || "").toString().replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `skill_data_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function renderPersonaChart() {
  const ctx = document.getElementById("personaChart").getContext("2d");
  const counts = {};

  skillData.forEach(skill => {
    const key = skill.persona || "Không xác định";
    counts[key] = (counts[key] || 0) + 1;
  });

  const labels = Object.keys(counts);
  const data = Object.values(counts);

  if (window.personaChart) window.personaChart.destroy(); // reset nếu đã có chart
  window.personaChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        label: "Số lượng kỹ năng",
        data: data,
        backgroundColor: labels.map(() => `hsl(${Math.random()*360}, 70%, 70%)`)
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        }
      }
    }
  });
}

function renderPhaseChart() {
  const ctx = document.getElementById("phaseChart").getContext("2d");
  const counts = {};

  skillData.forEach(skill => {
    const key = skill.strategicPhase || "Không xác định";
    counts[key] = (counts[key] || 0) + 1;
  });

  if (window.phaseChart) window.phaseChart.destroy();
  window.phaseChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(counts),
      datasets: [{
        label: "Số lượng kỹ năng",
        data: Object.values(counts),
        backgroundColor: "#8BC34A"
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

function renderRoleChart() {
  const ctx = document.getElementById("roleChart").getContext("2d");
  const counts = {};

  skillData.forEach(skill => {
    const key = skill.weaponRole || "Không xác định";
    counts[key] = (counts[key] || 0) + 1;
  });

  if (window.roleChart) window.roleChart.destroy();
  window.roleChart = new Chart(ctx, {
    type: "horizontalBar", // nếu Chart.js 2.x
    data: {
      labels: Object.keys(counts),
      datasets: [{
        label: "Số lượng kỹ năng",
        data: Object.values(counts),
        backgroundColor: "#FF9800"
      }]
    },
    options: {
      indexAxis: 'y', // nếu Chart.js 3.x
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true } }
    }
  });
}

function renderCoreChart() {
  const ctx = document.getElementById("coreChart").getContext("2d");
  const counts = {};

  skillData.forEach(skill => {
    const key = skill.coreAbility || "Không xác định";
    counts[key] = (counts[key] || 0) + 1;
  });

  if (window.coreChart) window.coreChart.destroy();
  window.coreChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(counts),
      datasets: [{
        label: "Số lượng kỹ năng",
        data: Object.values(counts),
        backgroundColor: Object.keys(counts).map(() => `hsl(${Math.random()*360}, 60%, 70%)`)
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}
