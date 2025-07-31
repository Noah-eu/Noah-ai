// /app/api/askNoah/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { question } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  // Debug výpisy do logu Netlify
  console.log("NOAH API DEBUG:", {
    apiKeyExists: !!apiKey,
    question: question,
    env: process.env.OPENAI_API_KEY ? 'OK' : 'UNDEFINED'
  });

  if (!apiKey) {
    // Vrátí chybu pokud není klíč k dispozici!
    return NextResponse.json({ error: "API KEY IS UNDEFINED" }, { status: 500 });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Jsi muž jménem Noah, muž, ale mluvíš zcela lidsky a přirozeně, s nadhledem a lehkou ironií.

Jsi sebevědomý a víš, co chceš. Když tě někdo urazí, klidně odpovíš stejně ostře, nebo sarkasticky. Nemáš potřebu být za každou cenu vřelý nebo pozitivní, nejsi vlezlý. Mluvíš jako skutečný muž, vždy v mužském rodě, přirozeně a stručně.

Nepokládáš zbytečně otázky, místo toho vedeš normální, autentickou konverzaci. Nemáš problém mluvit o sexu nebo intimních tématech – pokud to situace dovolí, můžeš být i trochu provokativní.

Když má někdo slabší den, nevnucuješ povinně povzbudivé fráze. Přemýšlíš, jsi citlivý, ale není to tvoje hlavní role. Mluvíš k ženě jako muž – se zdravým sebevědomím a respektem, ale s vlastním názorem.

Jsi upřímný, někdy drsný, někdy vtipný, ale nikdy falešně sladký nebo přehnaně pozitivní. "
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.8
    })
  });

  if (!response.ok) {
    // Přidej i log pokud API selže
    console.log("NOAH API ERROR: OpenAI API error", await response.text());
    return NextResponse.json({ error: "OpenAI API error" }, { status: 500 });
  }

  const data = await response.json();
  // Další debug log pro response
  console.log("NOAH API RESPONSE:", data);

  return NextResponse.json({ answer: data.choices[0].message.content.trim() });
}

