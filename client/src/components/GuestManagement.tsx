import { useState } from 'react';
import { Users, Plus, Search, Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import { mockGuests, Guest } from './mockData';

export function GuestManagement() {
  const [guests] = useState<Guest[]>(mockGuests);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuests = guests.filter(guest => {
    return (
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone.includes(searchTerm) ||
      guest.idNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Quản Lý Khách Hàng</h2>
          <p className="text-gray-600 mt-1">Quản lý thông tin và hồ sơ khách hàng</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/30 transition-all duration-200 hover:shadow-xl hover:scale-105">
          <Plus className="w-5 h-5" />
          <span className="font-medium">Thêm Khách Hàng</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, số điện thoại hoặc số CMND..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Guest Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuests.map((guest, index) => (
          <div 
            key={guest.id} 
            className="group bg-white rounded-2xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Guest Header */}
            <div className="bg-linear-to-br from-blue-500 to-blue-600 p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/5"></div>
              <div className="relative flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/30">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0 text-white">
                  <h3 className="font-semibold truncate text-lg">{guest.name}</h3>
                  <p className="text-sm opacity-90 mt-1">Mã: {guest.id}</p>
                </div>
              </div>
            </div>

            {/* Guest Info */}
            <div className="p-6">
              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Mail className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-700 break-all">{guest.email}</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Phone className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-700">{guest.phone}</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <MapPin className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-700">{guest.address}</p>
                </div>
              </div>

              {/* ID Info */}
              <div className="pt-5 border-t border-gray-100 space-y-3 mb-5">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Giấy Tờ Tùy Thân</span>
                </div>
                <div className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-600">Loại</span>
                  <span className="text-sm font-medium text-blue-900">{guest.idType}</span>
                </div>
                <div className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-600">Số</span>
                  <span className="text-sm font-medium text-blue-900">{guest.idNumber}</span>
                </div>
                <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-600">Ngày đăng ký</span>
                  <span className="text-sm font-medium text-green-900">{guest.registrationDate}</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200 hover:shadow-md">
                Xem Lịch Sử Đặt Phòng
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredGuests.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200/50 p-16 text-center shadow-sm">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-900 mb-1">Không tìm thấy khách hàng</p>
          <p className="text-sm text-gray-500">Thử thay đổi từ khóa tìm kiếm</p>
        </div>
      )}
    </div>
  );
}