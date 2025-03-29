CREATE OR REPLACE VIEW Available_Rooms_Per_Area AS
SELECT 
    h.Address AS Area,
    COUNT(*) AS Available_Rooms
FROM Room r
JOIN Hotel h ON r.Hotel_ID = h.Hotel_ID
WHERE r.Availability = TRUE
GROUP BY h.Address;

CREATE OR REPLACE VIEW Hotel_Total_Capacity AS
SELECT 
    h.Hotel_ID,
    h.Address AS Area,
    SUM(r.Capacity) AS Total_Capacity
FROM Room r
JOIN Hotel h ON r.Hotel_ID = h.Hotel_ID
GROUP BY h.Hotel_ID, h.Address;