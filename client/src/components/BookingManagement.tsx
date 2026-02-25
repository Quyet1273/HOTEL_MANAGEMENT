import { useState } from 'react';
import { Calendar, Plus, Search, Filter } from 'lucide-react';
import { mockBookings, mockGuests, mockRooms, Booking } from './mockData';
import { BookingForm } from './BookingForm';
import { BookingDetail } from './BookingDetail';
import { CheckoutInvoice } from './CheckoutInvoice';

export function BookingManagement() {
  const [bookings] = useState<Booking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showBookingDetail, setShowBookingDetail] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState<string | null>(null);

  const filteredBookings = bookings.filter(booking => {
    const guest = mockGuests.find(g => g.id === booking.guestId);
    const room = mockRooms.find(r => r.id === booking.roomId);
    const searchMatch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room?.number.includes(searchTerm);
    const statusMatch = filterStatus === 'all' || booking.status === filterStatus;
    return searchMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'checked-in':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'checked-out':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Đã xác nhận';
      case 'checked-in':
        return 'Đã nhận phòng';
      case 'checked-out':
        return 'Đã trả phòng';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
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

  const handleSaveBooking = (bookingData: any) => {
    console.log('Saved booking:', bookingData);
    setShowBookingForm(false);
    alert('Đã lưu đặt phòng thành công!');
  };

  const handleCheckIn = (bookingId: string) => {
    console.log('Check-in booking:', bookingId);
    setShowBookingDetail(null);
    alert('Đã check-in thành công!');
  };

  const handleCheckOut = (bookingId: string) => {
    setShowBookingDetail(null);
    setShowCheckout(bookingId);
  };

  const handleCheckoutComplete = (invoiceData: any) => {
    console.log('Checkout complete:', invoiceData);
    setShowCheckout(null);
    alert('Đã thanh toán và check-out thành công!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Quản Lý Đặt Phòng</h2>
          <p className="text-gray-600 mt-1">Xem và quản lý tất cả đặt phòng</p>
        </div>
        <button
          onClick={() => setShowBookingForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/30 transition-all duration-200 hover:shadow-xl hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Đặt Phòng Mới</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 relative min-w-300px">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã đặt phòng, tên khách, số phòng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="confirmed">ã xác nhận</option>
              <option value="checked-in">Đã nhận phòng</option>
              <option value="checked-out">Đã trả phòng</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-linear-to-r from-gray-50 to-gray-100/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                  Mã Đặt Phòng
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                  Khách Hàng
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                  Phòng
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                  Nhận Phòng
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                  Trả Phòng
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                  Số Khách
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                  Tổng Tiền
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                  Trạng Thái
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider font-semibold">
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredBookings.map((booking) => {
                const guest = mockGuests.find(g => g.id === booking.guestId);
                const room = mockRooms.find(r => r.id === booking.roomId);
                return (
                  <tr key={booking.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-blue-600">{booking.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{guest?.name}</p>
                        <p className="text-xs text-gray-500">{guest?.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Phòng {room?.number}</p>
                        <p className="text-xs text-gray-500">{getTypeText(room?.type || '')}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {booking.checkIn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {booking.checkOut}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {booking.guests}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">${booking.totalAmount}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowBookingDetail(booking.id)}
                          className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                        >
                          Xem Chi Tiết
                        </button>
                        {booking.status === 'checked-in' && (
                          <button
                            onClick={() => setShowCheckout(booking.id)}
                            className="text-green-600 hover:text-green-800 font-medium hover:underline"
                          >
                            Check-out
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-900 mb-1">Không tìm thấy đặt phòng</p>
            <p className="text-sm text-gray-500">Thử thay đổi bộ l��c hoặc tìm kiếm khác</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showBookingForm && (
        <BookingForm
          onClose={() => setShowBookingForm(false)}
          onSave={handleSaveBooking}
        />
      )}

      {showBookingDetail && (
        <BookingDetail
          bookingId={showBookingDetail}
          onClose={() => setShowBookingDetail(null)}
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
        />
      )}

      {showCheckout && (
        <CheckoutInvoice
          bookingId={showCheckout}
          onClose={() => setShowCheckout(null)}
          onCheckout={handleCheckoutComplete}
        />
      )}
    </div>
  );
}