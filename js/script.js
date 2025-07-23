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
  buildClusterDashboard();
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
