# 🌾 KisanProcure – Smart Farmer Procurement Management System

## 📌 Project Overview

**KisanProcure** is a smart digital procurement management platform designed to help farmers manage the crop procurement process in a simple, transparent, and efficient way.

Farmers often face problems such as long waiting times at procurement centres, lack of information about procurement schedules, overcrowding, uncertainty about procurement status, quality assessment issues, payment delays, and difficulty raising complaints.

KisanProcure provides a single digital platform that connects **Farmers, Procurement Centres, Officers, and Administrators**.

The system allows farmers to register their crops, find procurement centres, check schedules, book slots, receive digital tokens, track queues, monitor procurement status, view quality results, track payments, receive notifications, and raise complaints.

---

# 🎯 Problem Statement

Farmers face several challenges during the crop procurement process:

* Long waiting times at procurement centres
* Lack of information about procurement schedules
* Overcrowding at procurement centres
* Difficulty finding nearby procurement centres
* Uncertainty about procurement status
* Multiple visits to procurement centres
* Lack of real-time queue information
* Lack of transparency in quality assessment
* Difficulty understanding crop rejection or hold reasons
* Delays in payment
* Lack of proper transaction records
* Difficulty raising and tracking complaints
* Language barriers
* Poor internet connectivity in rural areas
* Dependence on manual records and intermediaries

---

# 💡 Proposed Solution

KisanProcure provides a centralized digital procurement platform.

The system enables farmers to:

* Register and manage their profiles
* Register crops
* Find nearby procurement centres
* View procurement schedules
* Book procurement slots
* Generate digital tokens
* Track queue position
* Track procurement status
* View crop quality results
* Receive digital receipts
* Track payment status
* View transaction history
* Receive notifications
* Raise and track complaints

Procurement officers can manage queues, verify farmers, record crop details, perform quality assessment, update procurement status, and generate receipts.

Administrators can manage the complete procurement ecosystem through an administrative dashboard.

---

# 🚀 Main Objectives

1. Reduce farmer waiting time.
2. Reduce overcrowding at procurement centres.
3. Provide real-time procurement information.
4. Provide online slot and token booking.
5. Improve transparency in crop procurement.
6. Provide procurement status tracking.
7. Improve quality assessment transparency.
8. Provide payment tracking.
9. Reduce manual record keeping.
10. Provide digital transaction history.
11. Provide multilingual support.
12. Provide a simple and farmer-friendly interface.
13. Improve communication between farmers and procurement centres.
14. Provide an integrated complaint management system.

---

# 👥 User Roles

The system contains three major user roles:

## 1. 👨‍🌾 Farmer

Farmers can:

* Register
* Login
* Manage profile
* Register crops
* Search procurement centres
* View schedules
* Book slots
* Generate tokens
* View QR code
* Track queue
* Track procurement
* View quality results
* View payment status
* View digital receipts
* View transaction history
* Receive notifications
* Reschedule appointments
* Cancel eligible appointments
* Raise complaints
* Track complaints

---

## 2. 🏢 Procurement Officer

Procurement officers can:

* Login securely
* View assigned procurement centre
* View appointments
* Verify farmer details
* Verify documents
* Scan/verify QR token
* Manage queues
* Record crop quantity
* Perform quality assessment
* Accept crops
* Reject crops
* Put crops on hold
* Provide rejection/hold reasons
* Complete procurement
* Generate digital receipts
* Update payment status
* View daily procurement statistics

---

## 3. 👨‍💼 Administrator

Administrators can:

* Manage farmers
* Manage officers
* Manage procurement centres
* Manage centre capacity
* Manage schedules
* Manage slots
* Manage crops
* Manage procurement prices
* Monitor transactions
* Monitor payments
* Manage complaints
* Manage notifications
* View reports
* View analytics
* Monitor overall system performance

---

# 🔄 Complete System Workflow

