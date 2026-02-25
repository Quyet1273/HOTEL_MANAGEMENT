import { useState, useEffect } from 'react';
import { X, Search, User, Phone, CreditCard, Calendar, Users as UsersIcon, Home, FileText, AlertCircle } from 'lucide-react';
import { mockRooms, mockGuests, Room } from './mockData';

interface BookingFormProps {
  bookingId?: string;
  onClose: () => void;
  onSave: (booking: any) => void;
}

export function BookingForm({ bookingId, onClose, onSave }: BookingFormProps) {
  const [formData, setFormData] = useState({
    guestName: '',
    guestPhone: '',
    guestId: '',
    guestIdNumber: '',
    guestNationality: 'Việt Nam',
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: '',
    roomId: '',
    specialRequests: '',
  });

  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [showRoomSelection, setShowRoomSelection] = useState(false);
  const [errors, setErrors] = useState<any>({});

  // Set default check-in and check-out times when component mounts
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format: YYYY-MM-DDTHH:mm
    const checkInDefault = today.toISOString().split('T')[0] + 'T14:00';
    const checkOutDefault = tomorrow.toISOString().split('T')[0] + 'T12:00';
    
    setFormData(prev => ({
      ...prev,
      checkIn: checkInDefault,
      checkOut: checkOutDefault,
    }));
  }, []);

  const roomTypes = [
    { value: 'single', label: 'Phòng Đơn', price: 500000 },
    { value: 'double', label: 'Phòng Đôi', price: 800000 },
    { value: 'suite', label: 'Phòng Suite', price: 1500000 },
    { value: 'deluxe', label: 'Phòng Deluxe', price: 1200000 },
  ];

  const checkAvailableRooms = () => {
    if (!formData.checkIn || !formData.checkOut || !formData.roomType) {
      setErrors({ ...errors, roomType: 'Vui lòng chọn loại phòng và ngày ở' });
      return;
    }

    // Simulate checking available rooms
    const available = mockRooms.filter(
      room => room.type === formData.roomType && (room.status === 'available' || room.status === 'cleaning')
    );

    setAvailableRooms(available);
    setShowRoomSelection(true);
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.guestName) newErrors.guestName = 'Vui lòng nhập họ tên';
    if (!formData.guestPhone) newErrors.guestPhone = 'Vui lòng nhập số điện thoại';
    if (!formData.guestIdNumber) newErrors.guestIdNumber = 'Vui lòng nhập CCCD/Passport';
    if (!formData.checkIn) newErrors.checkIn = 'Vui lòng chọn ngày đến';
    if (!formData.checkOut) newErrors.checkOut = 'Vui lòng chọn ngày đi';
    if (!formData.roomId) newErrors.roomId = 'Vui lòng chọn phòng';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const selectedRoom = mockRooms.find(r => r.id === formData.roomId);
      const nights = calculateNights(formData.checkIn, formData.checkOut);
      const totalAmount = selectedRoom ? selectedRoom.price * nights : 0;

      onSave({
        id: bookingId || `BK${Date.now()}`,
        guestName: formData.guestName,
        guestPhone: formData.guestPhone,
        guestIdNumber: formData.guestIdNumber,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        roomId: formData.roomId,
        totalAmount,
        specialRequests: formData.specialRequests,
        status: 'confirmed',
      });
    }
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold">
            {bookingId ? 'Chỉnh Sửa Đặt Phòng' : 'Tạo Đặt Phòng Mới'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Guest Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Thông Tin Khách Hàng</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.guestName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Nguyễn Văn A"
                />
                {errors.guestName && (
                  <p className="text-sm text-red-600 mt-1">{errors.guestName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.guestPhone}
                  onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.guestPhone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="0901234567"
                />
                {errors.guestPhone && (
                  <p className="text-sm text-red-600 mt-1">{errors.guestPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CCCD/Passport <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.guestIdNumber}
                  onChange={(e) => setFormData({ ...formData, guestIdNumber: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.guestIdNumber ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="001234567890"
                />
                {errors.guestIdNumber && (
                  <p className="text-sm text-red-600 mt-1">{errors.guestIdNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quốc tịch
                </label>
                <input
                  type="text"
                  value={formData.guestNationality}
                  onChange={(e) => setFormData({ ...formData, guestNationality: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Việt Nam"
                />
              </div>
            </div>
          </div>

          {/* Booking Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Thông Tin Đặt Phòng</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày đến <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={formData.checkIn}
                  onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.checkIn ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.checkIn && (
                  <p className="text-sm text-red-600 mt-1">{errors.checkIn}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày đi <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={formData.checkOut}
                  onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.checkOut ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.checkOut && (
                  <p className="text-sm text-red-600 mt-1">{errors.checkOut}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số khách
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại phòng <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.roomType}
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value, roomId: '' })}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.roomType ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Chọn loại phòng</option>
                  {roomTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label} - {type.price.toLocaleString('vi-VN')}đ/đêm
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Check Available Rooms */}
            <div className="mt-4">
              <button
                type="button"
                onClick={checkAvailableRooms}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
              >
                <Search className="w-5 h-5" />
                Kiểm tra phòng trống
              </button>
            </div>

            {/* Room Selection */}
            {showRoomSelection && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Phòng trống ({availableRooms.length})
                </h4>
                {availableRooms.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {availableRooms.map(room => (
                      <button
                        key={room.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, roomId: room.id })}
                        className={`p-4 border-2 rounded-xl transition-all ${
                          formData.roomId === room.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 bg-white hover:border-blue-400'
                        }`}
                      >
                        <Home className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="font-semibold text-gray-900">Phòng {room.number}</p>
                        <p className="text-sm text-gray-600">Tầng {room.floor}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-4 rounded-lg">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm">Không có phòng trống trong thời gian này</p>
                  </div>
                )}
                {errors.roomId && (
                  <p className="text-sm text-red-600 mt-2">{errors.roomId}</p>
                )}
              </div>
            )}
          </div>

          {/* Special Requests */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Ghi Chú</h3>
            </div>
            <textarea
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Yêu cầu đặc biệt (nếu có)..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/30 transition-all duration-200 font-medium"
            >
              Lưu Đặt Phòng
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}