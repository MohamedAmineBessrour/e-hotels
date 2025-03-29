-- QUERY 1: Search Available Rooms by Flexible Criteria (to be filtered in app)
SELECT r.Room_Number, r.Hotel_ID, h.Address, h.Star_Rating, r.Capacity, r.Price, r.View_Type
FROM Room r
JOIN Hotel h ON r.Hotel_ID = h.Hotel_ID
JOIN Hotel_Chain hc ON h.Hotel_Chain_ID = hc.Hotel_Chain_ID
WHERE r.Availability = TRUE;

-- QUERY 2: Aggregation - Average Room Price per Hotel
SELECT h.Hotel_ID, h.Address, AVG(r.Price) AS average_price
FROM Hotel h
JOIN Room r ON h.Hotel_ID = r.Hotel_ID
GROUP BY h.Hotel_ID, h.Address
ORDER BY average_price DESC;

-- QUERY 3: Nested Query - List Hotels where all rooms are cheaper than the average room price across all hotels
SELECT h.Hotel_ID, h.Address
FROM Hotel h
WHERE NOT EXISTS (
    SELECT 1
    FROM Room r
    WHERE r.Hotel_ID = h.Hotel_ID
    AND r.Price > (
        SELECT AVG(Price) FROM Room
    )
);

-- QUERY 4: List All Available Rooms in an Area With Their Amenities (generalized)
SELECT r.Hotel_ID, r.Room_Number, r.Price, r.Capacity, r.View_Type, array_agg(a.Type) AS amenities
FROM Room r
JOIN Hotel h ON r.Hotel_ID = h.Hotel_ID
LEFT JOIN Amenity a ON r.Hotel_ID = a.Hotel_ID AND r.Room_Number = a.Room_Number
WHERE r.Availability = TRUE
GROUP BY r.Hotel_ID, r.Room_Number, r.Price, r.Capacity, r.View_Type;