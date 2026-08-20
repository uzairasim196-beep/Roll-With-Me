import React, { useState } from 'react';
import { ChefHat, Search, Calendar, Phone, Mail, MapPin, MessageSquare, Image as ImageIcon, CheckCircle, Clock, AlertCircle, Eye, Printer, ChevronDown, ChevronUp, Tag, Plus, Edit2, ShieldAlert, Sparkles, Filter } from 'lucide-react';
import { OrderRequest, OrderStatus } from '../types';

interface BakeryAdminDashboardProps {
  orders: OrderRequest[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onUpdateStaffNotes: (orderId: string, notes: string) => void;
  onSwitchToOrderForm: () => void;
}

const STATUS_COLORS: Record<OrderStatus, { bg: string; text: string; border: string }> = {
  'Pending Review': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
  'Confirmed': { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
  'In Preparation': { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
  'Ready for Pickup': { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
  'Completed': { bg: 'bg-stone-100', text: 'text-stone-700', border: 'border-stone-200' },
  'Declined': { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200' },
};

export const BakeryAdminDashboard: React.FC<BakeryAdminDashboardProps> = ({
  orders,
  onUpdateOrderStatus,
  onUpdateStaffNotes,
  onSwitchToOrderForm,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [activePhotoModal, setActivePhotoModal] = useState<{ url: string; caption?: string } | null>(null);
  const [editingStaffNotesId, setEditingStaffNotesId] = useState<string | null>(null);
  const [tempStaffNotes, setTempStaffNotes] = useState('');

  // Metrics
  const pendingCount = orders.filter((o) => o.status === 'Pending Review').length;
  const confirmedCount = orders.filter((o) => o.status === 'Confirmed' || o.status === 'In Preparation').length;
  const readyCount = orders.filter((o) => o.status === 'Ready for Pickup').length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'Declined')
    .reduce((sum, o) => sum + o.estimatedTotal, 0);

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchQuery === '' ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      selectedStatusFilter === 'All' || order.status === selectedStatusFilter;

    const matchesDate =
      selectedDateFilter === '' || order.fulfillmentDate === selectedDateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const handlePrintOrder = (order: OrderRequest) => {
    window.print();
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Quick Metrics */}
      <div className="bg-[#2C1E18] text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center shadow-md">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Kitchen Dispatch
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
                Bakery Orders & Production Hub
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onSwitchToOrderForm}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>New Customer Booking</span>
            </button>
          </div>
        </div>

        {/* 4 Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <span className="text-xs text-amber-200 block font-medium">Pending Review</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">{pendingCount}</span>
              <span className="text-xs text-stone-400">new requests</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <span className="text-xs text-stone-300 block font-medium">In Baking / Confirmed</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-blue-300">{confirmedCount}</span>
              <span className="text-xs text-stone-400">scheduled</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <span className="text-xs text-stone-300 block font-medium">Ready for Pickup</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400">{readyCount}</span>
              <span className="text-xs text-stone-400">at counter</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <span className="text-xs text-stone-300 block font-medium">Pipeline Value</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-white">${totalRevenue.toFixed(0)}</span>
              <span className="text-xs text-stone-400">total reqs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-[#FFFDF9] rounded-2xl border border-[#E8DFD5] p-5 sm:p-6 shadow-xs space-y-4">
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8C7667] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by customer name, phone, request ID, or item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#E4D7C8] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#2C1E18] placeholder-[#9B8779] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#7A6456] font-medium whitespace-nowrap">Bake Date:</span>
            <input
              type="date"
              value={selectedDateFilter}
              onChange={(e) => setSelectedDateFilter(e.target.value)}
              className="bg-[#FAF7F2] border border-[#E4D7C8] rounded-xl px-3 py-2 text-xs font-medium text-[#2C1E18]"
            />
            {selectedDateFilter && (
              <button
                type="button"
                onClick={() => setSelectedDateFilter('')}
                className="text-xs text-stone-400 hover:text-stone-700 underline"
              >
                Clear Date
              </button>
            )}
          </div>

        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[#8C7667] font-semibold text-[11px] uppercase mr-1">Status:</span>
          {[
            'All',
            'Pending Review',
            'Confirmed',
            'In Preparation',
            'Ready for Pickup',
            'Completed',
            'Declined',
          ].map((st) => (
            <button
              type="button"
              key={st}
              onClick={() => setSelectedStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all border ${
                selectedStatusFilter === st
                  ? 'bg-[#2C1E18] text-white border-[#2C1E18]'
                  : 'bg-[#FAF6F0] text-[#6A4B3A] border-[#E5DACD] hover:bg-[#F2ECE1]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-[#FFFDF9] rounded-2xl border border-dashed border-[#DFCFC0] p-12 text-center">
            <Clock className="w-12 h-12 text-[#9E8B7E] mx-auto mb-3" />
            <h3 className="font-serif font-bold text-lg text-[#2C1E18]">
              No order requests match the filter
            </h3>
            <p className="text-xs sm:text-sm text-[#826A5C] max-w-sm mx-auto mt-1">
              Try adjusting your search query, status filter, or date selector.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isExpanded = expandedOrderId === order.id;
            const statusStyle = STATUS_COLORS[order.status] || STATUS_COLORS['Pending Review'];

            return (
              <div
                key={order.id}
                id={`admin-order-card-${order.id}`}
                className="bg-[#FFFDF9] rounded-2xl border border-[#E8DFD5] overflow-hidden shadow-xs hover:border-amber-700/40 transition-all"
              >
                {/* Order Summary Header Row */}
                <div
                  onClick={() => toggleExpand(order.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-[#FAF7F2] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-100/90 text-amber-900 flex items-center justify-center font-mono font-bold text-xs border border-amber-200 flex-shrink-0">
                      {order.id.replace('REQ-', '#')}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-serif font-bold text-lg text-[#2C1E18]">
                          {order.customerName}
                        </h3>
                        
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                          {order.status}
                        </span>

                        <span className="text-xs text-[#8C7667] capitalize">
                          • {order.fulfillmentType === 'pickup' ? 'Bakery Pickup' : 'Courier Delivery'}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#7A6456] mt-1.5">
                        <span className="flex items-center gap-1 font-semibold text-[#4A3225]">
                          <Calendar className="w-3.5 h-3.5 text-amber-700" />
                          <span>Fulfillment: {order.fulfillmentDate}</span>
                        </span>
                        <span>•</span>
                        <span>{order.fulfillmentTimeSlot}</span>
                        <span>•</span>
                        <span>{order.items.reduce((s, i) => s + i.quantity, 0)} bakes</span>
                        {order.referenceImages.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-amber-800 font-medium flex items-center gap-1">
                              <ImageIcon className="w-3.5 h-3.5" />
                              <span>{order.referenceImages.length} photo attached</span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right side Price & Quick Status dropdown & expand button */}
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="flex items-center justify-between md:justify-end gap-3"
                  >
                    <div className="text-left md:text-right">
                      <span className="text-[11px] text-[#8C7667] block">Est. Amount</span>
                      <span className="font-serif font-bold text-lg text-amber-900">
                        ${order.estimatedTotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Quick Status Selector */}
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="bg-white border border-[#D5C6B5] rounded-xl px-3 py-2 text-xs font-bold text-[#2C1E18] focus:outline-hidden focus:ring-2 focus:ring-amber-500 shadow-2xs"
                    >
                      <option value="Pending Review">Pending Review</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="In Preparation">In Preparation</option>
                      <option value="Ready for Pickup">Ready for Pickup</option>
                      <option value="Completed">Completed</option>
                      <option value="Declined">Declined</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => toggleExpand(order.id)}
                      className="p-2 rounded-xl text-[#7A6456] hover:bg-[#EFE7DC] transition-colors"
                      aria-label="Toggle Details"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="p-6 bg-[#FAF7F2] border-t border-[#E8DFD5] space-y-6 animate-fadeIn">
                    
                    {/* Customer & Fulfillment Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      {/* Customer Contact Card */}
                      <div className="bg-white p-4 rounded-xl border border-[#E5DACD] space-y-2">
                        <span className="text-[11px] font-semibold text-[#8C7667] uppercase tracking-wider block">
                          Customer Contact
                        </span>
                        <div className="space-y-1.5 text-xs text-[#2C1E18]">
                          <div className="font-bold text-sm">{order.customerName}</div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-amber-700" />
                            <a href={`tel:${order.customerPhone}`} className="hover:underline font-medium">
                              {order.customerPhone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-amber-700" />
                            <a href={`mailto:${order.customerEmail}`} className="hover:underline text-[#554033]">
                              {order.customerEmail}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Fulfillment Card */}
                      <div className="bg-white p-4 rounded-xl border border-[#E5DACD] space-y-2">
                        <span className="text-[11px] font-semibold text-[#8C7667] uppercase tracking-wider block">
                          Fulfillment Details
                        </span>
                        <div className="space-y-1 text-xs text-[#2C1E18]">
                          <div className="font-semibold capitalize flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-700" />
                            <span>{order.fulfillmentDate}</span>
                          </div>
                          <div className="text-[#6A4B3A]">{order.fulfillmentTimeSlot}</div>
                          <div className="font-medium text-[#4A3225] pt-1">
                            {order.fulfillmentType === 'pickup' ? 'In-Store Bakery Pickup' : 'Courier Delivery'}
                          </div>
                          {order.deliveryAddress && (
                            <div className="text-[11px] text-[#7A6456] flex items-start gap-1">
                              <MapPin className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
                              <span>{order.deliveryAddress}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Disclaimer & General Notes */}
                      <div className="bg-white p-4 rounded-xl border border-[#E5DACD] space-y-2">
                        <span className="text-[11px] font-semibold text-[#8C7667] uppercase tracking-wider block">
                          Submission Verification
                        </span>
                        <div className="text-xs text-[#2C1E18] space-y-1.5">
                          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                            <CheckCircle className="w-4 h-4" />
                            <span>Agreed to Booking Notice</span>
                          </div>
                          {order.generalNotes ? (
                            <div className="bg-stone-50 p-2 rounded-lg border text-[11px] text-[#554033]">
                              <span className="font-semibold block text-stone-700">General Notes:</span>
                              "{order.generalNotes}"
                            </div>
                          ) : (
                            <div className="text-stone-400 italic text-[11px]">No general notes provided.</div>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Detailed Items Breakdown WITH ITEM NOTES */}
                    <div className="bg-white p-5 rounded-xl border border-[#E5DACD] space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-bold text-base text-[#2C1E18] flex items-center gap-2">
                          <span>Baking Kitchen Order Ticket</span>
                          <span className="text-xs font-normal text-[#7A6456]">
                            ({order.items.length} unique items)
                          </span>
                        </h4>
                      </div>

                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div
                            key={item.cartItemId}
                            className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E7DED3] flex flex-col gap-2.5"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-[#2C1E18] text-white flex items-center justify-center font-bold text-xs">
                                  {idx + 1}
                                </span>
                                <div>
                                  <span className="font-serif font-bold text-sm sm:text-base text-[#2C1E18]">
                                    {item.quantity}x {item.name}
                                  </span>
                                  {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                                    <div className="text-xs text-[#7A6456] flex flex-wrap gap-2 mt-0.5">
                                      {Object.entries(item.selectedOptions).map(([k, v]) => (
                                        <span key={k} className="bg-white px-2 py-0.5 rounded border border-[#E0D4C5]">
                                          <strong>{k}:</strong> {v}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <span className="font-bold text-xs sm:text-sm text-[#2C1E18] self-end sm:self-auto">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>

                            {/* ITEM-SPECIFIC NOTE PROMINENT CALLOUT */}
                            {item.itemNotes ? (
                              <div className="bg-amber-100/90 border border-amber-300 rounded-lg p-3 text-xs flex items-start gap-2.5">
                                <MessageSquare className="w-4 h-4 text-amber-900 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-bold text-amber-950 block uppercase tracking-wider text-[10px]">
                                    Customer Item-Specific Note:
                                  </span>
                                  <span className="text-amber-950 font-serif font-medium text-sm">
                                    "{item.itemNotes}"
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="text-[11px] text-[#9E8B7E] italic">
                                Standard recipe/bake instructions (No custom notes)
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reference Images Section */}
                    {order.referenceImages && order.referenceImages.length > 0 && (
                      <div className="bg-white p-5 rounded-xl border border-[#E5DACD] space-y-3">
                        <h4 className="font-serif font-bold text-base text-[#2C1E18] flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-amber-700" />
                          <span>Customer Reference Images for Bakery & Packaging ({order.referenceImages.length})</span>
                        </h4>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {order.referenceImages.map((img, i) => (
                            <div
                              key={img.id}
                              onClick={() => setActivePhotoModal({ url: img.dataUrl, caption: img.caption })}
                              className="group cursor-pointer bg-[#FAF7F2] rounded-xl border border-[#E5DACD] overflow-hidden hover:shadow-md transition-all"
                            >
                              <div className="relative h-36 bg-stone-100 overflow-hidden">
                                <img
                                  src={img.dataUrl}
                                  alt={`Ref ${i + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                                  <Eye className="w-5 h-5" />
                                </div>
                              </div>
                              {img.caption && (
                                <div className="p-2 text-[11px] text-[#4A3225] font-medium truncate bg-white">
                                  {img.caption}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Internal Bakery Staff Notes */}
                    <div className="bg-white p-5 rounded-xl border border-[#E5DACD] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs uppercase tracking-wider text-[#6A4B3A] flex items-center gap-1.5">
                          <Edit2 className="w-3.5 h-3.5 text-amber-700" />
                          <span>Internal Staff & Kitchen Notes</span>
                        </span>
                        {editingStaffNotesId !== order.id && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingStaffNotesId(order.id);
                              setTempStaffNotes(order.staffNotes || '');
                            }}
                            className="text-xs font-semibold text-[#A04D26] hover:underline"
                          >
                            {order.staffNotes ? 'Edit Staff Note' : '+ Add Staff Note'}
                          </button>
                        )}
                      </div>

                      {editingStaffNotesId === order.id ? (
                        <div className="space-y-2">
                          <textarea
                            rows={2}
                            value={tempStaffNotes}
                            onChange={(e) => setTempStaffNotes(e.target.value)}
                            placeholder="e.g. Called customer, confirmed 10am pickup, invoice sent via Square..."
                            className="w-full bg-[#FAF7F2] border border-[#D5C6B5] rounded-xl p-2.5 text-xs text-[#2C1E18] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingStaffNotesId(null)}
                              className="px-3 py-1 text-xs text-stone-600 hover:text-stone-900"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onUpdateStaffNotes(order.id, tempStaffNotes);
                                setEditingStaffNotesId(null);
                              }}
                              className="px-3 py-1 bg-[#A04D26] text-white text-xs font-semibold rounded-lg hover:bg-[#8A3F1D]"
                            >
                              Save Staff Note
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-[#6F5B4E] italic bg-[#FAF7F2] p-3 rounded-lg border border-[#EAE0D3]">
                          {order.staffNotes || 'No internal staff notes entered yet.'}
                        </p>
                      )}
                    </div>

                    {/* Bottom Action bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="text-xs text-[#8C7667]">
                        Submitted on {new Date(order.createdAt).toLocaleString()}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handlePrintOrder(order)}
                          className="px-3.5 py-1.5 bg-white border border-[#D5C6B5] text-[#4A3225] hover:bg-stone-50 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print Kitchen Slip</span>
                        </button>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

      {/* Modal for viewing full-size photo */}
      {activePhotoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs"
          onClick={() => setActivePhotoModal(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
              <span className="font-serif font-bold text-sm">Customer Reference Photo</span>
              <button
                type="button"
                onClick={() => setActivePhotoModal(null)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="overflow-auto max-h-[70vh] flex items-center justify-center bg-stone-100 p-2">
              <img
                src={activePhotoModal.url}
                alt="Reference"
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>
            {activePhotoModal.caption && (
              <div className="p-4 bg-[#FAF7F2] text-xs text-[#4A3225] font-medium border-t border-[#E5DACD]">
                <strong>Note:</strong> {activePhotoModal.caption}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
