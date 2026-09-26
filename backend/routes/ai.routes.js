import express from 'express';

const router = express.Router();

// Knowledge base and calculation engine for Pandit Infra AI
const PANDIT_KNOWLEDGE = {
  company: "Pandit Infra & Construction Pvt. Ltd.",
  experience: "15+ Years of Heavy Civil Engineering & Infrastructure Excellence",
  locations: "Headquartered in Surat, Gujarat with projects across Maharashtra & Western India",
  services: [
    { name: "RCC Frame & High-Rise Structures", rate: "₹1,800 - ₹2,400 per sq. ft.", time: "12 - 24 months" },
    { name: "Bituminous & Concrete Road Paving", rate: "₹450 - ₹750 per sq. meter", time: "1 - 3 months per km" },
    { name: "RCC Box Culvert & Flood Drain Systems", rate: "₹18,000 - ₹35,000 per linear meter", time: "2 - 6 weeks per segment" },
    { name: "Deep Earth Foundation & Raft Footing", rate: "₹350 - ₹600 per cu. ft.", time: "2 - 8 weeks" },
    { name: "Industrial Warehouse & Steel PEB Structures", rate: "₹1,200 - ₹1,650 per sq. ft.", time: "4 - 8 months" }
  ]
};

// Comprehensive civil work process database
const CIVIL_WORK_PROCESSES = {
  excavation: {
    title: "🚜 Earthwork Excavation & Soil Stabilization Process",
    steps: [
      "1. **Site Clearing & Demolition**: Removal of vegetation, roots, and topsoil (150mm depth).",
      "2. **Centerline Marking**: Architectural layout marking using total station & lime powder lines.",
      "3. **Excavation Work**: Digging foundation trenches using JCB 3DX & Poclain excavators to specified invert level.",
      "4. **Anti-Termite Treatment**: Chemical spraying (Chlorpyrifos 20% EC) on excavated soil bed.",
      "5. **Compaction**: Plate compactor & roller leveling of trench base to achieved 95% MDD."
    ],
    rate: "₹18 - ₹35 per cubic feet (depending on soil/rock hardness)."
  },
  foundation: {
    title: "🏛️ Foundation & PCC/RCC Concreting Process",
    steps: [
      "1. **PCC Base Layer**: Laying 100mm M10 grade Plain Cement Concrete bed.",
      "2. **Shuttering / Formwork**: Waterproof plywood shuttering with oil coating.",
      "3. **Rebar Mat Steel Layout**: Binding TMT Fe-550D steel cage with cover blocks (50mm bottom cover).",
      "4. **RCC Concrete Pouring**: Pouring M25 / M30 Ready-Mix Concrete with needle vibrator compaction.",
      "5. **Curing Cycle**: Continuous water ponding curing for minimum 14 days."
    ],
    rate: "₹350 - ₹600 per cubic feet."
  },
  masonry: {
    title: "🧱 Brickwork & AAC Block Masonry Process",
    steps: [
      "1. **Wetting Blocks**: Soaking AAC blocks or red clay bricks in water prior to laying.",
      "2. **Mortar Preparation**: Cement-sand mortar mix (1:4 ratio for 4.5\" walls, 1:6 ratio for 9\" walls).",
      "3. **Course Laying**: Laying bricks with staggered vertical joints and 10mm mortar bed thickness.",
      "4. **RCC Coping Band**: Providing 75mm RCC tie band at lintel level for seismic stability.",
      "5. **Joint Raking & Curing**: Raking joints for plaster key and moist curing for 7 days."
    ],
    rate: "₹65 - ₹110 per sq. ft."
  },
  plastering: {
    title: "🛠️ Wall Cement Plastering Process",
    steps: [
      "1. **Surface Hacking & Washing**: Hacking RCC surfaces (300 dots/sqm) and washing dust.",
      "2. **Chicken Mesh Fixing**: Installing GI wire mesh over column-blockwork joints to prevent cracks.",
      "3. **Level Button Marking**: Fixing plaster pads (bull marks) for true plumb & alignment.",
      "4. **Plaster Application**: Applying 12mm internal smooth plaster (1:4 mix) or 20mm external sand-faced double coat plaster.",
      "5. **Curing**: Water spraying 3 times daily for 10 days."
    ],
    rate: "₹28 - ₹55 per sq. ft."
  },
  waterproofing: {
    title: "💧 Waterproofing System Process",
    steps: [
      "1. **Surface Cleaning & Chipping**: Removing loose concrete and chasing corners into V-grooves.",
      "2. **Primer Coat**: Applying elastomeric polymer coating / bitumen primer.",
      "3. **Membrane / Coating**: Laying 3mm APP torch-on membrane or 2 coats of two-component acrylic polymer coating.",
      "4. **Protective Screed Layer**: 50mm brickbat coba / PCC layer with slope towards drain spouts.",
      "5. **Ponding Test**: Filling 50mm water for 48 hours leakage check."
    ],
    rate: "₹45 - ₹95 per sq. ft."
  },
  flooring: {
    title: "📐 Flooring & Tiling Process",
    steps: [
      "1. **Base Preparation**: Leveling PCC base and clearing debris.",
      "2. **Bedding Layer**: 40mm thick cement-sand mortar bed (1:4 ratio).",
      "3. **Tile/Stone Laying**: Laying 800x800mm vitrified tiles or granite with tile adhesive & spacers.",
      "4. **Grouting & Cleaning**: Epoxy resin grouting in tile joints after 24 hours.",
      "5. **Polishing**: Diamond paper machine polishing for natural stone/granite."
    ],
    rate: "₹75 - ₹180 per sq. ft."
  },
  road: {
    title: "🛣️ Bituminous Asphalt & Concrete Road Process",
    steps: [
      "1. **Sub-Grade Preparation**: Excavation, grading, and 10-ton roller compaction (98% MDD).",
      "2. **GSB Layer**: 150mm Granular Sub-Base course spread and compacted.",
      "3. **WMM Base Course**: 150mm Wet Mix Macadam layer compacted with HAMM roller.",
      "4. **Prime & Tack Coat**: Spraying bitumen emulsion (SS-1 / RS-1 grade).",
      "5. **DBM & Asphalt BC Layer**: 50mm Dense Bituminous Macadam + 40mm Asphalt Concrete wearing course laid at 150°C."
    ],
    rate: "₹450 - ₹750 per sq. meter."
  },
  painting: {
    title: "🎨 Wall Painting & Coating Process",
    steps: [
      "1. **Surface Sanding**: Sanding plaster wall with 120-grit emery paper.",
      "2. **Primer Coat**: Applying 1 coat of alkali-resistant cement primer.",
      "3. **Acrylic Putty**: Applying 2 coats of acrylic wall putty for zero-defect smoothness.",
      "4. **Fine Sanding**: Sanding with 220-grit paper and dust wiping.",
      "5. **Emulsion Finish**: 2 coats of premium interior/exterior acrylic emulsion paint."
    ],
    rate: "₹18 - ₹45 per sq. ft."
  }
};

