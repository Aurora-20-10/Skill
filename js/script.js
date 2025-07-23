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
  populateClusterSelect();
  populateClusterFilter();
});
