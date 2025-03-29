-- E-Hotels PostgreSQL Schema

-- Drop all tables if they exist (for reset purposes)
DROP TABLE IF EXISTS Has_Archive, Reserve, Transform, Amenity, Damage, Archive, Hotel_Transaction,
    Renting, Booking, Employee_Position, Position, Employee, Customer, Room, Hotel, Office,
    Email, Phone_Number, Hotel_Chain CASCADE;

-- Hotel Chain Table
CREATE TABLE Hotel_Chain (
    Hotel_Chain_ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Number_Of_Hotels INT NOT NULL CHECK (Number_Of_Hotels >= 8)
);

-- Hotel Table
CREATE TABLE Hotel (
    Hotel_ID SERIAL PRIMARY KEY,
    Hotel_Chain_ID INT NOT NULL REFERENCES Hotel_Chain(Hotel_Chain_ID) ON DELETE RESTRICT,
    Address VARCHAR(255) NOT NULL,
    Star_Rating INT CHECK (Star_Rating BETWEEN 1 AND 5)
);

-- Phone Number Table
CREATE TABLE Phone_Number (
    Phone_Number VARCHAR(20) NOT NULL,
    Hotel_Chain_ID INT NULL,
    Hotel_ID INT NULL,
    UNIQUE (Phone_Number, Hotel_Chain_ID, Hotel_ID),
    FOREIGN KEY (Hotel_Chain_ID) REFERENCES Hotel_Chain(Hotel_Chain_ID) ON DELETE CASCADE,
    FOREIGN KEY (Hotel_ID) REFERENCES Hotel(Hotel_ID) ON DELETE CASCADE,
    CHECK (
        (Hotel_Chain_ID IS NOT NULL AND Hotel_ID IS NULL)
        OR 
        (Hotel_ID IS NOT NULL AND Hotel_Chain_ID IS NULL)
    )
);

-- Email Table
CREATE TABLE Email (
    Email VARCHAR(255) NOT NULL,
    Hotel_Chain_ID INT NULL,
    Hotel_ID INT NULL,
    UNIQUE (Email, Hotel_Chain_ID, Hotel_ID),
    FOREIGN KEY (Hotel_Chain_ID) REFERENCES Hotel_Chain(Hotel_Chain_ID) ON DELETE CASCADE,
    FOREIGN KEY (Hotel_ID) REFERENCES Hotel(Hotel_ID) ON DELETE CASCADE,
    CHECK (
        (Hotel_Chain_ID IS NOT NULL AND Hotel_ID IS NULL)
        OR 
        (Hotel_ID IS NOT NULL AND Hotel_Chain_ID IS NULL)
    )
);

-- Office Table
CREATE TABLE Office (
    Office_ID SERIAL PRIMARY KEY,
    Hotel_Chain_ID INT NOT NULL REFERENCES Hotel_Chain(Hotel_Chain_ID) ON DELETE CASCADE, 
    Address VARCHAR(255) NOT NULL
);

-- Room Table
CREATE TABLE Room (
    Room_Number INT,
    Hotel_ID INT,
    Capacity INT CHECK (Capacity >= 1),
    Price NUMERIC(10,2) CHECK (Price <= 5000),
    View_Type VARCHAR(50),
    Availability BOOLEAN DEFAULT TRUE,
    Is_Extendable BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (Hotel_ID, Room_Number),
    FOREIGN KEY (Hotel_ID) REFERENCES Hotel(Hotel_ID) ON DELETE RESTRICT
);

-- Customer Table
CREATE TABLE Customer (
    Customer_ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255),
    SSN CHAR(20) UNIQUE NOT NULL,
    Age INT CHECK (Age BETWEEN 18 AND 120),
    Card_Number CHAR(16) UNIQUE CHECK (Card_Number ~ '^[0-9]{16}$'),
    Registration_Date DATE NOT NULL
);

-- Employee Table
CREATE TABLE Employee (
    Employee_ID SERIAL PRIMARY KEY,
    Hotel_ID INT NOT NULL REFERENCES Hotel(Hotel_ID) ON DELETE CASCADE,
    SSN CHAR(20) UNIQUE NOT NULL,
    Age INT CHECK (Age BETWEEN 18 AND 65),
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255)
);

-- Position Table
CREATE TABLE Position (
    Title VARCHAR(255) PRIMARY KEY,
    Salary NUMERIC(10,2) NOT NULL
);

-- Employee_Position Table
CREATE TABLE Employee_Position (
    Employee_ID INT,
    Title VARCHAR(255),
    PRIMARY KEY (Employee_ID, Title),
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID) ON DELETE CASCADE,
    FOREIGN KEY (Title) REFERENCES Position(Title)
);