// Helper logic to parse numbers and estimate costs
function calculateEstimate(text) {
  const sqftMatch = text.match(/(\d+[\d,]*)\s*(sq\s*ft|sqft|square\s*feet|sq\s*meter|sqm)/i);
  if (!sqftMatch) return null;

  let area = parseFloat(sqftMatch[1].replace(/,/g, ''));
  const unit = sqftMatch[2].toLowerCase();
  
  if (unit.includes('meter') || unit.includes('sqm')) {
    area = area * 10.7639; // convert to sq ft
  }

  // Determine type
  let type = "RCC Frame Building Construction";
  let ratePerSqft = 2100;
  
  if (/road|paving|bituminous|asphalt/i.test(text)) {
    type = "Bituminous Asphalt Road Paving";
    ratePerSqft = 65;
  } else if (/warehouse|industrial|steel|peb/i.test(text)) {
    type = "Industrial PEB Warehouse Structure";
    ratePerSqft = 1450;
  } else if (/foundation|raft|footing/i.test(text)) {
    type = "Reinforced Footing & Raft Foundation";
    ratePerSqft = 480;
  } else if (/plaster/i.test(text)) {
    type = "Cement Wall Plastering Work";
    ratePerSqft = 40;
  } else if (/flooring|tile/i.test(text)) {
    type = "Vitrified Tile / Granite Flooring Work";
    ratePerSqft = 120;
  }

  const estimatedTotal = Math.round(area * ratePerSqft);
  const cementBags = Math.round(area * 0.45);
  const steelTons = ((area * 3.8) / 1000).toFixed(2);
  const concreteVolume = Math.round(area * 0.04);

  return {
    areaSqFt: Math.round(area),
    type,
    ratePerSqft,
    estimatedTotalInr: estimatedTotal,
    estimatedTotalLakhs: (estimatedTotal / 100000).toFixed(2),
    materialsBreakdown: {
      cementBags: `${cementBags} Bags (OPC 53 / PPC Grade)`,
      steelTons: `${steelTons} Metric Tons (TMT Fe-550D)`,
      concreteVolume: `${concreteVolume} m³ (Ready-Mix M25/M30)`
    }
  };
}

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ message: "Valid text message is required." });
    }

    const trimmedMsg = message.trim();
    const lower = trimmedMsg.toLowerCase();

    // Check if user is asking for cost estimation
    const costCalc = calculateEstimate(trimmedMsg);
    
    // Check if external GEMINI_API_KEY is configured
    if (process.env.GEMINI_API_KEY) {
      try {
        const fetch = (await import('node-fetch')).default;
        const promptSystem = `You are Pandit AI, an expert civil engineering assistant for Pandit Infra (Surat, India).
Answer questions on ALL civil work processes (excavation, PCC/RCC, masonry, plaster, waterproofing, flooring, road paving, PEB steel framing, plumbing/electrical civil work, quality testing).
Provide step-by-step engineering execution steps, standard material mixes (M20/M25/M30), rate ranges, and safety guidelines.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: `${promptSystem}\n\nUser Question: ${trimmedMsg}` }] }
            ]
          })
        });

        const data = await response.json();
        const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          return res.json({
            reply: replyText,
            estimate: costCalc,
            action: costCalc ? "SHOW_ESTIMATE" : null
          });
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed, using comprehensive local civil AI engine:", geminiError.message);
      }
    }

    // Local Comprehensive Civil Engineering AI Engine
    let reply = "";
    let action = null;

    // Matching specific civil work process
    let matchedProcess = null;
    if (lower.includes("excavat") || lower.includes("earthwork") || lower.includes("soil")) matchedProcess = CIVIL_WORK_PROCESSES.excavation;
    else if (lower.includes("foundat") || lower.includes("footing") || lower.includes("pcc") || lower.includes("rcc") || lower.includes("rebar")) matchedProcess = CIVIL_WORK_PROCESSES.foundation;
    else if (lower.includes("brick") || lower.includes("block") || lower.includes("masonry") || lower.includes("aac")) matchedProcess = CIVIL_WORK_PROCESSES.masonry;
    else if (lower.includes("plaster")) matchedProcess = CIVIL_WORK_PROCESSES.plastering;
    else if (lower.includes("waterproof")) matchedProcess = CIVIL_WORK_PROCESSES.waterproofing;
    else if (lower.includes("floor") || lower.includes("tile") || lower.includes("granite") || lower.includes("kota")) matchedProcess = CIVIL_WORK_PROCESSES.flooring;
    else if (lower.includes("road") || lower.includes("asphalt") || lower.includes("paving") || lower.includes("bitumen")) matchedProcess = CIVIL_WORK_PROCESSES.road;
    else if (lower.includes("paint") || lower.includes("putty") || lower.includes("color")) matchedProcess = CIVIL_WORK_PROCESSES.painting;

    if (costCalc) {
      action = "SHOW_ESTIMATE";
      reply = `Here is a preliminary AI estimation for **${costCalc.type}** over **${costCalc.areaSqFt.toLocaleString()} sq. ft.**:\n\n` +
        `• **Estimated Budget**: ~₹${costCalc.estimatedTotalLakhs} Lakhs (₹${costCalc.ratePerSqft}/sq.ft)\n` +
        `• **TMT Steel Grade Fe-550D**: ${costCalc.materialsBreakdown.steelTons}\n` +
        `• **Cement Requirement**: ${costCalc.materialsBreakdown.cementBags}\n` +
        `• **Concrete Grade**: ${costCalc.materialsBreakdown.concreteVolume}\n\n` +
        `*Note: Rates depend on structural blueprint specs and material grades. Would you like our Senior Civil Engineer to send you a formal BOQ?*`;
    } else if (matchedProcess) {
      reply = `${matchedProcess.title}\n\n` +
        matchedProcess.steps.join('\n') + `\n\n` +
        `• **Typical Rate**: ${matchedProcess.rate}\n\n` +
        `*Need custom execution or BOQ quote for your site? Feel free to ask or click below to contact our engineers!*`;
    } else if (lower.includes("estimate") || lower.includes("cost") || lower.includes("price") || lower.includes("rate") || lower.includes("budget")) {
      reply = `I can calculate an instant estimation for any civil work! 🏗️\n\n` +
        `Provide your site area (e.g. *"1500 sq ft RCC building"* or *"2000 sq ft plaster work"*).\n\n` +
        `Standard civil rate guidelines:\n` +
        `• **RCC Frame Structure**: ₹1,800 - ₹2,400 / sq.ft\n` +
        `• **Brickwork Masonry**: ₹65 - ₹110 / sq.ft\n` +
        `• **Cement Plastering**: ₹28 - ₹55 / sq.ft\n` +
        `• **Bituminous Road Paving**: ₹450 - ₹750 / sqm\n` +
        `• **Vitrified Tile Flooring**: ₹75 - ₹180 / sq.ft`;
      action = "PROMPT_CALCULATION";
    } else if (lower.includes("service") || lower.includes("work") || lower.includes("what do you do") || lower.includes("capability")) {
      reply = `Pandit Infra executes end-to-end civil engineering works across India:\n\n` +
        `1. 🚜 **Earthwork & Foundation** (Soil excavation, piling, raft footings)\n` +
        `2. 🏢 **RCC Frame Structures** (M25/M30 concrete, post-tensioning)\n` +
        `3. 🧱 **Masonry & Plastering** (AAC blocks, fly ash brickwork, sand plaster)\n` +
        `4. 💧 **Waterproofing & Flooring** (APP membrane, vitrified tiles, Kota stone)\n` +
        `5. 🛣️ **Roads & Box Culverts** (Bituminous asphalt paving, storm drains)\n` +
        `6. 🏗️ **PEB Warehouses** (Heavy structural steel fabrication)`;
    } else if (lower.includes("contact") || lower.includes("phone") || lower.includes("email") || lower.includes("quote")) {
      reply = `You can consult our civil engineering desk directly:\n\n` +
        `📍 **Headquarters**: Vesu Main Road, Surat, Gujarat - 395007\n` +
        `📧 **Email**: panditinfra503@gmail.com\n` +
        `📞 **Hotline**: +91 98765 43210 / +91 6358755599\n\n` +
        `Click below to request an official project quote!`;
      action = "SHOW_QUOTE_BUTTON";
    } else {
      reply = `Hello! I am Pandit AI, your civil engineering & construction assistant. 👷‍♂️\n\n` +
        `I can process & explain **any civil work process**:\n` +
        `• 🚜 **Excavation & PCC/RCC Foundation**\n` +
        `• 🧱 **Brickwork, AAC Blocks & Plastering**\n` +
        `• 💧 **Waterproofing & Flooring Solutions**\n` +
        `• 🛣️ **Asphalt Road Paving & Precast Box Culverts**\n` +
        `• 💰 **Instant Structural Cost Estimation**\n\n` +
        `You can **type** your question or tap the **microphone icon** to speak!`;
    }

    return res.json({
      reply,
      estimate: costCalc,
      action
    });

  } catch (err) {
    console.error("AI Chat Route Error:", err);
    res.status(500).json({ message: "Error processing AI request", error: err.message });
  }
});

export default router;