```text
Farmer Registration
        ↓
Farmer Login
        ↓
Farmer Dashboard
        ↓
Register Crop
        ↓
Find Procurement Centre
        ↓
View Procurement Schedule
        ↓
Select Date and Time Slot
        ↓
Book Slot
        ↓
Generate Token + QR Code
        ↓
Appointment Confirmation
        ↓
Farmer Reaches Procurement Centre
        ↓
Officer Verification
        ↓
Queue Management
        ↓
Crop Quantity Verification
        ↓
Quality Assessment
        ↓
Accepted / Rejected / On Hold
        ↓
Procurement Completed
        ↓
Digital Receipt Generated
        ↓
Payment Processing
        ↓
Payment Completed
        ↓
Notification
        ↓
Transaction History
```

---

# 📊 Procurement Status Flow

```text
Registered
     ↓
Token Generated
     ↓
Appointment Confirmed
     ↓
Waiting
     ↓
Crop Delivered
     ↓
Quantity Verified
     ↓
Quality Checking
     ↓
Accepted / Rejected / On Hold
     ↓
Procurement Completed
     ↓
Payment Processing
     ↓
Payment Completed
```

---

# ⭐ Key Features

## 🔐 Authentication

* Farmer registration
* Farmer login
* Officer login
* Admin login
* Password protection
* Role-based access
* Logout
* Session management

---

## 🌱 Crop Registration

Farmers can register crop information such as:

* Crop name
* Crop variety
* Quantity
* Unit
* Harvest date
* Expected procurement date
* Preferred procurement centre

---

## 📍 Procurement Centre Search

Farmers can find procurement centres based on location.

Centre information includes:

* Centre name
* Centre ID
* Address
* District
* State
* Contact information
* Working hours
* Capacity
* Available slots
* Centre status

---

## 📅 Procurement Schedule

Farmers can view:

* Procurement date
* Time
* Crop type
* Available slots
* Total capacity
* Booked slots
* Remaining slots

Centre status can be:

* Available
* Almost Full
* Full
* Closed
* Cancelled

---

# 🎫 Online Token Booking

Farmers can select:

```text
Crop
 ↓
Procurement Centre
 ↓
Date
 ↓
Time Slot
 ↓
Confirm Booking
 ↓
Token Generated
```

The system generates:

* Booking ID
* Token Number
* Farmer ID
* Centre ID
* Date
* Time
* Crop
* Quantity

Duplicate active bookings are prevented.

---

# 📱 Digital QR Token

Each confirmed booking can have a QR code.

The QR code can be used by the procurement officer for verification.

The token contains:

* Farmer ID
* Farmer name
* Booking ID
* Token number
* Centre
* Date
* Time
* Crop
* Quantity

---

# ⏳ Queue Management

The system provides queue information such as:

```text
Current Token: T102
Your Token: T108
Farmers Ahead: 5
Estimated Waiting Time: 40 minutes
```

This helps farmers avoid unnecessary waiting at the procurement centre.

---

# 🔍 Procurement Tracking

Farmers can track their crop through every stage.

Example:

```text
✓ Registered
✓ Token Generated
✓ Appointment Confirmed
✓ Crop Delivered
✓ Quantity Verified
→ Quality Checking
○ Procurement Completed
○ Payment Processing
○ Payment Completed
```

---

# 🧪 Quality Assessment

Procurement officers can record:

* Crop type
* Quantity
* Moisture
* Grade
* Quality parameters
* Quality result
* Officer remarks

Possible results:

* Accepted
* Rejected
* On Hold

If the crop is rejected or put on hold, the officer must provide a reason.

---

# 🧾 Digital Receipt

After successful procurement, the system generates a digital receipt.

Receipt includes:

* Receipt number
* Farmer ID
* Farmer name
* Crop
* Quantity
* Quality grade
* Procurement price
* Total amount
* Centre
* Date
* Transaction ID

---

# 💰 Payment Tracking

