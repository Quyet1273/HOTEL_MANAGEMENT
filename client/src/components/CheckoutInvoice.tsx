import { useState } from 'react';
import { X, Download, Printer, CreditCard, DollarSign, Receipt } from 'lucide-react';
import { mockRooms, mockGuests, mockServices, BookingService } from './mockData';

interface CheckoutInvoiceProps {
  bookingId: string;
  onClose: () => void;
  onCheckout: (invoiceData: any) => void;
}

export function CheckoutInvoice({ bookingId, onClose, onCheckout }: CheckoutInvoiceProps) {
  // Mock booking data
  const booking = {
    id: bookingId,
    guestId: 'G001',
    roomId: 'R002',
    checkIn: '2024-12-05T14:00',
    checkOut: '2024-12-10T12:00',
    guests: 2,
    status: 'checked-in' as const,
    services: [
      { serviceId: 'SV001', quantity: 2, price: 20000, addedAt: '2024-12-06T10:00:00' },
      { serviceId: 'SV003', quantity: 1, price: 200000, addedAt: '2024-12-06T14:00:00' },
    ] as BookingService[],
  };

  const guest = mockGuests.find(g => g.id === booking.guestId);
  const room = mockRooms.find(r => r.id === booking.roomId);

  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'transfer'>('cash');
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<'percent' | 'amount'>('percent');

  // Calculate
  const nights = Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24));
  const roomCharge = (room?.price || 0) * nights;
  const serviceCharge = booking.services?.reduce((total, s) => total + (s.price * s.quantity), 0) || 0;
  
  const discountAmount = discountType === 'percent' 
    ? (roomCharge + serviceCharge) * (discount / 100)
    : discount;
  
  const subtotal = roomCharge + serviceCharge - discountAmount;
  const tax = subtotal * 0.1; // 10% VAT
  const total = subtotal + tax;

  const handleCheckout = () => {
    const invoiceData = {
      bookingId: booking.id,
      roomCharge,
      serviceCharge,
      discount: discountAmount,
      tax,
      total,
      paymentMethod,
      paidAt: new Date().toISOString(),
    };

    onCheckout(invoiceData);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Tải xuống hóa đơn PDF');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-green-600 to-green-700 text-white p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold">Check-out & Thanh Toán</h2>
            <p className="text-sm text-green-100 mt-1">Mã booking: {booking.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Guest & Room Summary */}
          <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-xl p-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Khách hàng</p>
                <p className="font-semibold text-gray-900">{guest?.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Số điện thoại</p>
                <p className="font-semibold text-gray-900">{guest?.phone}</p>
              </div>
              <div>
                <p className="text-gray-600">Phòng</p>
                <p className="font-semibold text-gray-900">Phòng {room?.number}</p>
              </div>
              <div>
                <p className="text-gray-600">Số đêm</p>
                <p className="font-semibold text-gray-900">{nights} đêm</p>
              </div>
              <div>
                <p className="text-gray-600">Check-in</p>
                <p className="font-semibold text-gray-900">{new Date(booking.checkIn).toLocaleDateString('vi-VN')}</p>
              </div>
              <div>
                <p className="text-gray-600">Check-out</p>
                <p className="font-semibold text-gray-900">{new Date(booking.checkOut).toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-linear-to-r from-gray-50 to-white p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-blue-600" />
                Chi Tiết Hóa Đơn
              </h3>
            </div>

            <div className="p-5 space-y-3">
              {/* Room Charge */}
              <div className="flex justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Tiền phòng</p>
                  <p className="text-sm text-gray-500">{nights} đêm × ${room?.price}</p>
                </div>
                <p className="font-semibold text-gray-900">${roomCharge.toLocaleString()}</p>
              </div>

              {/* Service Charges */}
              {booking.services && booking.services.length > 0 && (
                <div className="border-b border-gray-100 pb-3">
                  <p className="font-medium text-gray-900 mb-2">Dịch vụ phát sinh</p>
                  {booking.services.map((service, index) => {
                    const serviceDetail = mockServices.find(s => s.id === service.serviceId);
                    return (
                      <div key={index} className="flex justify-between text-sm py-1">
                        <span className="text-gray-600">
                          {serviceDetail?.name} × {service.quantity}
                        </span>
                        <span className="text-gray-900">
                          {(service.price * service.quantity).toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    );
                  })}
                  <div className="flex justify-between mt-2 pt-2 border-t border-gray-100">
                    <span className="font-medium text-gray-700">Tổng dịch vụ:</span>
                    <span className="font-semibold text-gray-900">{serviceCharge.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              )}

              {/* Discount */}
              <div className="border-b border-gray-100 pb-3">
                <label className="block font-medium text-gray-900 mb-2">Giảm giá</label>
                <div className="flex gap-3">
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as 'percent' | 'amount')}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="percent">%</option>
                    <option value="amount">Tiền</option>
                  </select>
                  <input
                    type="number"
                    min="0"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
                {discountAmount > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    - {discountAmount.toLocaleString('vi-VN')}đ
                  </p>
                )}
              </div>

              {/* Tax */}
              <div className="flex justify-between py-2">
                <span className="text-gray-700">Thuế VAT (10%)</span>
                <span className="text-gray-900">{tax.toLocaleString('vi-VN')}đ</span>
              </div>

              {/* Total */}
              <div className="flex justify-between py-4 bg-linear-to-r from-blue-50 to-blue-100/50 px-4 rounded-lg">
                <span className="text-lg font-bold text-gray-900">TỔNG CỘNG</span>
                <span className="text-2xl font-bold text-blue-600">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block font-semibold text-gray-900 mb-3">Phương thức thanh toán</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-4 border-2 rounded-xl transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-blue-400'
                }`}
              >
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm font-medium text-gray-900">Tiền mặt</p>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border-2 rounded-xl transition-all ${
                  paymentMethod === 'card'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-blue-400'
                }`}
              >
                <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium text-gray-900">Quẹt thẻ</p>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('transfer')}
                className={`p-4 border-2 rounded-xl transition-all ${
                  paymentMethod === 'transfer'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-blue-400'
                }`}
              >
                <svg className="w-8 h-8 mx-auto mb-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <p className="text-sm font-medium text-gray-900">Chuyển khoản</p>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleCheckout}
              className="md:col-span-1 py-3 bg-linear-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-600/30 transition-all duration-200 font-medium"
            >
              Xác nhận thanh toán
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              <Download className="w-5 h-5" />
              Xuất PDF
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium"
            >
              <Printer className="w-5 h-5" />
              In hóa đơn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
