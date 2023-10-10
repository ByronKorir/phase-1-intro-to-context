// Your code here
function createEmployeeRecord(arr) {
   return {
     firstName: arr[0],
     familyName: arr[1],
     title: arr[2],
     payPerHour: arr[3],
     timeInEvents: [],
     timeOutEvents: []
   };
 }
 
 function createEmployeeRecords(arrays) {
   return arrays.map(createEmployeeRecord);
 }
 
 function createTimeInEvent(employeeRecord, dateStamp) {
   const [date, hour] = dateStamp.split(" ");
   employeeRecord.timeInEvents.push({
     type: "TimeIn",
     hour: parseInt(hour),
     date: date
   });
   return employeeRecord;
 }
 
 function createTimeOutEvent(employeeRecord, dateStamp) {
   const [date, hour] = dateStamp.split(" ");
   employeeRecord.timeOutEvents.push({
     type: "TimeOut",
     hour: parseInt(hour),
     date: date
   });
   return employeeRecord;
 }
 
 function hoursWorkedOnDate(employeeRecord, date) {
   const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
   const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
   
   if (timeIn && timeOut) {
     const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
     return hoursWorked;
   } else {
     return 0;
   }
 }
 
 function wagesEarnedOnDate(employeeRecord, date) {
   const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
   const payRate = employeeRecord.payPerHour;
   const earnings = hoursWorked * payRate;
   return earnings;
 }
 
 function allWagesFor(employeeRecord) {
   const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
   const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
   return totalWages;
 }
 
 function calculatePayroll(employeeRecords) {
   const totalPayroll = employeeRecords.reduce((total, employee) => total + allWagesFor(employee), 0);
   return totalPayroll;
 }
 