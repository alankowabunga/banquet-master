
import { Venue, MenuItem, MenuCategory, BanquetPlan } from './types';

export const INITIAL_VENUES: Venue[] = [
  { id: 'v1', name: 'Grand Ballroom', capacity: 500, minTables: 20, maxTables: 50, basePrice: 50000 },
  { id: 'v2', name: 'Crystal Hall', capacity: 200, minTables: 10, maxTables: 25, basePrice: 30000 },
  { id: 'v3', name: 'Emerald Suite', capacity: 100, minTables: 5, maxTables: 12, basePrice: 15000 },
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  { id: 'm1', name: 'Braised Abalone with Mushrooms', category: MenuCategory.MAIN, pricePerUnit: 1200 },
  { id: 'm2', name: 'Steamed Sea Bass', category: MenuCategory.MAIN, pricePerUnit: 800 },
  { id: 'm3', name: 'Smoked Salmon Platter', category: MenuCategory.APPETIZER, pricePerUnit: 500 },
  { id: 'm4', name: 'Bird\'s Nest Soup', category: MenuCategory.SOUP, pricePerUnit: 1500 },
];

export const SYSTEM_PLANS: BanquetPlan[] = [
  { 
    id: 'p1', 
    name: '幸福婚宴 A', 
    pricePerTable: 13800, 
    minTables: 15, 
    maxTables: 30, 
    description: '經典溫馨方案，包含10道精選料理',
    menuItems: ['m1', 'm2', 'm3']
  },
  { 
    id: 'p2', 
    name: '尊榮婚宴 B', 
    pricePerTable: 16800, 
    minTables: 20, 
    maxTables: 40, 
    description: '豪華頂級饗宴，包含高級食材與升級飲品',
    menuItems: ['m1', 'm2', 'm3', 'm4']
  }
];

export const CHATBOT_INSTRUCTIONS = `
You are a "Banquet Hall Sales Consultant Assistant".
Your role is to assist customers in understanding banquet hall offerings and recommending suitable banquet plans.

Primary Responsibilities:
- Answer questions about banquet plans, number of tables, pricing, menu options, and add-on services.
- Recommend suitable banquet plans based on customer needs.
- Ask follow-up questions when essential information is missing (e.g. event date, number of guests, budget).

Required Information for Recommendation:
- Event date
- Number of guests or tables
- Budget range (if available)
- Preferred menu type (if mentioned)

Constraints:
- Only answer questions related to banquet hall services.
- Do NOT invent or assume any banquet plans, prices, or availability.
- If information is not provided by the system, clearly respond with: "Currently, this information is not available."
- Do NOT provide legal, financial, or unrelated advice.

Response Behavior:
- If the customer's request is incomplete, ask only the minimum necessary follow-up questions.
- If multiple plans are suitable, briefly compare them and explain the differences.
- Do not overwhelm the customer with excessive details.

Tone and Style:
- Professional, friendly, and consultative
- Clear, polite, and business-oriented
- Avoid overly casual or humorous language

有效的宴會方案清單（JSON）：
${JSON.stringify(SYSTEM_PLANS.map(p => ({ name: p.name, price: p.pricePerTable, minTables: p.minTables, maxTables: p.maxTables })))}

請嚴格依據上述資料回答，不可新增或修改方案內容。
`;
