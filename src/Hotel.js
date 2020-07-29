class Hotel {
  constructor() {
    this.rooms;
    this.bookings;
  }

  storeData(input) {
    if (!Array.isArray(input)) return 'unexpected data type'
    const dataCategory = this.determineDataCategory(input)
    if (dataCategory !== 'unexpected data type') {
      this[dataCategory] = input;
    }
  }

  determineDataCategory(input) {
    const roomDataRequirements = [
      'number', 
      'roomType', 
      'bidet', 
      'bedSize', 
      'numBeds', 
      'costPerNight'
    ]
    const bookingDataRequirements = [
      'id',
      'userID', 
      'date', 
      'roomNumber', 
      'roomServiceCharges'
    ]
    let dataPoints;
    
    if (!Array.isArray(input)) return 'unexpected data type'
    
    if (typeof input[0] === 'object' && !Array.isArray(input[0])) {
      dataPoints = Object.keys(input[0])
    } else {
      return 'unexpected data type'
    }

    if (roomDataRequirements.every(key => dataPoints.includes(key))) {
      return 'rooms'
    } else if (bookingDataRequirements.every(key => dataPoints.includes(key))) {
      return 'bookings'
    } else {
      return 'unexpected data type'
    }
  }

  findAvailableRooms(date) {
    if (!this.isDate(date)) return 'The date is an unexpected format'
    let bookedRooms = this.findBookedRoomNumbers(date)
    let availableRooms = this.rooms.filter(room => {
      if (!bookedRooms.includes(room.number)) return room
    })
    
    if (availableRooms.length > 0) {
      return availableRooms
    } else {
      return 'We\'re so sorry but we`re all booked for that date' +
      ' you\'ll be sorely missed, we hope you\'ll find another night to join us'
    }
  } 

  findBookedRoomNumbers(date) {
    return this.bookings.reduce((roomNumbers, booking) => {
      if (booking.date === date) roomNumbers.push(booking.roomNumber)
      return roomNumbers
    }, [])
  }

  findAvailableRoomsByType(roomType, date) {
    if (!this.isDate(date)) return 'The date is an unexpected format'
    let availableRooms = this.findAvailableRooms(date)
    let availableRoomType = availableRooms.filter(room => {
      if (room.roomType === roomType) return room
    })

    if (availableRoomType.length > 0) {
      return availableRoomType
    } else {
      return `We're so sorry but none of the ${roomType}s ` +
      `are available on that date, please try finding another room`
    }
  }

  calculateDailyRevenue(date) {
    let bookedRooms = this.findBookedRoomNumbers(date);
    return this.rooms.reduce((revenue, room) => {
      if (bookedRooms.includes(room.number)) {
        revenue += room.costPerNight
      }
      return revenue
    }, 0)
  }

  isDate(date) {
    if (typeof date !== "string") return false;
    date = date.split("/");
    if (
      date[0].length === 4 &&
      date[1].length === 2 &&
      date[2].length === 2 &&
      date.every((number) => parseInt(number))
    ) {
      return true;
    } else {
      return false;
    }
  }
}


export default Hotel