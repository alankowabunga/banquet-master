
import React, { useState } from 'react';
import { Quotation, BanquetPlan, Venue } from '../types';
import { SYSTEM_PLANS, INITIAL_VENUES } from '../constants';
import { Plus, FileText, CheckCircle, Clock, AlertCircle, Loader2, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';

const QuotationManager: React.FC = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([
    {
      id: 'q1',
      customerName: 'Mr. Wang Wedding',
      eventDate: '2024-12-25',
      venueId: 'v1',
      planId: 'p1',
      tableCount: 20,
      status: 'Sent',
      totalAmount: 276000,
      createdAt: '2023-10-01'
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [newQuote, setNewQuote] = useState<Partial<Quotation>>({
    customerName: '',
    eventDate: '',
    venueId: 'v1',
    planId: 'p1',
    tableCount: 10
  });

  const selectedVenue = INITIAL_VENUES.find(v => v.id === newQuote.venueId);
  const isOverCapacity = selectedVenue ? (newQuote.tableCount || 0) > selectedVenue.maxTables : false;
  const isUnderCapacity = selectedVenue ? (newQuote.tableCount || 0) < selectedVenue.minTables : false;

  const handleCreate = () => {
    if (!newQuote.customerName || !newQuote.eventDate || isOverCapacity) return;
    
    const plan = SYSTEM_PLANS.find(p => p.id === newQuote.planId);
    const total = (plan?.pricePerTable || 0) * (newQuote.tableCount || 0);

    const quote: Quotation = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      customerName: newQuote.customerName!,
      eventDate: newQuote.eventDate!,
      venueId: newQuote.venueId!,
      planId: newQuote.planId!,
      tableCount: newQuote.tableCount!,
      status: 'Draft',
      totalAmount: total,
      createdAt: new Date().toISOString()
    };

    setQuotations([quote, ...quotations]);
    setIsAdding(false);
  };

  const handleExportPDF = async (q: Quotation) => {
    setIsExporting(q.id);
    
    try {
      const plan = SYSTEM_PLANS.find(p => p.id === q.planId);
      const venue = INITIAL_VENUES.find(v => v.id === q.venueId);
      
      const doc = new jsPDF();
      
      // Header & Branding
      doc.setFillColor(79, 70, 229); // Indigo-600
      doc.rect(0, 0, 210, 40, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('BANQUET MASTER', 20, 25);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Professional Event Planning & Management', 20, 32);
      
      // Title Section
      doc.setTextColor(30, 41, 59); // Slate-800
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('BANQUET PROPOSAL & QUOTATION', 20, 55);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Ref No: ${q.id}`, 150, 55);
      doc.text(`Date Issued: ${new Date().toLocaleDateString()}`, 150, 60);

      // Customer Info Box
      doc.setDrawColor(226, 232, 240); // Slate-200
      doc.setLineWidth(0.5);
      doc.line(20, 65, 190, 65);
      
      doc.setFont('helvetica', 'bold');
      doc.text('PREPARED FOR:', 20, 75);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(q.customerName, 20, 82);
      
      // Event Details
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('EVENT DETAILS', 20, 95);
      
      doc.setFont('helvetica', 'normal');
      doc.text(`Event Date: ${q.eventDate}`, 20, 102);
      doc.text(`Venue: ${venue?.name || 'N/A'}`, 20, 107);
      doc.text(`Estimated Guests: ${q.tableCount * 10} - ${q.tableCount * 12}`, 20, 112);
      doc.text(`Proposed Tables: ${q.tableCount}`, 20, 117);

      // Pricing Table
      doc.setFillColor(248, 250, 252); // Slate-50
      doc.rect(20, 125, 170, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.text('Description', 25, 131);
      doc.text('Rate', 120, 131);
      doc.text('Qty', 150, 131);
      doc.text('Subtotal', 170, 131);
      
      doc.setFont('helvetica', 'normal');
      doc.text(`${plan?.name || 'N/A'}`, 25, 145);
      doc.text(`$${plan?.pricePerTable.toLocaleString()}`, 120, 145);
      doc.text(`${q.tableCount}`, 150, 145);
      doc.text(`$${q.totalAmount.toLocaleString()}`, 170, 145);
      
      doc.line(20, 150, 190, 150);
      
      // Totals
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('GRAND TOTAL', 120, 165);
      doc.text(`$${q.totalAmount.toLocaleString()}`, 170, 165);
      
      // Footer/T&C
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 116, 139); // Slate-500
      doc.text('Notes: This quotation is valid for 14 days from the date of issue. Pricing is inclusive of standard service charge.', 20, 190);
      doc.text('A 30% non-refundable deposit is required to secure the booking.', 20, 195);
      
      doc.save(`Quotation_${q.customerName.replace(/\s+/g, '_')}_${q.id}.pdf`);
    } catch (error) {
      console.error('PDF Generation failed', error);
      alert('Failed to generate PDF. Please check console for details.');
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Quotations</h2>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> New Quotation
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-md animate-in fade-in slide-in-from-top-4">
          <h3 className="text-lg font-semibold mb-4 text-indigo-900">Create New Proposal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Customer Name</label>
              <input 
                type="text" 
                value={newQuote.customerName}
                onChange={(e) => setNewQuote({...newQuote, customerName: e.target.value})}
                className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g. Johnson & Smith Wedding"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Event Date</label>
              <input 
                type="date" 
                value={newQuote.eventDate}
                onChange={(e) => setNewQuote({...newQuote, eventDate: e.target.value})}
                className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Venue</label>
              <select 
                value={newQuote.venueId}
                onChange={(e) => setNewQuote({...newQuote, venueId: e.target.value})}
                className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {INITIAL_VENUES.map(v => <option key={v.id} value={v.id}>{v.name} (Max: {v.maxTables} tables)</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Plan</label>
              <select 
                value={newQuote.planId}
                onChange={(e) => setNewQuote({...newQuote, planId: e.target.value})}
                className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {SYSTEM_PLANS.map(p => <option key={p.id} value={p.id}>{p.name} (${p.pricePerTable}/table)</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-700">Table Count</label>
                {selectedVenue && (
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                    Venue Capacity: {selectedVenue.minTables} - {selectedVenue.maxTables} Tables
                  </span>
                )}
              </div>
              <div className="relative">
                <input 
                  type="number" 
                  value={newQuote.tableCount}
                  onChange={(e) => setNewQuote({...newQuote, tableCount: parseInt(e.target.value) || 0})}
                  className={`w-full border rounded-lg p-2 focus:ring-2 outline-none ${
                    isOverCapacity ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-indigo-500'
                  }`}
                />
                {isOverCapacity && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-red-600 font-medium">
                    <AlertCircle size={14} />
                    <span>Selected venue "{selectedVenue?.name}" only accommodates up to {selectedVenue?.maxTables} tables.</span>
                  </div>
                )}
                {isUnderCapacity && !isOverCapacity && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-amber-600 font-medium">
                    <AlertCircle size={14} />
                    <span>Warning: Below the venue's recommended minimum of {selectedVenue?.minTables} tables.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-6">
            <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
            <button 
              onClick={handleCreate} 
              disabled={isOverCapacity || !newQuote.customerName || !newQuote.eventDate}
              className={`px-4 py-2 rounded-lg text-white font-medium transition-all ${
                isOverCapacity || !newQuote.customerName || !newQuote.eventDate
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100'
              }`}
            >
              Generate Quotation
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Customer / Event</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Plan & Venue</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Total</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {quotations.map(q => (
              <tr key={q.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{q.customerName}</div>
                  <div className="text-xs text-slate-500">Event: {q.eventDate}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-700">{SYSTEM_PLANS.find(p => p.id === q.planId)?.name}</div>
                  <div className="text-xs text-slate-500">{INITIAL_VENUES.find(v => v.id === q.venueId)?.name} • {q.tableCount} Tables</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    q.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                    q.status === 'Sent' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {q.status === 'Confirmed' ? <CheckCircle size={12}/> : <Clock size={12}/>}
                    {q.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                  ${q.totalAmount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleExportPDF(q)}
                      disabled={isExporting === q.id}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all flex items-center gap-1 group/btn"
                      title="Export PDF"
                    >
                      {isExporting === q.id ? (
                        <Loader2 size={18} className="animate-spin text-indigo-500" />
                      ) : (
                        <Download size={18} className="group-hover/btn:scale-110 transition-transform" />
                      )}
                      <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">PDF</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {quotations.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={32} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">No quotations found. Start by creating one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotationManager;