-- Booking Table
CREATE TABLE Booking (
    Booking_ID SERIAL PRIMARY KEY,
    Customer_ID INT NOT NULL REFERENCES Customer(Customer_ID),
    Hotel_ID INT NOT NULL,
    Room_Number INT NOT NULL,
    Start_Date DATE NOT NULL CHECK (Start_Date >= CURRENT_DATE + INTERVAL '2 days'),
    End_Date DATE NOT NULL,
    FOREIGN KEY (Hotel_ID, Room_Number) REFERENCES Room(Hotel_ID, Room_Number) ON DELETE RESTRICT
);

-- Renting Table
CREATE TABLE Renting (
    Renting_ID SERIAL PRIMARY KEY,
    Customer_ID INT NOT NULL REFERENCES Customer(Customer_ID),
    Hotel_ID INT NOT NULL,
    Room_Number INT NOT NULL,
    Start_Date DATE NOT NULL,
    End_Date DATE NOT NULL,
    Price NUMERIC(10,2) NOT NULL,
    FOREIGN KEY (Hotel_ID, Room_Number) REFERENCES Room(Hotel_ID, Room_Number) ON DELETE RESTRICT
);

-- Transaction Table
CREATE TABLE Hotel_Transaction (
    Employee_ID INT NOT NULL REFERENCES Employee(Employee_ID),
    Booking_ID INT,
    Renting_ID INT,
    Transaction_Type VARCHAR(20) CHECK (Transaction_Type IN ('Booking', 'Renting')),
    Customer_ID INT NOT NULL,
    Hotel_ID INT NOT NULL,
    Room_Number INT NOT NULL,
    PRIMARY KEY (Employee_ID, Booking_ID, Renting_ID),
    FOREIGN KEY (Customer_ID) REFERENCES Customer(Customer_ID),
    FOREIGN KEY (Booking_ID) REFERENCES Booking(Booking_ID) ON DELETE CASCADE,
    FOREIGN KEY (Renting_ID) REFERENCES Renting(Renting_ID) ON DELETE CASCADE,
    FOREIGN KEY (Hotel_ID, Room_Number) REFERENCES Room(Hotel_ID, Room_Number) ON DELETE CASCADE
);

-- Archive Table
CREATE TABLE Archive (
    Archive_ID VARCHAR(20) PRIMARY KEY,
    Booking_Date DATE NOT NULL,
    Start_Date DATE NOT NULL,
    End_Date DATE NOT NULL,
    Type VARCHAR(20) CHECK (Type IN ('Booking', 'Renting')),
    CHECK (
        (Type = 'Booking' AND Archive_ID LIKE 'B%')
        OR
        (Type = 'Renting' AND Archive_ID LIKE 'R%')
    )
);

-- Damage Table
CREATE TABLE Damage (
    Room_Number INT,
    Hotel_ID INT,
    Type VARCHAR(255) NOT NULL,
    PRIMARY KEY (Hotel_ID, Room_Number, Type),
    FOREIGN KEY (Hotel_ID, Room_Number) REFERENCES Room(Hotel_ID, Room_Number) ON DELETE CASCADE
);

-- Amenity Table
CREATE TABLE Amenity (
    Room_Number INT,
    Hotel_ID INT,
    Type TEXT[] NOT NULL,
    PRIMARY KEY (Hotel_ID, Room_Number, Type),
    FOREIGN KEY (Hotel_ID, Room_Number) REFERENCES Room(Hotel_ID, Room_Number) ON DELETE CASCADE
);

-- Transform Table
CREATE TABLE Transform (
    Employee_ID INT NOT NULL REFERENCES Employee(Employee_ID),
    Renting_ID INT NOT NULL REFERENCES Renting(Renting_ID) ON DELETE CASCADE,
    Booking_ID INT NOT NULL REFERENCES Booking(Booking_ID) ON DELETE CASCADE,
    PRIMARY KEY (Employee_ID, Renting_ID, Booking_ID)
);

-- Reserve Table
CREATE TABLE Reserve (
    Booking_ID INT NOT NULL REFERENCES Booking(Booking_ID) ON DELETE CASCADE,
    Renting_ID INT NOT NULL REFERENCES Renting(Renting_ID) ON DELETE CASCADE,
    Room_Number INT NOT NULL,
    Hotel_ID INT NOT NULL,
    PRIMARY KEY (Booking_ID, Renting_ID, Hotel_ID, Room_Number),
    FOREIGN KEY (Hotel_ID, Room_Number) REFERENCES Room(Hotel_ID, Room_Number) ON DELETE CASCADE
);

-- Has_Archive Table
CREATE TABLE Has_Archive (
    Archive_ID VARCHAR(20) NOT NULL REFERENCES Archive(Archive_ID),
    Booking_ID INT,
    Renting_ID INT,
    PRIMARY KEY (Archive_ID, Booking_ID, Renting_ID),
    FOREIGN KEY (Booking_ID) REFERENCES Booking(Booking_ID) ON DELETE CASCADE,
    FOREIGN KEY (Renting_ID) REFERENCES Renting(Renting_ID) ON DELETE CASCADE
);