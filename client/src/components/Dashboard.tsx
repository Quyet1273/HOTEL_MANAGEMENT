import { Bed, Users, DollarSign, TrendingUp, Calendar, ArrowUp, Filter, Building2 } from 'lucide-react';
import { mockRooms, mockBookings, mockGuests, mockServices } from './mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useState } from 'react';

export function Dashboard() {
  // Filters state
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(1)).toISOString().split('T')[0], // First day of month
    to: new Date().toISOString().split('T')[0] // Today
  });

  // Mock branches data
  const branches = [
    { id: 'all', name: 'Tất cả cơ sở' },
    { id: 'hcm1', name: 'Chi nhánh Quận 1' },
    { id: 'hcm3', name: 'Chi nhánh Quận 3' },
    { id: 'hn', name: 'Chi nhánh Hà Nội' },
  ];

  const totalRooms = mockRooms.length;
  const occupiedRooms = mockRooms.filter(r => r.status === 'occupied').length;
  const availableRooms = mockRooms.filter(r => r.status === 'available').length;
  const occupancyRate = ((occupiedRooms / totalRooms) * 100).toFixed(1);
  
  const totalRevenue = mockBookings
    .filter(b => b.status === 'checked-in' || b.status === 'checked-out')
    .reduce((sum, b) => sum + b.totalAmount, 0);
  
  const todayCheckIns = mockBookings.filter(b => {
    const today = new Date().toISOString().split('T')[0];
    return b.checkIn === today && b.status === 'confirmed';
  }).length;
  
  const todayCheckOuts = mockBookings.filter(b => {
    const today = new Date().toISOString().split('T')[0];
    return b.checkOut === today && b.status === 'checked-in';
  }).length;

  const stats = [
    {
      label: 'Tổng Số Phòng',
      value: totalRooms,
      subtext: `${availableRooms} phòng trống`,
      icon: Bed,
      gradient: 'from-blue-400 to-blue-500',
      bgGradient: 'from-blue-50 to-blue-100/50',
      iconBg: 'bg-blue-400',
      change: '+12%',
    },
    {
      label: 'Tỷ Lệ Lấp Đầy',
      value: `${occupancyRate}%`,
      subtext: `${occupiedRooms} phòng đã thuê`,
      icon: TrendingUp,
      gradient: 'from-green-400 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-100/50',
      iconBg: 'bg-green-400',
      change: '+8%',
    },
    {
      label: 'Tổng Khách Hàng',
      value: mockGuests.length,
      subtext: 'Khách đã đăng ký',
      icon: Users,
      gradient: 'from-purple-400 to-purple-500',
      bgGradient: 'from-purple-50 to-purple-100/50',
      iconBg: 'bg-purple-400',
      change: '+23%',
    },
    {
      label: 'Doanh Thu',
      value: `${totalRevenue.toLocaleString('vi-VN')}đ`,
      subtext: 'Tháng này',
      icon: DollarSign,
      gradient: 'from-amber-400 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-100/50',
      iconBg: 'bg-amber-400',
      change: '+15%',
    },
  ];

  const recentBookings = mockBookings.slice(0, 5);

  // Revenue data for pie chart
  const revenueByRoomType = [
    { 
      name: 'Phòng Đơn', 
      value: mockBookings
        .filter(b => (b.status === 'checked-in' || b.status === 'checked-out'))
        .filter(b => {
          const room = mockRooms.find(r => r.id === b.roomId);
          return room?.type === 'single';
        })
        .reduce((sum, b) => sum + b.totalAmount, 0),
      color: '#93c5fd'
    },
    { 
      name: 'Phòng Đôi', 
      value: mockBookings
        .filter(b => (b.status === 'checked-in' || b.status === 'checked-out'))
        .filter(b => {
          const room = mockRooms.find(r => r.id === b.roomId);
          return room?.type === 'double';
        })
        .reduce((sum, b) => sum + b.totalAmount, 0),
      color: '#c4b5fd'
    },
    { 
      name: 'Suite', 
      value: mockBookings
        .filter(b => (b.status === 'checked-in' || b.status === 'checked-out'))
        .filter(b => {
          const room = mockRooms.find(r => r.id === b.roomId);
          return room?.type === 'suite';
        })
        .reduce((sum, b) => sum + b.totalAmount, 0),
      color: '#fcd34d'
    },
    { 
      name: 'Deluxe', 
      value: mockBookings
        .filter(b => (b.status === 'checked-in' || b.status === 'checked-out'))
        .filter(b => {
          const room = mockRooms.find(r => r.id === b.roomId);
          return room?.type === 'deluxe';
        })
        .reduce((sum, b) => sum + b.totalAmount, 0),
      color: '#f9a8d4'
    },
  ].filter(item => item.value > 0);

  // Service colors with lighter tones
  const serviceColors = ['#93c5fd', '#c4b5fd', '#fcd34d', '#f9a8d4', '#86efac'];

  // Data for room status and type pie charts
  const roomStatusData = [
    { name: 'Trống', value: mockRooms.filter(r => r.status === 'available').length, color: '#86efac' },
    { name: 'Đã thuê', value: mockRooms.filter(r => r.status === 'occupied').length, color: '#f87171' },
    { name: 'Đã đặt', value: mockRooms.filter(r => r.status === 'reserved').length, color: '#93c5fd' },
    { name: 'Bảo trì', value: mockRooms.filter(r => r.status === 'maintenance').length, color: '#fcd34d' },
    { name: 'Đang dọn', value: mockRooms.filter(r => r.status === 'cleaning').length, color: '#c4b5fd' },
  ].filter(item => item.value > 0);

  const roomTypeData = [
    { name: 'Phòng Đơn', value: mockRooms.filter(r => r.type === 'single').length, color: '#93c5fd' },
    { name: 'Phòng Đôi', value: mockRooms.filter(r => r.type === 'double').length, color: '#c4b5fd' },
    { name: 'Suite', value: mockRooms.filter(r => r.type === 'suite').length, color: '#fcd34d' },
    { name: 'Deluxe', value: mockRooms.filter(r => r.type === 'deluxe').length, color: '#f9a8d4' },
  ].filter(item => item.value > 0);

  // Services revenue data
  const serviceRevenue = mockServices.reduce((acc, service) => {
    const totalServiceRevenue = mockBookings
      .filter(b => b.services && (b.status === 'checked-in' || b.status === 'checked-out'))
      .reduce((sum, booking) => {
        const serviceItems = booking.services?.filter(s => s.serviceId === service.id) || [];
        return sum + serviceItems.reduce((s, item) => s + (item.price * item.quantity), 0);
      }, 0);
    
    if (totalServiceRevenue > 0) {
      acc.push({
        name: service.name,
        value: totalServiceRevenue,
      });
    }
    return acc;
  }, [] as { name: string; value: number; }[]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-200/50 p-5 shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-gray-400">
            <Filter className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-600">Bộ lọc:</span>
          </div>
          
          <div className="flex gap-4 flex-1 flex-wrap">
            {/* Branch Filter */}
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-500" />
              <label className="text-sm text-gray-600 font-medium">Cơ sở:</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>{branch.name}</option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <label className="text-sm text-gray-600 font-medium">Từ ngày:</label>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 font-medium">Đến ngày:</label>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors">
              Áp dụng
            </button>
          </div>
        </div>
      </div>

      {/* KEY CHARTS - Moved to Top */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Room Type Chart */}
        <div className="bg-white rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="p-6 border-b border-gray-200/50 bg-linear-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900">Doanh Thu Theo Loại Phòng</h2>
                <p className="text-sm text-gray-500 mt-0.5">Phân bố doanh thu theo loại phòng</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueByRoomType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueByRoomType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `${value.toLocaleString('vi-VN')}đ`}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Room Status Chart */}
        <div className="bg-white rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="p-6 border-b border-gray-200/50 bg-linear-to-r from-green-50 to-emerald-50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Bed className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900">Trạng Thái Phòng</h2>
                <p className="text-sm text-gray-500 mt-0.5">Phân bố trạng thái phòng hiện tại</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roomStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {roomStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `${value} phòng`}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label} 
              className="group relative bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-linear-to-br ${stat.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-medium">
                    <ArrowUp className="w-3 h-3" />
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtext}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Check-ins/Check-outs Today */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-gray-900">Nhận Phòng Hôm Nay</h2>
            </div>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-gray-900">{todayCheckIns}</p>
            <p className="text-sm text-gray-600 pb-0.5">khách dự kiến đến</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-gray-900">Trả Phòng Hôm Nay</h2>
            </div>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-gray-900">{todayCheckOuts}</p>
            <p className="text-sm text-gray-600 pb-0.5">khách dự kiến trả phòng</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200/50 bg-linear-to-r from-gray-50 to-white">
          <h2 className="text-gray-900">Đặt Phòng Gần Đây</h2>
          <p className="text-sm text-gray-500 mt-1">Danh sách các đặt phòng mới nhất</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Mã Đặt Phòng
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Khách Hàng
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Phòng
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Nhận Phòng
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Trả Phòng
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Trạng Thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {recentBookings.map((booking) => {
                const guest = mockGuests.find(g => g.id === booking.guestId);
                const room = mockRooms.find(r => r.id === booking.roomId);
                
                let statusText = '';
                if (booking.status === 'checked-in') statusText = 'Đã nhận phòng';
                else if (booking.status === 'confirmed') statusText = 'Đã xác nhận';
                else if (booking.status === 'checked-out') statusText = 'Đã trả phòng';
                else if (booking.status === 'cancelled') statusText = 'Đã hủy';
                
                return (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{booking.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {guest?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 font-medium">Phòng {room?.number}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {booking.checkIn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {booking.checkOut}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        booking.status === 'checked-in'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-700'
                          : booking.status === 'checked-out'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {statusText}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200/50 bg-linear-to-r from-gray-50 to-white">
            <h2 className="text-gray-900">Loại Phòng</h2>
            <p className="text-sm text-gray-500 mt-1">Phân bố loại phòng</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roomTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {roomTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200/50 bg-linear-to-r from-gray-50 to-white">
            <h2 className="text-gray-900">Doanh Thu Dịch Vụ</h2>
            <p className="text-sm text-gray-500 mt-1">Phân bố doanh thu từ dịch vụ</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceRevenue}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {serviceRevenue.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={serviceColors[index % serviceColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}