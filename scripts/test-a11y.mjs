import { JSDOM } from "jsdom";
import axe from "axe-core";

async function runLocalAudit() {
  console.log("🔍 Menjalankan audit aksesibilitas (Axe-Core)...");
  try {
    const res = await fetch("http://localhost:3000");
    if (!res.ok) {
      throw new Error(`Server localhost:3000 merespons dengan status ${res.status}`);
    }
    const html = await res.text();
    const dom = new JSDOM(html, { runScripts: "outside-only" });
    const results = await axe.run(dom.window.document.documentElement);

    console.log("\n==========================================");
    console.log(`📊 Hasil Audit Aksesibilitas (WCAG 2.1 AA)`);
    console.log(`   - Aturan Terpenuhi (Passes): ${results.passes.length}`);
    console.log(`   - Pelanggaran (Violations): ${results.violations.length}`);
    console.log("==========================================");

    if (results.violations.length > 0) {
      console.log("\n❌ Ditemukan Pelanggaran:");
      results.violations.forEach((v, idx) => {
        console.log(`\n[${idx + 1}] [${v.impact?.toUpperCase()}] ${v.id}: ${v.help}`);
        v.nodes.forEach((node, nIdx) => {
          console.log(`    Node ${nIdx + 1}: ${node.target.join(" ")}`);
          console.log(`    HTML: ${node.html}`);
        });
      });
      process.exit(1);
    } else {
      console.log("\n🎉 SEMPURNA! 0 Pelanggaran Aksesibilitas (100% Pass)!");
      process.exit(0);
    }
  } catch (err) {
    console.error("❌ Gagal menjalankan audit:", err.message);
    console.log("💡 Pastikan dev server berjalan di http://localhost:3000 (npm run dev)");
    process.exit(1);
  }
}

runLocalAudit();
