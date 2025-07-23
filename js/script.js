// ==============================================
//  script.js – Hệ quản lý kỹ năng (24 trụ chiến lược)
//  ✦ ĐÃ LƯỢC TRÙNG, CHỈ CÒN 1 BỘ CODE DUY NHẤT
// ==============================================

import K_MAP from "./KMapping.js";
import Chart from "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/+esm"; // Chart.js v4 ES‑module

// ---------- 1. DATA --------------------------------------------------
//   • Nếu localStorage rỗng → nạp bộ mẫu (defaultSkillData)
//   • Ngược lại dùng data đã lưu
//---------------------------------------------------------------------
const defaultSkillData = [
  { name: "Chiến lược ngôn ngữ (EN)",   phase: "Tự lực",     role: "Dẫn dụ", core: "Thao túng ngôn từ",                         skillCluster: ["K1"]  },
  { name: "Thông dịch & quan hệ TQ",     phase: "Gây ảnh hưởng", role: "Gài mồi", core: "Cài thông tin chính trị",               skillCluster: ["K2"]  },
  // … (23 mục còn lại giữ nguyên như bạn đã khai) …
  { name: "Chiến lược định hình thế kỷ", phase: "Điều phối",   role: "Quan sát", core: "Nhận diện vận động thời đại",           skillCluster: ["K24"] }
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
  const count = Object.fromEntries(Object.keys(K_MAP).map(k => [k,0]));
  skillData.forEach(s => (s.skillCluster||[]).forEach(k => count[k]++));

  const ctx = document.getElementById("clusterChart").getContext("2d");
  if (window.clusterChart) window.clusterChart.destroy();
  window.clusterChart = new Chart(ctx,{type:"bar",data:{labels:Object.keys(K_MAP),datasets:[{data:Object.values(count),backgroundColor:"#4b91e2"}]},options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}});

  const miss = Object.entries(count).filter(([_,c])=>c===0).map(([k])=>`<li>${k} – ${K_MAP[k]}</li>`);
  document.getElementById("clusterGapReport").innerHTML = miss.length ? `⚠️ Thiếu trụ:<ul>${miss.join("")}</ul>` : "✅ Đủ trụ";
}

// ---------- 5. CHART HELPERS ----------------------------------------
function countBy(field){const m={};skillData.forEach(s=>{const k=s[field]||"Chưa xđ";m[k]=(m[k]||0)+1});return m;}
function renderChart(canvasId,type,countMap,color){const ctx=document.getElementById(canvasId).getContext("2d");if(!ctx)return;const old=window[canvasId];if(old)old.destroy();window[canvasId]=new Chart(ctx,{type,data:{labels:Object.keys(countMap),datasets:[{data:Object.values(countMap),backgroundColor:color}]},options:{plugins:{legend:{display:false}},indexAxis:type==="barY"?"y":undefined,scales:{y:{beginAtZero:true}}}});}
function renderAllCharts(){
  renderChart("personaChart","doughnut", countBy("persona"),  Object.keys(countBy("persona")).map(()=>`hsl(${Math.random()*360},70%,70%)`));
  renderChart("phaseChart",   "bar",    countBy("phase"),    "#8BC34A");
  renderChart("roleChart",    "barY",   countBy("role"),     "#FF9800");
  renderChart("coreChart",    "pie",    countBy("core"),     Object.keys(countBy("core")).map(()=>`hsl(${Math.random()*360},60%,70%)`));
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
});