Farmers can monitor payment status.

Possible statuses:

```text
Not Initiated
      ↓
Processing
      ↓
Approved
      ↓
Payment Sent
      ↓
Payment Completed
```

The system can display:

* Transaction ID
* Amount
* Payment date
* Payment status
* Failure reason

---

# 🔔 Notification System

Farmers receive notifications for:

* Slot confirmation
* Token generation
* Appointment reminder
* Schedule changes
* Centre closure
* Queue updates
* Quality results
* Procurement completion
* Payment processing
* Payment completion
* Complaint updates

---

# 📝 Complaint Management

Farmers can raise complaints related to:

* Token issues
* Long waiting time
* Quality assessment
* Payment delay
* Procurement centre issues
* Schedule problems
* Other procurement issues

Each complaint receives a unique Complaint ID.

Complaint status:

```text
Submitted
   ↓
Under Review
   ↓
In Progress
   ↓
Resolved
   ↓
Closed
```

---

# 🌐 Multilingual Support

The application is designed to support multiple Indian languages.

Initial languages:

* English
* Telugu
* Hindi

The language selector allows users to change the application language.

The system architecture can be extended to support additional Indian languages.

---

# 📶 Rural Connectivity Support

The application is designed with rural users in mind.

Features include:

* Lightweight pages
* Fast loading
* Minimal unnecessary resources
* Network error handling
* Retry mechanism
* Simple interface
* Large buttons
* Clear messages

The system can be extended in the future with:

* SMS
* USSD
* Voice assistance

---

# 🗄️ Database Structure

The system can use a relational database with tables such as:

```text
Users
Farmers
Officers
Admins
Crops
CropRegistrations
ProcurementCentres
Schedules
Slots
Bookings
Tokens
Queue
QualityAssessments
ProcurementTransactions
Receipts
Payments
Notifications
Complaints
Documents
PriceHistory
```

Relationships should be maintained between:

```text
Farmer
   ↓
Crop
   ↓
Booking
   ↓
Token
   ↓
Procurement
   ↓
Receipt
   ↓
Payment
```

---

# 🔒 Security Features

The system includes:

* Secure authentication
* Password hashing
* Role-based authorization
* Input validation
* Server-side validation
* Protected APIs
* Secure sessions/tokens
* Duplicate booking prevention
* Database constraints
* Error handling
* Access control

Farmers can access only their own information.

Officers can access information related to their assigned procurement centre.

Administrators can manage the complete system.

---

# 📊 Admin Analytics

The administrator dashboard can display:

* Total farmers
* Total procurement centres
* Today's appointments
* Today's procurement quantity
* Completed transactions
* Pending transactions
* Pending payments
* Active complaints

Analytics can include:

* Crop-wise procurement
* Centre-wise procurement
* Daily procurement
* Payment status
* Complaint status
* Rejection statistics

---

# 📑 Reports

The system can generate:

* Daily procurement reports
* Weekly procurement reports
* Monthly procurement reports
* Farmer-wise reports
* Crop-wise reports
* Centre-wise reports
* Payment reports
* Complaint reports
* Rejection reports

---

# 🛠️ Technology Stack

The exact technology stack can be configured according to the development platform.

Recommended architecture:

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript
* Responsive UI

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* PostgreSQL / MySQL

### Authentication

* JWT / Secure session authentication
* Password hashing

### Additional Technologies

* QR Code generation
* Location/GPS services
* Notification services
* Charts and analytics
* Cloud deployment

---

# 📁 Suggested Project Structure

```text
KisanProcure/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── assets/
│   └── utils/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── utils/
│
├── database/
│   ├── schema/
│   └── seed/
│
├── docs/
│
├── tests/
│
├── .env.example
├── README.md
└── package.json
```

---

---

# 🧪 Testing

Test the following complete workflow:

