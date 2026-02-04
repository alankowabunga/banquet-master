
import React from 'react';

const ArchitectureGuide: React.FC = () => {
  return (
    <div className="space-y-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200 overflow-y-auto max-h-[85vh]">
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Clean Architecture & Hexagonal Design</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          For the Banquet Master system, we propose a Hexagonal (Ports & Adapters) architecture. This ensures that the core domain logic is decoupled from external infrastructure like databases, UI, and external APIs (like Gemini).
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 border border-slate-200 rounded-lg p-4 bg-slate-50">
            <h3 className="font-semibold text-blue-700 mb-2 underline">1. Domain Layer (Core)</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
              <li><strong>Entities:</strong> Venue, BanquetPlan, Quotation, MenuItem.</li>
              <li><strong>Value Objects:</strong> PricingRule, DateRange, Currency.</li>
              <li><strong>Domain Services:</strong> PriceCalculator (Logic for discounts, seasonal pricing).</li>
              <li><strong>Repositories (Interfaces):</strong> IQuotationRepository, IVenueRepository.</li>
            </ul>
          </div>

          <div className="flex-1 border border-slate-200 rounded-lg p-4 bg-slate-50">
            <h3 className="font-semibold text-emerald-700 mb-2 underline">2. Application Layer</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
              <li><strong>Use Cases:</strong> GenerateQuotation, AdjustMenuOptions, ExportPDF.</li>
              <li><strong>Ports (Input):</strong> REST Controllers, Chatbot UI interactions.</li>
              <li><strong>Ports (Output):</strong> Data access, Email service, Document Generator.</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Relational Design (ERD)</h2>
        <div className="p-4 bg-slate-900 text-slate-200 rounded-lg font-mono text-xs overflow-x-auto">
          <pre>
{`Table: Venues
- id (UUID, PK)
- name (String)
- capacity (Int)
- min_tables (Int)
- max_tables (Int)
- base_rental_fee (Decimal)

Table: Menu_Items
- id (UUID, PK)
- name (String)
- category (Enum)
- unit_price (Decimal)

Table: Banquet_Plans
- id (UUID, PK)
- name (String)
- base_price_per_table (Decimal)
- is_active (Boolean)

Table: Plan_Menu_Items (Mapping)
- plan_id (FK)
- menu_item_id (FK)

Table: Quotations
- id (UUID, PK)
- customer_name (String)
- event_date (Date)
- venue_id (FK)
- plan_id (FK)
- table_count (Int)
- total_price (Decimal)
- status (Enum)`}
          </pre>
        </div>
      </section>

      <section className="bg-amber-50 border-l-4 border-amber-400 p-4">
        <h3 className="font-bold text-amber-800 mb-2">Potential Design Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-amber-900">
          <li><strong>Over-engineering for MVP:</strong> Don't split into microservices until load requires it.</li>
          <li><strong>Fragile Pricing Logic:</strong> Avoid hardcoding tax/service charge rates in the UI; keep them in the Domain layer.</li>
          <li><strong>Concurrency:</strong> Handling double-booking of venues on the same date/time slot.</li>
          <li><strong>Document Consistency:</strong> Ensuring the generated PDF perfectly matches the DB state at that specific timestamp.</li>
        </ul>
      </section>
    </div>
  );
};

export default ArchitectureGuide;
