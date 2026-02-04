
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  Utensils, 
  Settings, 
  FileSignature, 
  MessageSquare, 
  Layers,
  BarChart3,
  Search
} from 'lucide-react';
import QuotationManager from './components/QuotationManager';
import ArchitectureGuide from './components/ArchitectureGuide';
import ChatBot from './components/ChatBot';
import { INITIAL_VENUES, INITIAL_MENU_ITEMS, SYSTEM_PLANS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'venues' | 'menus' | 'plans' | 'quotations' | 'arch' | 'chat'>('dashboard');

  const SidebarItem = ({ id, icon: Icon, label }: { id: any, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        activeTab === id 
          ? 'bg-indigo-50 text-indigo-700 shadow-sm font-semibold' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
      }`}
    >
      <Icon size={20} />
      <span className="text-sm">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white p-6 flex flex-col hidden md:flex">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Layers size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">BanquetMaster</span>
        </div>

        <nav className="flex-1 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 ml-2">General</div>
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem id="quotations" icon={FileSignature} label="Quotations" />
          
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-8 mb-4 ml-2">Catalog</div>
          <SidebarItem id="venues" icon={MapPin} label="Venue Manager" />
          <SidebarItem id="menus" icon={Utensils} label="Menu Catalog" />
          <SidebarItem id="plans" icon={Layers} label="Plan Config" />

          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-8 mb-4 ml-2">Resources</div>
          <SidebarItem id="chat" icon={MessageSquare} label="AI Sales Assistant" />
          <SidebarItem id="arch" icon={Settings} label="System Design" />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold">JD</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">Jane Doe</p>
              <p className="text-[10px] text-slate-500 truncate">Senior Sales Mgr</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shadow-sm shadow-slate-100">
          <div className="flex items-center bg-slate-100 rounded-full px-4 py-1.5 w-96">
            <Search size={16} className="text-slate-400 mr-2" />
            <input type="text" placeholder="Search proposals or venues..." className="bg-transparent text-sm w-full outline-none text-slate-600" />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              <BarChart3 size={20} />
            </button>
            <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
              Quick Export
            </button>
          </div>
        </header>

        {/* Dynamic Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <p className="text-sm font-medium text-slate-500 mb-1 uppercase tracking-wider">Total Proposals</p>
                    <h3 className="text-3xl font-bold text-slate-900">42</h3>
                    <p className="text-xs text-emerald-600 mt-2 font-medium">↑ 12% from last month</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <p className="text-sm font-medium text-slate-500 mb-1 uppercase tracking-wider">Conversion Rate</p>
                    <h3 className="text-3xl font-bold text-slate-900">68%</h3>
                    <p className="text-xs text-blue-600 mt-2 font-medium">Average across 3 halls</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <p className="text-sm font-medium text-slate-500 mb-1 uppercase tracking-wider">Revenue Forecast</p>
                    <h3 className="text-3xl font-bold text-slate-900">$1.2M</h3>
                    <p className="text-xs text-slate-500 mt-2 font-medium">Pending confirmation</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-slate-800">Available Venues</h3>
                      <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                      {INITIAL_VENUES.map(v => (
                        <div key={v.id} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-indigo-100 transition-colors">
                          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-indigo-600">
                            <MapPin size={24} />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{v.name}</h4>
                            <p className="text-xs text-slate-500">{v.maxTables} Tables Max • ${v.basePrice.toLocaleString()} Base</p>
                          </div>
                          <div className="ml-auto">
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase">Available</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-slate-800">Popular Plans</h3>
                      <button className="text-xs font-bold text-indigo-600 hover:underline">Manage Plans</button>
                    </div>
                    <div className="space-y-4">
                      {SYSTEM_PLANS.map(p => (
                        <div key={p.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                            <span className="text-sm font-bold text-indigo-600">${p.pricePerTable.toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-slate-600 mb-3">{p.description}</p>
                          <div className="flex gap-2">
                            {p.menuItems.slice(0, 3).map(mi => (
                              <span key={mi} className="text-[9px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-500 uppercase font-medium">
                                Dish Ref: {mi}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quotations' && <QuotationManager />}
            
            {activeTab === 'arch' && <ArchitectureGuide />}

            {activeTab === 'chat' && (
              <div className="h-[calc(100vh-12rem)] max-w-2xl mx-auto">
                <ChatBot />
              </div>
            )}

            {(activeTab === 'venues' || activeTab === 'menus' || activeTab === 'plans') && (
              <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Coming Soon to MVP</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  The {activeTab} management module is scheduled for the next release. Currently using pre-defined seed data.
                </p>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Chat Bubble (Quick Access) */}
        {activeTab !== 'chat' && (
          <button 
            onClick={() => setActiveTab('chat')}
            className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-indigo-200 hover:scale-110 transition-transform z-20"
          >
            <MessageSquare size={24} />
          </button>
        )}
      </main>
    </div>
  );
};

export default App;
