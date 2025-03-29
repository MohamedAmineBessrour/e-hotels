-- Indexes for performance optimization in e-Hotels database

-- 1. Index on Room Capacity (for filtering by number of guests)
CREATE INDEX idx_room_capacity ON Room(Capacity);

-- 2. Index on Hotel Address (used for area-based filtering)
CREATE INDEX idx_hotel_area ON Hotel(Address);

-- 3. Index on Booking Start Date (for future booking lookups)
CREATE INDEX idx_booking_start_date ON Booking(Start_Date);

-- 4. Index on Room Price (for price-based filtering)
CREATE INDEX idx_room_price ON Room(Price);

-- 5. Index on Room Availability (for filtering available rooms)
CREATE INDEX idx_room_availability ON Room(Availability);

