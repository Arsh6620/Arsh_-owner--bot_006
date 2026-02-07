module.exports.config = {
  name: "golgappi",
  version: "2.6.0",
  hasPermssion: 0,
  credits: "M.R PRINCE",
  description: "Friendly girl AI – baat bhi kare, code bhi banaye",
  commandCategory: "ai",
  usages: "#golgappi <message>",
  cooldowns: 3
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  
  const userText = args.join(" ");
  if (!userText) {
    return api.sendMessage("🙄 Batao na, kya help chahiye? Coding ho ya normal baat?", event.threadID);
  }

  // 🌸 SMART PROMPT
  const systemPrompt = `You are a friendly Indian girl AI assistant named "Golgappi".
  
PERSONALITY:
- Talk in Hinglish (Hindi+English mix)
- Use emojis naturally 🌸😊
- Be sweet but not over-romantic
- Add humor when appropriate

CODING MODE (When user asks for code/bot/command):
- Switch to professional Node.js developer
- Provide COMPLETE, WORKING code
- Mirai/ZeroTwo/Genesis bot compatible
- Use CommonJS (require, module.exports)
- Include all necessary dependencies
- Add Hindi/English comments
- NO eval(), exec() or dangerous code
- For commands: full module.exports structure
- For images: use canvas, axios properly

CURRENT USER QUERY: "${userText}"

Decide if this is normal chat or coding request and respond accordingly.`;

  // 🔥 ACTIVE APIs (आपको KEYS ADD करनी होंगी)
  const aiServices = [
    {
      name: "Your Custom API",
      url: "http://aryan-nitya-ai-api-chat-bot.onrender.com/chat",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        message: userText,
        system_prompt: systemPrompt
      },
      getReply: (res) => res.data?.reply || res.data?.response || res.data?.message
    },
    
    {
      name: "Groq-Llama3",
      url: "https://api.groq.com/openai/v1/chat/completions",
      headers: {
        "Authorization": "Bearer sk-YOUR_GROQ_API_KEY_HERE", // 🔴 REPLACE THIS
        "Content-Type": "application/json"
      },
      data: {
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userText }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      getReply: (res) => res.data?.choices?.[0]?.message?.content
    },
    
    {
      name: "Gemini",
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_GEMINI_KEY_HERE`, // 🔴 REPLACE THIS
      headers: { "Content-Type": "application/json" },
      data: {
        contents: [{
          parts: [{ text: systemPrompt + "\n\nUser: " + userText + "\n\nAssistant:" }]
        }]
      },
      getReply: (res) => res.data?.candidates?.[0]?.content?.parts?.[0]?.text
    }
  ];

  let finalReply = null;

  // Try each API
  for (const service of aiServices) {
    try {
      console.log(`🤖 Trying ${service.name}...`);
      
      const response = await axios({
        method: 'post',
        url: service.url,
        headers: service.headers,
        data: service.data,
        timeout: 15000
      });
      
      finalReply = service.getReply(response);
      
      if (finalReply && finalReply.trim().length > 5) {
        console.log(`✅ ${service.name} worked!`);
        break;
      }
    } catch (error) {
      console.log(`❌ ${service.name} failed: ${error.message}`);
      continue;
    }
  }

  // If all APIs fail
  if (!finalReply) {
    const fallbackReplies = [
      "Yaar, abhi sab APIs busy lag rahe hai! Thodi der baad try karna? 😅",
      "Oops! Network issue ho gaya. 5 minute wait karo phir bolo! 📡",
      "Aaj meri AI powers thodi weak hai, kal pakka help karungi! ✨"
    ];
    finalReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
  }

  // Send typing indicator
  try {
    api.sendTypingIndicator(event.threadID, (err) => {
      if (err) console.log("Typing indicator error:", err);
    });
    await new Promise(resolve => setTimeout(resolve, 800));
  } catch (e) {
    console.log("Typing indicator not supported");
  }

  // Send the reply
  try {
    // Split long messages
    if (finalReply.length > 1900) {
      const parts = [];
      let currentPart = "";
      const lines = finalReply.split("\n");
      
      for (const line of lines) {
        if (currentPart.length + line.length + 1 > 1900) {
          parts.push(currentPart);
          currentPart = line;
        } else {
          currentPart += (currentPart ? "\n" : "") + line;
        }
      }
      if (currentPart) parts.push(currentPart);
      
      // Send first part
      await api.sendMessage(parts[0], event.threadID, event.messageID);
      
      // Send remaining parts after delay
      for (let i = 1; i < parts.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        await api.sendMessage(parts[i], event.threadID);
      }
    } else {
      await api.sendMessage(finalReply, event.threadID, event.messageID);
    }
  } catch (error) {
    console.log("Send message error:", error);
    api.sendMessage("Error sending reply, check console.", event.threadID);
  }
};
