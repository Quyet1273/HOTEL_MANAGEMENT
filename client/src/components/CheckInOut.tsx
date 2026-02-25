import { useState } from 'react';
import { LogIn, LogOut, Search, Calendar, User, Bed, Clock, Check, X } from 'lucide-react';
import { mockBookings, mockGuests, mockRooms } from './mockData';
import { toast } from 'sonner';

export function CheckInOut() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'checkin' | 'checkout'>('pending');

  const today = new Date().toISOString().split('T')[0];

  const pendingBookings = mockBookings.filter(b => 
    b.checkIn === today && b.status === 'pending'
  );

  const checkInBookings = mockBookings.filter(b => 
    b.checkIn === today && b.status === 'confirmed'
  );

  const checkOutBookings = mockBookings.filter(b => 
    b.checkOut === today && b.status === 'checked-in'
  );

  const displayBookings = activeTab === 'pending' ? pendingBookings : 
                          activeTab === 'checkin' ? checkInBookings : checkOutBookings;

  const filteredBookings = displayBookings.filter(booking => {
    const guest = mockGuests.find(g => g.id === booking.guestId);
    const room = mockRooms.find(r => r.id === booking.roomId);
    return (
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room?.number.includes(searchTerm)
    );
  });

  const handleCheckIn = (bookingId: string) => {
    toast.success(`Đã xử lý nhận phòng cho mã ${bookingId}`);
  };

  const handleCheckOut = (bookingId: string) => {
    toast.success(`Đã xử lý trả phòng cho mã ${bookingId}`);
  };

  const handleConfirm = (bookingId: string) => {
    toast.success(`Đã xác nhận booking ${bookingId}`);
  };

  const handleReject = (bookingId: string) => {
    toast.error(`Đã từ chối booking ${bookingId}`);
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'single':
        return 'Đơn';
      case 'double':
        return 'Đôi';
      case 'suite':
        return 'Suite';
      case 'deluxe':
        return 'Deluxe';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h2 className="text-gray-900">Nhận Phòng / Trả Phòng</h2>
        <p className="text-gray-600 mt-1">Xử lý khách đến và khách đi</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200/50">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-5 transition-all duration-200 ${
              activeTab === 'pending'
                ? 'bg-linear-to-r from-yellow-50 to-yellow-100/50 text-yellow-600 border-b-2 border-yellow-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              activeTab === 'pending' 
                ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/30' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="font-semibold block">Đang chờ</span>
              <span className="text-xs opacity-75">{pendingBookings.length} khách</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('checkin')}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-5 transition-all duration-200 ${
              activeTab === 'checkin'
                ? 'bg-linear-to-r from-blue-50 to-blue-100/50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              activeTab === 'checkin' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              <LogIn className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="font-semibold block">Nhận Phòng</span>
              <span className="text-xs opacity-75">{checkInBookings.length} khách</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('checkout')}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-5 transition-all duration-200 ${
              activeTab === 'checkout'
                ? 'bg-linear-to-r from-red-50 to-rose-100/50 text-red-600 border-b-2 border-red-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              activeTab === 'checkout' 
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              <LogOut className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="font-semibold block">Trả Phòng</span>
              <span className="text-xs opacity-75">{checkOutBookings.length} khách</span>
            </div>
          </button>
        </div>

        {/* Search */}
        <div className="p-5 border-b border-gray-200/50 bg-gray-50/50">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã đặt phòng, tên khách hoặc số phòng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Bookings List */}
        <div className="divide-y divide-gray-100">
          {filteredBookings.map((booking) => {
            const guest = mockGuests.find(g => g.id === booking.guestId);
            const room = mockRooms.find(r => r.id === booking.roomId);

            return (
              <div key={booking.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Guest Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Khách hàng</span>
                      </div>
                      <p className="text-gray-900 font-semibold">{guest?.name}</p>
                      <p className="text-sm text-gray-600">{guest?.phone}</p>
                      <p className="text-xs text-blue-600 font-medium">Mã: {booking.id}</p>
                    </div>

                    {/* Room Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Bed className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phòng</span>
                      </div>
                      <p className="text-gray-900 font-semibold">Phòng {room?.number}</p>
                      <p className="text-sm text-gray-600">{getTypeText(room?.type || '')}</p>
                      <p className="text-xs text-gray-500">{booking.guests} khách</p>
                    </div>

                    {/* Date Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Thời gian</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-700">Nhận:</span> {booking.checkIn}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-700">Trả:</span> {booking.checkOut}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-2">
                        Tổng: <span className="text-blue-600">${booking.totalAmount}</span>
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="shrink-0">
                    {activeTab === 'pending' ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleConfirm(booking.id)}
                          className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-600/30 transition-all duration-200 hover:shadow-xl hover:scale-105 font-medium"
                        >
                          <Check className="w-5 h-5" />
                          Xác nhận
                        </button>
                        <button
                          onClick={() => handleReject(booking.id)}
                          className="flex items-center gap-2 px-5 py-3 bg-white text-red-600 border-2 border-red-600 rounded-xl hover:bg-red-50 transition-all duration-200 font-medium"
                        >
                          <X className="w-5 h-5" />
                          Từ chối
                        </button>
                      </div>
                    ) : activeTab === 'checkin' ? (
                      <button
                        onClick={() => handleCheckIn(booking.id)}
                        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/30 transition-all duration-200 hover:shadow-xl hover:scale-105 font-medium"
                      >
                        <LogIn className="w-5 h-5" />
                        Nhận Phòng
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCheckOut(booking.id)}
                        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-600/30 transition-all duration-200 hover:shadow-xl hover:scale-105 font-medium"
                      >
                        <LogOut className="w-5 h-5" />
                        Trả Phòng
                      </button>
                    )}
                  </div>
                </div>

                {booking.specialRequests && (
                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <div className="flex gap-2 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <span className="text-amber-600 font-semibold text-sm">Yêu cầu đặc biệt:</span>
                      <span className="text-amber-900 text-sm">{booking.specialRequests}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredBookings.length === 0 && (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {activeTab === 'checkin' ? (
                <LogIn className="w-10 h-10 text-gray-400" />
              ) : (
                <LogOut className="w-10 h-10 text-gray-400" />
              )}
            </div>
            <p className="text-gray-900 mb-1">
              Không có {activeTab === 'checkin' ? 'nhận phòng' : 'trả phòng'} hôm nay
            </p>
            <p className="text-sm text-gray-500">Chưa có khách nào được lên lịch cho hôm nay</p>
          </div>
        )}
      </div>
    </div>
  );
}