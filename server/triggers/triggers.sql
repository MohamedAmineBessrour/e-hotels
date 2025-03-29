-- Trigger 1: Prevent Booking Less Than 48 Hours in Advance
CREATE OR REPLACE FUNCTION enforce_booking_advance()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.Start_Date < CURRENT_DATE + INTERVAL '2 days' THEN
    RAISE EXCEPTION 'Bookings must be made at least 48 hours in advance.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_enforce_booking_advance
BEFORE INSERT ON Booking
FOR EACH ROW
EXECUTE FUNCTION enforce_booking_advance();

-- Trigger 2: Prevent Deleting Rooms with Booking or Renting History
CREATE OR REPLACE FUNCTION prevent_room_delete_if_history()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM Booking WHERE Booking.Room_Number = OLD.Room_Number AND Booking.Hotel_ID = OLD.Hotel_ID
  ) OR EXISTS (
    SELECT 1 FROM Renting WHERE Renting.Room_Number = OLD.Room_Number AND Renting.Hotel_ID = OLD.Hotel_ID
  ) THEN
    RAISE EXCEPTION 'Cannot delete room: it exists in booking or renting history.';
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_room_delete
BEFORE DELETE ON Room
FOR EACH ROW
EXECUTE FUNCTION prevent_room_delete_if_history();