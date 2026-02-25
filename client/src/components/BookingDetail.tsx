import { useState } from 'react';
import { X, User, Home, Calendar, Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { mockRooms, mockGuests, mockServices, Service, BookingService } from './mockData';

interface BookingDetailProps {
  bookingId: string;
  onClose: () => void;
  onCheckIn: (bookingId: string) => void;
  onCheckOut: (bookingId: string) => void;
}

export function BookingDetail({ bookingId, onClose, onCheckIn, onCheckOut }: BookingDetailProps) {
  // Mock booking data
  const booking = {
    id: bookingId,
    guestId: 'G001',
    roomId: 'R002',
    checkIn: '2024-12-05T14:00',
    checkOut: '2024-12-10T12:00',
    guests: 2,
    status: 'confirmed' as const,
    totalAmount: 500,
    specialRequests: 'Late check-in preferred',
    services: [] as BookingService[],
  };

  const [services, setServices] = useState<BookingService[]>(booking.services || []);
  const [showAddService, setShowAddService] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [quantity, setQuantity] = useState(1);

  const guest = mockGuests.find(g => g.id === booking.guestId);
  const room = mockRooms.find(r => r.id === booking.roomId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'checked-in': return 'bg-green-100 text-green-700 border-green-200';
      case 'checked-out': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Đã xác nhận';
      case 'checked-in': return 'Đã nhận phòng';
      case 'checked-out': return 'Đã trả phòng';
      default: return status;
    }
  };

  const getRoomType = (type: string) => {
    switch (type) {
      case 'single': return 'Đơn';
      case 'double': return 'Đôi';
      case 'suite': return 'Suite';
      case 'deluxe': return 'Deluxe';
      default: return type;
    }
  };

  const handleAddService = () => {
    if (!selectedService) return;

    const service = mockServices.find(s => s.id === selectedService);
    if (!service) return;

    const newService: BookingService = {
      serviceId: service.id,
      quantity,
      price: service.price,
      addedAt: new Date().toISOString(),
    };

    setServices([...services, newService]);
    setSelectedService('');
    setQuantity(1);
    setShowAddService(false);
  };

  const handleRemoveService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const calculateServiceTotal = () => {
    return services.reduce((total, s) => total + (s.price * s.quantity), 0);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold">Chi Tiết Đặt Phòng</h2>
            <p className="text-sm text-blue-100 mt-1">Mã: {booking.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className={`px-4 py-2 rounded-full border font-medium ${getStatusColor(booking.status)}`}>
              {getStatusText(booking.status)}
            </span>
            {booking.status === 'confirmed' && (
              <button
                onClick={() => onCheckIn(booking.id)}
                className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-600/30 transition-all duration-200 font-medium"
              >
                <CheckCircle className="w-5 h-5" />
                CHECK-IN
              </button>
            )}
          </div>

          {/* Guest & Room Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guest Info */}
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Thông Tin Khách</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Họ tên</p>
                  <p className="font-semibold text-gray-900">{guest?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Số điện thoại</p>
                  <p className="font-semibold text-gray-900">{guest?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">CCCD/Passport</p>
                  <p className="font-semibold text-gray-900">{guest?.idNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Quốc tịch</p>
                  <p className="font-semibold text-gray-900">{guest?.nationality}</p>
                </div>
              </div>
            </div>

            {/* Room Info */}
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Thông Tin Phòng</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Số phòng</p>
                  <p className="font-semibold text-gray-900">Phòng {room?.number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Loại phòng</p>
                  <p className="font-semibold text-gray-900">{getRoomType(room?.type || '')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tầng</p>
                  <p className="font-semibold text-gray-900">Tầng {room?.floor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Giá phòng</p>
                  <p className="font-semibold text-blue-600">${room?.price}/đêm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-linear-to-br from-blue-50 to-blue-100/50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Chi Tiết Đặt Phòng</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Ngày nhận phòng</p>
                <p className="font-semibold text-gray-900">{new Date(booking.checkIn).toLocaleString('vi-VN')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ngày trả phòng</p>
                <p className="font-semibold text-gray-900">{new Date(booking.checkOut).toLocaleString('vi-VN')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Số khách</p>
                <p className="font-semibold text-gray-900">{booking.guests} người</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Số đêm</p>
                <p className="font-semibold text-gray-900">
                  {Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24))} đêm
                </p>
              </div>
            </div>
            {booking.specialRequests && (
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Yêu cầu đặc biệt</p>
                <p className="text-gray-900">{booking.specialRequests}</p>
              </div>
            )}
          </div>

          {/* Services */}
          {booking.status === 'checked-in' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Dịch Vụ Phát Sinh</h3>
                <button
                  onClick={() => setShowAddService(!showAddService)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Thêm dịch vụ
                </button>
              </div>

              {showAddService && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Chọn dịch vụ</option>
                        {mockServices.filter(s => s.status === 'active').map(service => (
                          <option key={service.id} value={service.id}>
                            {service.name} - {service.price.toLocaleString('vi-VN')}đ/{service.unit}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="SL"
                      />
                      <button
                        onClick={handleAddService}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Thêm
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {services.length > 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Dịch vụ</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Đơn giá</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">SL</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Thành tiền</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {services.map((service, index) => {
                        const serviceDetail = mockServices.find(s => s.id === service.serviceId);
                        return (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm text-gray-900">{serviceDetail?.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{service.price.toLocaleString('vi-VN')}đ</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{service.quantity}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                              {(service.price * service.quantity).toLocaleString('vi-VN')}đ
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleRemoveService(index)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                          Tổng dịch vụ:
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-blue-600">
                          {calculateServiceTotal().toLocaleString('vi-VN')}đ
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-500 bg-gray-50 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <p className="text-sm">Chưa có dịch vụ phát sinh</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
