// Get the current date
var today = new Date();

// Create dates for the next three days
var tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);


// Define the options object with type annotations
var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' } as Intl.DateTimeFormatOptions;

// Format the dates
var todayFormatted = today.toLocaleDateString('en-US', options);
var tomorrowFormatted = tomorrow.toLocaleDateString('en-US', options);

// Display the formatted dates
export const formattedDates=["Today, " + todayFormatted,"Tomorrow, " + tomorrowFormatted];



function generateTimeSlots() {
    const currentTime = new Date();
    const timeSlots = [];
  
    // Set the initial time to one hour after the current time
    let startTime = new Date(currentTime);
    startTime.setHours(currentTime.getHours() + 1);
    startTime.setMinutes(0);
    startTime.setSeconds(0);
  
    // Generate time slots until 8:00 PM
    while (startTime.getHours() < 20) {
      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 1);
  
      const timeSlot = `${formatTimeAMPM(startTime)} - ${formatTimeAMPM(endTime)}`;
      timeSlots.push(timeSlot);
  
      startTime = endTime;
    }
  
    return timeSlots;
  }
  
  function formatTimeAMPM(time:any) {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  
    return `${formattedHours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
  }
  
  export const timeSlots = generateTimeSlots();
  
  
  