```text
Registration
     ↓
Login
     ↓
Crop Registration
     ↓
Centre Search
     ↓
Schedule
     ↓
Slot Booking
     ↓
Token Generation
     ↓
Queue
     ↓
Quality Assessment
     ↓
Procurement
     ↓
Receipt
     ↓
Payment
     ↓
Notification
     ↓
Transaction History
     ↓
Complaint
```

Also test:

* Invalid login
* Duplicate registration
* Full slot
* Duplicate booking
* Invalid quantity
* Cancelled slot
* Rejected crop
* Hold crop
* Payment failure
* Network failure
* Unauthorized access
* Invalid form data

---

# 👨‍🌾 Benefits to Farmers

KisanProcure can help farmers by providing:

* Reduced waiting time
* Better schedule visibility
* Digital token booking
* Queue transparency
* Procurement status tracking
* Quality result visibility
* Payment tracking
* Digital receipts
* Transaction history
* Complaint tracking
* Multilingual access
* Easier communication with procurement centres

---

# 🏢 Benefits to Procurement Centres

The system can help centres with:

* Better queue management
* Slot management
* Farmer verification
* Digital records
* Capacity management
* Quality tracking
* Transaction management
* Reduced manual work
* Daily reports
* Better coordination

---

# 👨‍💼 Benefits to Administrators

Administrators can:

* Monitor procurement centres
* Monitor farmers
* Monitor procurement activity
* Track payments
* Manage schedules
* Manage prices
* Manage complaints
* Generate reports
* View analytics
* Identify operational bottlenecks

---

# 🔮 Future Enhancements

Future versions can include:

* AI-based demand forecasting
* AI-based queue prediction
* Crop price intelligence
* Advanced market price comparison
* Weather integration
* Voice-based farmer assistant
* WhatsApp/SMS notifications
* Offline-first mobile application
* IoT-based weighing machine integration
* Digital weighing verification
* Advanced fraud detection
* Blockchain-based transaction records
* Satellite/crop data integration
* Automated procurement demand prediction
* Advanced multilingual voice support

---

# 🌟 Project Impact

KisanProcure aims to make agricultural procurement more:

**Transparent → Accessible → Organized → Trackable → Farmer-Friendly**

The system brings farmers, procurement centres and administrators onto a common digital platform.

Instead of depending mainly on manual processes, farmers can digitally manage important parts of their procurement journey from registration to payment tracking.

---

# 🎓 SIH Project Relevance

KisanProcure is designed around a real-world agricultural procurement challenge.

The project demonstrates:

* Digital transformation
* Real-time information management
* Role-based access
* Database management
* Queue management
* Slot booking
* Procurement tracking
* Payment tracking
* Multilingual accessibility
* Data analytics
* Rural-focused technology

---

# 👥 Target Users

The main target users are:

* Farmers
* Procurement centre officers
* Government/procurement administrators
* Agricultural departments
* Procurement agencies

---

# 📌 Project Vision

> **“To build a transparent, efficient and farmer-friendly digital procurement ecosystem that reduces waiting time and provides farmers with timely information from crop registration to payment.”**

---


# 👨‍💻 Contributors


```text
1. Team Member 1 – Ayinampudi Abhiram Varma
2. Team Member 2 – Gollapalli Srinivas  
3. Team Member 3 – Gundumogula Manoj
4. Team Member 4 – Gangavarapu Sashank
5. Team Member 5 – Ginkala Spandana
6. Team Member 6 – Nammi Vedha Sri
```
# links
* PROTOTYPE DEMO : https://kisanprocure-eosin.vercel.app/ 

* PROTOTYPE EXPLANATION : https://youtu.be/HZ8PD5_iC28?si=HVv_-R0YxxuEjSxh

* PPT EXPLANATION : https://youtu.be/VH-s589_ajI?si=j4qZJqYVw_EB1BgR


## 🌾 KisanProcure

**Digital Procurement Management for a Smarter and More Transparent Agricultural Ecosystem.**
